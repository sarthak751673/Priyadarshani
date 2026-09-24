import React from 'react'
import { Search, Ticket, History as HistoryIcon, Car, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LOCATIONS } from '../data/mockData'
import LocationCard from '../components/LocationCard'

export default function Home() {
  const { user, navigate, setTab, activeParking } = useApp()
  const totalOpen = LOCATIONS.reduce((n, l) => n + l.availableSlots, 0)
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="pb-24">
      <div className="safe-top px-5 pt-5 pb-1 flex items-center justify-between">
        <div>
          <p className="text-[13px] text-ink-soft">Good to see you,</p>
          <h1 className="font-display text-xl font-semibold text-ink">{firstName}</h1>
        </div>
        <button onClick={() => setTab('profile')} className="w-10 h-10 rounded-full bg-surface-raised border border-surface-line flex items-center justify-center font-display font-semibold text-ink">
          {firstName[0]?.toUpperCase()}
        </button>
      </div>

      {activeParking && (
        <div className="px-5 mt-4">
          <button
            onClick={() => navigate({ name: 'navigate', locationId: activeParking.locationId, reservation: activeParking })}
            className="w-full text-left bg-brand rounded-xl2 p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-[12px] text-white/75">Active session</p>
              <p className="font-display font-semibold text-white">{activeParking.locationName} · Slot {activeParking.slot}</p>
            </div>
            <ChevronRight size={18} className="text-white shrink-0" />
          </button>
        </div>
      )}

      <div className="px-5 mt-5">
        <button
          onClick={() => setTab('search')}
          className="w-full flex items-center gap-3 bg-surface border border-surface-line rounded-xl2 px-4 py-3.5 text-left"
        >
          <Search size={18} className="text-ink-faint" />
          <span className="text-[14px] text-ink-soft">Search parking near an area…</span>
        </button>
      </div>

      <div className="px-5 mt-5">
        <div className="relative overflow-hidden rounded-xl2 bg-surface border border-surface-line p-5">
          <p className="text-[12.5px] text-ink-soft">Open right now, city-wide</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="font-display text-[40px] leading-none font-semibold text-ink">{totalOpen}</span>
            <span className="flex items-center gap-1.5 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-live-free animate-pulseDot" />
              </span>
              <span className="text-[12.5px] text-live-free font-medium">live slots</span>
            </span>
          </div>
          <p className="text-[12px] text-ink-faint mt-1">across {LOCATIONS.length} parking areas in Pune</p>
        </div>
      </div>

      <div className="px-5 mt-5 grid grid-cols-3 gap-2.5">
        <QuickAction icon={Ticket} label="Bookings" onClick={() => setTab('reservations')} />
        <QuickAction icon={HistoryIcon} label="History" onClick={() => navigate({ name: 'history' })} />
        <QuickAction icon={Car} label="Vehicles" onClick={() => navigate({ name: 'vehicles' })} />
      </div>

      <div className="px-5 mt-7 flex items-center justify-between">
        <h2 className="font-display font-semibold text-[16px] text-ink">Nearby parking</h2>
        <button onClick={() => setTab('search')} className="text-[13px] text-brand-soft font-medium">
          See all
        </button>
      </div>
      <div className="px-5 mt-3 space-y-3">
        {LOCATIONS.slice(0, 3).map((loc) => (
          <LocationCard key={loc.id} loc={loc} onClick={() => navigate({ name: 'details', locationId: loc.id })} />
        ))}
      </div>
    </div>
  )
}

function QuickAction({ icon: IconEl, label, onClick }) {
  return (
    <button onClick={onClick} className="bg-surface border border-surface-line rounded-xl2 py-3.5 flex flex-col items-center gap-1.5">
      <IconEl size={18} className="text-ink-soft" />
      <span className="text-[12px] text-ink">{label}</span>
    </button>
  )
}
