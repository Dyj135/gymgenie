import { useState, useEffect } from 'react'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

// Simple sign-in dialog.
export default function LoginModal({ open, onClose, onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Close on Escape for keyboard accessibility.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const valid = /\S+@\S+\.\S+/.test(email) && password.length >= 4
  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    const name = email.split('@')[0]
    onSubmit({ name, email })
    setEmail('')
    setPassword('')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-surface-container-low border border-outline-variant rounded-2xl p-10 soft-glow-primary">
        <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 text-on-surface-variant hover:text-primary-fixed transition-colors">
          <Icon name="close" />
        </button>
        <div className="flex flex-col items-center text-center mb-9">
          <Logo />
          <h2 className="font-headline-lg text-headline-lg uppercase text-primary mt-5">Sign In</h2>
          <p className="text-on-surface-variant text-sm mt-1.5">Save your plan and pick up where you left off.</p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">Email</label>
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!valid}
            className="w-full bg-primary-fixed text-on-primary-fixed py-3.5 rounded-lg font-label-caps text-label-caps uppercase tracking-widest font-bold glow-button transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
