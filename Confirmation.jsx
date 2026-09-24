import React from 'react'
import { CheckCircle2, IndianRupee } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PrimaryButton, GhostButton, Card } from '../components/ui'

export default function Confirmation({ reservation }) {
  const { navigate, resetTo, setTab } = useApp()
  if (!reservation) return null

  return (
    <div className="h-full overflow-y-auto no-scrollbar safe-top px-6 pt-10 pb-10 flex flex-col">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-live-free/15 flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-live-free" />
        </div>
        <h1 className="font-display text-xl font-semibold text-ink">Booking confirmed</h1>
        <p className="text-[13.5px] text-ink-soft mt-1">Your slot is reserved. Show this at the parking entry if asked.</p>
      </div>

      <Card className="p-5 space-y-3">
        <Row label="Booking ID" value={reservation.id} />
        <Row label="Parking" value={reservation.locationName} />
        <Row label="Slot" value={reservation.slot} />
        <Row label="Vehicle" value={reservation.vehicleNumber} />
        <Row label="Date" value={reservation.date} />
        <Row label="Entry time" value={reservation.time} />
        <Row label="Duration" value={`${reservation.duration} hours`} />
        <div className="h-px bg-surface-line" />
        <Row
          label="Estimated amount"
          value={
            <span className="flex items-center font-display font-semibold text-ink">
              <IndianRupee size={14} />
              {reservation.amount}
            </span>
          }
        />
      </Card>

      <div className="mt-auto pt-8 space-y-2.5">
        <PrimaryButton onClick={() => navigate({ name: 'navigate', reservation })}>
          Navigate to parking
        </PrimaryButton>
        <GhostButton
          onClick={() => {
            resetTo(null)
            setTab('home')
          }}
        >
          Back to home
        </GhostButton>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-ink-soft">{label}</span>
      <span className="text-[13.5px] text-ink font-medium">{value}</span>
    </div>
  )
}
