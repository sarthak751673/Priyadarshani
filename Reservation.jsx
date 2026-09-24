import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { LOCATIONS } from '../data/mockData'
import TopBar from '../components/TopBar'
import { Field, Select, PrimaryButton, Card } from '../components/ui'
import { IndianRupee } from 'lucide-react'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function Reservation({ locationId, slot }) {
  const { navigate, vehicles, createReservation, notify } = useApp()
  const loc = LOCATIONS.find((l) => l.id === locationId)
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState('18:00')
  const [duration, setDuration] = useState(2)
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '')

  const vehicle = vehicles.find((v) => v.id === vehicleId)
  const amount = useMemo(() => (loc ? loc.pricePerHour * duration : 0), [loc, duration])
  const assignedSlot = slot || `${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}${Math.floor(Math.random() * 9) + 1}`

  if (!loc) return null

  const canReserve = vehicle && date && time && duration > 0

  const reserve = () => {
    if (!canReserve) return
    const record = createReservation({
      locationId: loc.id,
      locationName: loc.name,
      slot: assignedSlot,
      date: formatDate(date),
      time,
      duration,
      amount,
      vehicleId: vehicle.id,
      vehicleNumber: vehicle.number,
    })
    notify('Slot reserved')
    navigate({ name: 'confirm', reservation: record })
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-28">
      <TopBar title="Reserve a slot" subtitle={loc.name} />

      <div className="px-5 pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" type="date" value={date} min={todayISO()} onChange={(e) => setDate(e.target.value)} />
          <Field label="Entry time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <Select label="Expected duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
          {[1, 2, 3, 4, 6, 8].map((h) => (
            <option key={h} value={h}>
              {h} {h === 1 ? 'hour' : 'hours'}
            </option>
          ))}
        </Select>

        {vehicles.length > 0 ? (
          <Select label="Vehicle" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.number} · {v.brand} {v.model}
              </option>
            ))}
          </Select>
        ) : (
          <Card className="p-4">
            <p className="text-[13px] text-ink-soft">
              You have no saved vehicles yet. Add one from Profile → My Vehicles before reserving.
            </p>
          </Card>
        )}

        <Card className="p-4 space-y-2.5">
          <Row label="Parking area" value={loc.name} />
          <Row label="Assigned slot" value={slot || `Auto-assigned near ${loc.area}`} />
          <Row label="Rate" value={`₹${loc.pricePerHour}/hour`} />
          <div className="h-px bg-surface-line" />
          <Row
            label="Estimated total"
            value={
              <span className="flex items-center font-display font-semibold text-ink">
                <IndianRupee size={14} />
                {amount}
              </span>
            }
            bold
          />
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto safe-bottom bg-base border-t border-surface-line p-4">
        <PrimaryButton disabled={!canReserve} onClick={reserve}>
          Reserve slot · ₹{amount}
        </PrimaryButton>
      </div>
    </div>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-ink-soft">{label}</span>
      <span className={`text-[13.5px] ${bold ? 'text-ink' : 'text-ink'}`}>{value}</span>
    </div>
  )
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
