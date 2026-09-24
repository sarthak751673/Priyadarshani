import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function TopBar({ title, subtitle, onBack, right }) {
  const { back } = useApp()
  return (
    <div className="safe-top sticky top-0 z-20 bg-base/90 backdrop-blur border-b border-surface-line">
      <div className="flex items-center gap-2 px-4 h-14">
        {onBack !== null && (
          <button
            onClick={onBack || back}
            className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full active:bg-surface-raised"
          >
            <ChevronLeft size={22} className="text-ink" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-semibold text-[17px] text-ink truncate">{title}</h1>
          {subtitle && <p className="text-[12px] text-ink-soft truncate">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  )
}
