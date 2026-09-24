import React, { useState } from 'react'
import { IndianRupee, CreditCard, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TopBar from '../components/TopBar'
import { PrimaryButton, Card } from '../components/ui'

export default function Payment({ reservation }) {
  const { completeParking, resetTo, setTab, notify } = useApp()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const pay = () => {
    setPaying(true)
    window.setTimeout(() => {
      setPaying(false)
      setPaid(true)
      completeParking(reservation.amount)
      notify('Payment successful')
    }, 1300)
  }

  if (paid) {
    return (
      <div className="h-full flex flex-col safe-top safe-bottom px-6 pt-16 items-center text-center">
        <div className="w-16 h-16 rounded-full bg-live-free/15 flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-live-free" />
        </div>
        <h1 className="font-display text-xl font-semibold text-ink">Payment successful</h1>
        <p className="text-[13.5px] text-ink-soft mt-1 mb-8">
          ₹{reservation.amount} paid for {reservation.duration} hours at {reservation.locationName}.
        </p>
        <div className="w-full mt-auto pb-6">
          <PrimaryButton
            onClick={() => {
              resetTo(null)
              setTab('home')
            }}
          >
            Done
          </PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-28">
      <TopBar title="Payment" subtitle={reservation.locationName} />

      <div className="px-5 pt-4 space-y-4">
        <Card className="p-4 space-y-2.5">
          <Row label="Parking duration" value={`${reservation.duration} hours`} />
          <Row label="Rate" value={`₹${Math.round(reservation.amount / reservation.duration)}/hour`} />
          <div className="h-px bg-surface-line" />
          <Row
            label="Total"
            value={
              <span className="flex items-center font-display font-semibold text-[16px] text-ink">
                <IndianRupee size={14} />
                {reservation.amount}
              </span>
            }
          />
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-raised flex items-center justify-center">
            <CreditCard size={16} className="text-ink-soft" />
          </div>
          <div>
            <p className="text-[13.5px] text-ink">UPI / Card (simulated)</p>
            <p className="text-[12px] text-ink-faint">No real payment gateway connected in this MVP</p>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto safe-bottom bg-base border-t border-surface-line p-4">
        <PrimaryButton onClick={pay} disabled={paying}>
          {paying ? 'Processing payment…' : `Pay ₹${reservation.amount}`}
        </PrimaryButton>
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
