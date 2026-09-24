import React, { useState } from 'react'
import { Navigation2, MapPin, Radar, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LOCATIONS } from '../data/mockData'
import TopBar from '../components/TopBar'
import { PrimaryButton, GhostButton, Card } from '../components/ui'

export default function NavigateScreen({ reservation }) {
  const { navigate, beginActiveParking } = useApp()
  const loc = LOCATIONS.find((l) => l.id === reservation.locationId)
  const [detecting, setDetecting] = useState(false)
  const [detected, setDetected] = useState(false)

  if (!loc) return null

  const appleMapsUrl = `https://maps.apple.com/?daddr=${loc.lat},${loc.lng}&dirflg=d`
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`

  const simulateDetection = () => {
    setDetecting(true)
    window.setTimeout(() => {
      setDetecting(false)
      setDetected(true)
      beginActiveParking(reservation)
    }, 1400)
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-28">
      <TopBar title="Navigate" subtitle={loc.name} />

      <div className="px-5 pt-4">
        <div className="rounded-xl2 border border-surface-line overflow-hidden bg-surface">
          <div className="h-40 relative flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(47,107,255,0.18),transparent_65%)]">
            <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
              <path d="M10 100 C 60 20, 140 100, 210 30" stroke="#2F6BFF" strokeWidth="3" strokeDasharray="1 10" strokeLinecap="round" />
              <circle cx="10" cy="100" r="5" fill="#F4F5F7" />
              <circle cx="210" cy="30" r="7" fill="#2F6BFF" />
            </svg>
            <MapPin size={22} className="absolute text-brand" style={{ top: '14px', right: '18px' }} />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[13.5px] text-ink font-medium">{loc.address}</p>
              <p className="text-[12px] text-ink-faint mt-0.5">{loc.distanceKm} km · approx. {Math.max(4, Math.round(loc.distanceKm * 4))} min drive</p>
            </div>
            <Navigation2 size={20} className="text-brand-soft shrink-0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <a href={appleMapsUrl} target="_blank" rel="noreferrer">
            <GhostButton>Open in Apple Maps</GhostButton>
          </a>
          <a href={googleMapsUrl} target="_blank" rel="noreferrer">
            <GhostButton>Open in Google Maps</GhostButton>
          </a>
        </div>
      </div>

      <div className="px-5 mt-6">
        <Card className="p-4">
          <div className="flex items-center gap-2.5 mb-2">
            <Radar size={16} className={detected ? 'text-live-free' : 'text-ink-faint'} />
            <p className="text-[13.5px] text-ink font-medium">Slot sensor status</p>
          </div>
          <p className="text-[12.5px] text-ink-soft leading-relaxed">
            {detected
              ? `Vehicle detected in slot ${reservation.slot}. The slot has been marked occupied.`
              : `Reserved slot ${reservation.slot} is holding for your vehicle ${reservation.vehicleNumber}. Physical sensors are simulated for this MVP — tap below once you arrive.`}
          </p>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto safe-bottom bg-base border-t border-surface-line p-4">
        {!detected ? (
          <PrimaryButton onClick={simulateDetection} disabled={detecting}>
            {detecting ? 'Detecting vehicle…' : "I've arrived — simulate detection"}
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => navigate({ name: 'payment', reservation })}>
            <span className="flex items-center justify-center gap-2">
              <CheckCircle2 size={17} /> Continue to payment
            </span>
          </PrimaryButton>
        )}
      </div>
    </div>
  )
}
