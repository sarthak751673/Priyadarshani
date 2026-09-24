import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { LOCATIONS, generateSlots } from '../data/mockData'
import TopBar from '../components/TopBar'
import { PrimaryButton } from '../components/ui'

export default function SlotMap({ locationId }) {
  const { navigate } = useApp()
  const loc = LOCATIONS.find((l) => l.id === locationId)
  const slots = useMemo(() => generateSlots(locationId), [locationId])
  const [selected, setSelected] = useState(null)

  const rows = useMemo(() => {
    const grouped = {}
    slots.forEach((s) => {
      grouped[s.row] = grouped[s.row] || []
      grouped[s.row].push(s)
    })
    return grouped
  }, [slots])

  if (!loc) return null

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-28">
      <TopBar title="Live slot map" subtitle={loc.name} />

      <div className="px-5 pt-4 flex items-center gap-4 text-[12px] text-ink-soft">
        <Legend color="bg-live-free" label="Available" />
        <Legend color="bg-live-busy" label="Occupied" />
        <Legend color="bg-live-hold" label="Reserved" />
        <Legend color="bg-brand" label="Selected" />
      </div>

      <div className="px-5 mt-5 space-y-3">
        {Object.entries(rows).map(([row, items]) => (
          <div key={row} className="flex items-center gap-2.5">
            <span className="w-4 text-[12px] text-ink-faint font-medium shrink-0">{row}</span>
            <div className="grid grid-cols-9 gap-1.5 flex-1">
              {items.map((s) => {
                const isSelected = selected === s.code
                const disabled = s.status !== 'available'
                const base = isSelected
                  ? 'bg-brand text-white'
                  : s.status === 'available'
                  ? 'bg-live-free/15 text-live-free active:bg-live-free/25'
                  : s.status === 'occupied'
                  ? 'bg-live-busy/10 text-live-busy/60'
                  : 'bg-live-hold/10 text-live-hold/70'
                return (
                  <button
                    key={s.code}
                    disabled={disabled}
                    onClick={() => setSelected(s.code)}
                    className={`aspect-square rounded-md text-[10px] font-medium flex items-center justify-center ${base} disabled:cursor-not-allowed relative`}
                  >
                    {s.num}
                    {s.isEv && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber" />}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5">
        <p className="text-[12px] text-ink-faint">
          Slots marked with an amber dot are EV-charging enabled. Tap any available slot to select it, or continue and we'll assign the nearest open slot automatically.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto safe-bottom bg-base border-t border-surface-line p-4 space-y-2.5">
        {selected && (
          <p className="text-center text-[13px] text-ink-soft">
            Selected slot <span className="text-ink font-medium">{selected}</span>
          </p>
        )}
        <PrimaryButton onClick={() => navigate({ name: 'reserve', locationId: loc.id, slot: selected })}>
          {selected ? `Continue with slot ${selected}` : 'Continue with auto-assigned slot'}
        </PrimaryButton>
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {label}
    </div>
  )
}
