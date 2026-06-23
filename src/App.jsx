import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useStore } from './store.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Exercises from './pages/Exercises.jsx'
import ExerciseDetail from './pages/ExerciseDetail.jsx'

// Scroll to the top whenever the route changes (so detail pages open at the top).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { hasPlan } = useStore()
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* First visit (no plan yet) routes to onboarding; otherwise the dashboard. */}
        <Route path="/" element={hasPlan ? <Dashboard /> : <Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
