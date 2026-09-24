import React from 'react'
import { MapPin, IndianRupee } from 'lucide-react'
import { Card } from './ui'

export default function LocationCard({ loc, onClick }) {
  const pct = Math.round((loc.availableSlots / loc.totalSlots) * 100)
  const tight = pct < 15
  return (
    <Card onClick={onClick} className="p-4 active:border-brand-soft/50 cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-[15px] text-ink truncate">{loc.name}</p>
          <p className="text-[12.5px] text-ink-soft mt-0.5 flex items-center gap-1">
            <MapPin size={12} className="shrink-0" /> {loc.area} · {loc.distanceKm} km away
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-[15px] font-semibold text-ink flex items-center justify-end">
            <IndianRupee size={12} />
            {loc.pricePerHour}
            <span className="text-[11px] text-ink-faint font-sans font-normal">/hr</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="flex-1 h-1.5 rounded-full bg-surface-raised overflow-hidden">
          <div
            className={`h-full rounded-full ${tight ? 'bg-live-busy' : 'bg-live-free'}`}
            style={{ width: `${Math.max(pct, 6)}%` }}
          />
        </div>
        <span className={`text-[12px] font-medium ${tight ? 'text-live-busy' : 'text-live-free'}`}>
          {loc.availableSlots} of {loc.totalSlots} open
        </span>
      </div>
    </Card>
  )
}
