import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { INITIAL_VEHICLES, SEED_HISTORY } from '../data/mockData'

const AppCtx = createContext(null)

const DEMO_USER = { name: 'Siddharth Patil', email: 'demo@parksmart.app', password: 'park123' }

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable, fail silently */
  }
}

export function AppProvider({ children }) {
  const [route, setRoute] = useState(() => (load('ps_session', null) ? 'home' : 'login'))
  const [screenStack, setScreenStack] = useState([])
  const [user, setUser] = useState(() => load('ps_session', null))
  const [vehicles, setVehicles] = useState(() => load('ps_vehicles', INITIAL_VEHICLES))
  const [reservations, setReservations] = useState(() => load('ps_reservations', []))
  const [history, setHistory] = useState(() => load('ps_history', SEED_HISTORY))
  const [activeParking, setActiveParking] = useState(() => load('ps_active', null))
  const [toast, setToast] = useState(null)
  const [tab, setTab] = useState('home')

  useEffect(() => save('ps_vehicles', vehicles), [vehicles])
  useEffect(() => save('ps_reservations', reservations), [reservations])
  useEffect(() => save('ps_history', history), [history])
  useEffect(() => save('ps_active', activeParking), [activeParking])

  const notify = useCallback((message) => {
    setToast(message)
    window.clearTimeout(notify._t)
    notify._t = window.setTimeout(() => setToast(null), 2400)
  }, [])

  const navigate = useCallback((screen) => {
    setScreenStack((s) => [...s, screen])
  }, [])
  const back = useCallback(() => {
    setScreenStack((s) => s.slice(0, -1))
  }, [])
  const resetTo = useCallback((screen) => {
    setScreenStack(screen ? [screen] : [])
  }, [])

  const login = useCallback((email, password) => {
    const users = [DEMO_USER, ...load('ps_users', [])]
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!match) return { ok: false, error: 'Incorrect email or password.' }
    const session = { name: match.name, email: match.email }
    save('ps_session', session)
    setUser(session)
    setRoute('home')
    return { ok: true }
  }, [])

  const signup = useCallback((name, email, password) => {
    const users = load('ps_users', [])
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()) || email.toLowerCase() === DEMO_USER.email) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const nextUsers = [...users, { name, email, password }]
    save('ps_users', nextUsers)
    const session = { name, email }
    save('ps_session', session)
    setUser(session)
    setRoute('vehicle-setup')
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ps_session')
    setUser(null)
    setRoute('login')
    resetTo(null)
    setTab('home')
  }, [resetTo])

  const addVehicle = useCallback((vehicle) => {
    setVehicles((v) => {
      const withDefault = v.length === 0 ? { ...vehicle, isDefault: true } : vehicle
      return [...v, { id: `v-${Date.now()}`, ...withDefault }]
    })
  }, [])

  const removeVehicle = useCallback((id) => {
    setVehicles((v) => v.filter((x) => x.id !== id))
  }, [])

  const createReservation = useCallback((reservation) => {
    const id = `PS-${Math.floor(10000 + Math.random() * 89999)}`
    const record = { id, status: 'upcoming', ...reservation }
    setReservations((r) => [record, ...r])
    return record
  }, [])

  const beginActiveParking = useCallback((reservation) => {
    setActiveParking(reservation)
    setReservations((r) => r.map((x) => (x.id === reservation.id ? { ...x, status: 'active' } : x)))
  }, [])

  const completeParking = useCallback((amount) => {
    if (!activeParking) return
    setHistory((h) => [
      {
        id: activeParking.id,
        locationId: activeParking.locationId,
        location: activeParking.locationName,
        slot: activeParking.slot,
        date: activeParking.date,
        hours: activeParking.duration,
        amount,
        vehicle: activeParking.vehicleNumber,
        status: 'Completed',
      },
      ...h,
    ])
    setReservations((r) => r.map((x) => (x.id === activeParking.id ? { ...x, status: 'completed' } : x)))
    setActiveParking(null)
  }, [activeParking])

  const value = useMemo(
    () => ({
      route,
      setRoute,
      screenStack,
      navigate,
      back,
      resetTo,
      tab,
      setTab,
      user,
      login,
      signup,
      logout,
      vehicles,
      addVehicle,
      removeVehicle,
      reservations,
      createReservation,
      history,
      activeParking,
      beginActiveParking,
      completeParking,
      toast,
      notify,
    }),
    [route, screenStack, navigate, back, resetTo, tab, user, login, signup, logout, vehicles, addVehicle, removeVehicle, reservations, createReservation, history, activeParking, beginActiveParking, completeParking, toast, notify]
  )

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
