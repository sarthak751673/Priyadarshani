import React, { useState } from 'react'
import { CircleParking } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Field, PrimaryButton, GhostButton } from '../components/ui'

export default function Auth() {
  const { login, signup, notify } = useApp()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('demo@parksmart.app')
  const [password, setPassword] = useState('park123')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      const res = login(email.trim(), password)
      if (!res.ok) setError(res.error)
    } else {
      if (!name.trim() || !email.trim() || password.length < 4) {
        setError('Fill every field. Password needs at least 4 characters.')
        return
      }
      const res = signup(name.trim(), email.trim(), password)
      if (!res.ok) setError(res.error)
      else notify('Account created')
    }
  }

  return (
    <div className="h-full flex flex-col safe-top safe-bottom px-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-10 h-10 rounded-xl2 bg-brand flex items-center justify-center">
            <CircleParking size={22} className="text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-lg text-ink leading-tight">Park Smart</p>
            <p className="text-[11px] text-ink-soft leading-tight">Drive less. Park smarter.</p>
          </div>
        </div>

        <h1 className="font-display text-2xl font-semibold text-ink mb-1">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-ink-soft text-[14px] mb-7">
          {mode === 'login' ? 'Sign in to find and reserve parking near you.' : 'Set up your profile to start reserving slots.'}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <Field label="Full name" placeholder="Aman Sharma" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

          {mode === 'login' && (
            <button type="button" className="text-[13px] text-brand-soft font-medium">
              Forgot password?
            </button>
          )}

          {error && <p className="text-[13px] text-live-busy">{error}</p>}

          <PrimaryButton type="submit" className="!mt-6">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </PrimaryButton>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-surface-line flex-1" />
          <span className="text-[12px] text-ink-faint">or</span>
          <div className="h-px bg-surface-line flex-1" />
        </div>

        <GhostButton type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Create a new account' : 'I already have an account'}
        </GhostButton>

        {mode === 'login' && (
          <p className="text-[11px] text-ink-faint text-center mt-5">
            Demo login — email demo@parksmart.app, password park123
          </p>
        )}
      </div>
    </div>
  )
}
