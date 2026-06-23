// Global app state, persisted to a single localStorage key.
// Holds the user's onboarding preferences and the generated plan, so the whole
// app survives refreshes with no backend.

import { createContext, useContext, useState, useCallback } from 'react'
import { generatePlan } from './engine/planner.js'

const STORAGE_KEY = 'gymgenie'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function persist(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)

  // Save preferences, generate the tailored plan, reset completion progress,
  // and persist — preserving any signed-in user.
  const savePreferences = useCallback((prefs) => {
    const plan = generatePlan(prefs)
    setState((s) => {
      const next = { ...s, prefs, plan, progress: {} }
      persist(next)
      return next
    })
    return plan
  }, [])

  // Remove an exercise from the plan (every session) and clear its progress.
  const removeFromPlan = useCallback((id) => {
    setState((s) => {
      if (!s.plan) return s
      const sessions = s.plan.sessions.map((sess) => ({
        ...sess,
        exercises: sess.exercises.filter((e) => e.id !== id),
      }))
      const progress = { ...(s.progress || {}) }
      delete progress[id]
      const next = { ...s, plan: { ...s.plan, sessions }, progress }
      persist(next)
      return next
    })
  }, [])

  // Toggle an exercise's completed state (workout check-off).
  const toggleExercise = useCallback((id) => {
    setState((s) => {
      const progress = { ...(s.progress || {}) }
      if (progress[id]) delete progress[id]
      else progress[id] = true
      const next = { ...s, progress }
      persist(next)
      return next
    })
  }, [])

  // Add an exercise to the plan (into a session that targets its muscle, else
  // the first session). No-op if it is already in the plan, or there is no plan.
  const addToPlan = useCallback((item) => {
    setState((s) => {
      if (!s.plan) return s
      const exists = s.plan.sessions.some((sess) => sess.exercises.some((e) => e.id === item.id))
      if (exists) return s
      const sessions = s.plan.sessions.map((sess) => ({ ...sess, exercises: [...sess.exercises] }))
      const target = sessions.find((sess) => (sess.groups || []).includes(item.muscle)) || sessions[0]
      const pres = s.plan.prescription || { sets: 3, reps: '12–15', rest: '60s' }
      target.exercises.push({ ...item, sets: pres.sets, reps: pres.reps, rest: pres.rest })
      const next = { ...s, plan: { ...s.plan, sessions } }
      persist(next)
      return next
    })
  }, [])

  const login = useCallback((user) => {
    setState((s) => {
      const next = { ...s, user }
      persist(next)
      return next
    })
  }, [])

  const logout = useCallback(() => {
    setState((s) => {
      const next = { ...s }
      delete next.user
      persist(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState({})
  }, [])

  const value = {
    prefs: state.prefs || null,
    plan: state.plan || null,
    hasPlan: Boolean(state.plan),
    user: state.user || null,
    progress: state.progress || {},
    savePreferences,
    addToPlan,
    removeFromPlan,
    toggleExercise,
    login,
    logout,
    reset,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
