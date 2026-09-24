import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className="absolute left-4 right-4 bottom-24 z-50 animate-riseIn">
      <div className="flex items-center gap-2.5 bg-surface-raised border border-surface-line rounded-xl2 px-4 py-3 shadow-2xl">
        <CheckCircle2 size={18} className="text-live-free shrink-0" />
        <p className="text-[13px] text-ink font-medium">{toast}</p>
      </div>
    </div>
  )
}
