import React from 'react'
import { Home, Search, Ticket, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

const TABS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'search', label: 'Search', icon: Search },
  { key: 'reservations', label: 'Bookings', icon: Ticket },
  { key: 'profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const { tab, setTab, resetTo } = useApp()
  return (
    <nav className="absolute bottom-0 left-0 right-0 safe-bottom bg-base/95 backdrop-blur border-t border-surface-line">
      <div className="grid grid-cols-4">
        {TABS.map(({ key, label, icon: IconEl }) => {
          const active = tab === key
          return (
            <button
              key={key}
              onClick={() => {
                setTab(key)
                resetTo(null)
              }}
              className="flex flex-col items-center gap-1 py-2.5"
            >
              <IconEl size={22} strokeWidth={active ? 2.4 : 1.8} className={active ? 'text-brand-soft' : 'text-ink-faint'} />
              <span className={`text-[11px] ${active ? 'text-ink font-medium' : 'text-ink-faint'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
