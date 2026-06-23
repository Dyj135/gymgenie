import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import LoginModal from './LoginModal.jsx'
import { useStore } from '../store.jsx'

const NAV = [
  { label: 'Dashboard', to: '/' },
  { label: 'Exercises', to: '/exercises' },
]

// Top navigation bar shared by Dashboard and Exercise Detail.
// Only "Dashboard" routes (to /); "Exercises" is contextual. Includes a
// sign-in dialog wired to the global store.
export default function TopNav({ active = 'Dashboard' }) {
  const { user, login, logout } = useStore()
  const [showLogin, setShowLogin] = useState(false)

  return (
    <header className="bg-surface-container-low w-full sticky top-0 z-40 border-b border-outline-variant">
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max-width mx-auto">
        <div className="flex items-center gap-8 md:gap-12">
          <Link to="/" aria-label="GymGenie home">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV.map((item) => {
              const isActive = item.label === active
              const cls = isActive
                ? 'text-primary-fixed font-bold border-b-2 border-primary-fixed pb-1'
                : 'text-on-surface-variant font-medium hover:text-primary-fixed transition-colors'
              return (
                <Link key={item.label} to={item.to} className={`font-label-caps text-label-caps ${cls}`}>{item.label}</Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary-fixed rounded-full">
            <Icon name="local_fire_department" filled className="text-[18px]" />
            <span className="font-label-caps text-label-caps">12 DAY STREAK</span>
          </div>
          {user ? (
            <button onClick={logout} title="Sign out" className="flex items-center gap-2 group">
              <span className="hidden sm:block font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary-fixed transition-colors">{user.name}</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed font-bold uppercase">{user.name.charAt(0)}</span>
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary-fixed text-primary-fixed font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed/10 transition-colors"
            >
              <Icon name="person" className="text-[18px]" /> Sign In
            </button>
          )}
        </div>
      </nav>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSubmit={(u) => { login(u); setShowLogin(false) }}
      />
    </header>
  )
}
