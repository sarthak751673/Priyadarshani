import React from 'react'

export function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-[13px] text-ink-soft mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full bg-surface border border-surface-line rounded-xl2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-brand-soft transition-colors"
      />
    </label>
  )
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="text-[13px] text-ink-soft mb-1.5 block">{label}</span>
      <select
        {...props}
        className="w-full bg-surface border border-surface-line rounded-xl2 px-4 py-3 text-[15px] text-ink focus:border-brand-soft transition-colors appearance-none"
      >
        {children}
      </select>
    </label>
  )
}

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`w-full bg-brand text-white font-semibold text-[15px] rounded-xl2 py-3.5 disabled:opacity-40 transition-opacity ${className}`}
    >
      {children}
    </button>
  )
}

export function GhostButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`w-full bg-surface-raised text-ink font-medium text-[15px] rounded-xl2 py-3.5 border border-surface-line ${className}`}
    >
      {children}
    </button>
  )
}

export function StatusPill({ status }) {
  const map = {
    available: ['bg-live-free/15 text-live-free', 'Available'],
    occupied: ['bg-live-busy/15 text-live-busy', 'Occupied'],
    reserved: ['bg-live-hold/15 text-live-hold', 'Reserved'],
    upcoming: ['bg-brand/15 text-brand-soft', 'Upcoming'],
    active: ['bg-live-hold/15 text-live-hold', 'Active'],
    completed: ['bg-surface-raised text-ink-soft', 'Completed'],
  }
  const [cls, label] = map[status] || map.completed
  return <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${cls}`}>{label}</span>
}

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-surface border border-surface-line rounded-xl2 ${className}`} {...props}>
      {children}
    </div>
  )
}
