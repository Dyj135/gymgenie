// Personalisation engine — the heart of GymGenie.
// Turns a user's preferences into a tailored weekly training plan, and explains
// *why* the plan fits them. Pure functions, no side effects.

import { EXERCISES, MUSCLES } from '../data/exercises.js'

// ---- Onboarding option sets (single source of truth for the wizard) ----
export const GOALS = [
  { id: 'muscle', label: 'Build Muscle', desc: 'Focus on hypertrophy and strength gains with heavier lifting.', icon: 'fitness_center' },
  { id: 'fat', label: 'Lose Fat', desc: 'Higher-rep metabolic conditioning to burn calories efficiently.', icon: 'local_fire_department' },
  { id: 'tone', label: 'Get Toned', desc: 'Combine moderate weights with endurance for a lean physique.', icon: 'bolt' },
  { id: 'fitness', label: 'General Fitness', desc: 'Balanced routines for longevity, mobility and overall health.', icon: 'favorite' },
]
export const LEVELS = [
  { id: 'Beginner', label: 'Beginner', desc: 'New to training or returning after a long break.' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Comfortable with the basics and consistent for months.' },
  { id: 'Advanced', label: 'Advanced', desc: 'Years of experience with structured training.' },
]
export const EQUIPMENT = [
  { id: 'Bodyweight', label: 'Bodyweight', icon: 'accessibility_new' },
  { id: 'Dumbbell', label: 'Dumbbells', icon: 'fitness_center' },
]
export const SCHEDULE_DAYS = [2, 3, 4, 5]
export const SESSION_MINUTES = [30, 45, 60]
export const FOCUS = MUSCLES
export const LIMITATIONS = ['Knee', 'Lower back', 'Shoulder']

const LEVEL_RANK = { Beginner: 1, Intermediate: 2, Advanced: 3 }
const LIMIT_AVOID = { Knee: ['Legs'], 'Lower back': ['Back'], Shoulder: ['Shoulders'] }
const PRESCRIPTION = {
  muscle: { sets: 4, reps: '8–12', rest: '90s' },
  fat: { sets: 3, reps: '15–20', rest: '40s' },
  tone: { sets: 3, reps: '12–15', rest: '60s' },
  fitness: { sets: 3, reps: '12–15', rest: '60s' },
}

const exercisesPerSession = (mins) => (mins <= 30 ? 4 : mins <= 45 ? 5 : 6)

function splitForDays(days) {
  if (days <= 3) {
    return Array.from({ length: days }, (_, i) => ({
      title: `Full Body ${String.fromCharCode(65 + i)}`,
      groups: MUSCLES,
    }))
  }
  if (days === 4) {
    return [
      { title: 'Upper A', groups: ['Chest', 'Back', 'Shoulders', 'Arms'] },
      { title: 'Lower A', groups: ['Legs', 'Core'] },
      { title: 'Upper B', groups: ['Chest', 'Back', 'Shoulders', 'Arms'] },
      { title: 'Lower B', groups: ['Legs', 'Core'] },
    ]
  }
  const ppl = [
    { title: 'Push', groups: ['Chest', 'Shoulders', 'Arms'] },
    { title: 'Pull', groups: ['Back', 'Arms'] },
    { title: 'Legs', groups: ['Legs', 'Core'] },
  ]
  return Array.from({ length: days }, (_, i) => ppl[i % ppl.length])
}

function splitName(days) {
  if (days <= 3) return `${days}-day full-body split`
  if (days === 4) return '4-day upper/lower split'
  return `${days}-day push/pull/legs split`
}

// Pick `count` exercises spread across the given muscle groups, compounds first,
// prioritising the user's focus muscles, without repeating a move in a session.
function pickForGroups(pool, groups, count, focus) {
  const byMuscle = {}
  groups.forEach((g) => {
    byMuscle[g] = pool
      .filter((e) => e.muscle === g)
      .sort((a, b) => (a.compound ? 0 : 1) - (b.compound ? 0 : 1))
  })
  const order = focus && focus.length
    ? [...groups].sort((a, b) => (focus.includes(b) ? 1 : 0) - (focus.includes(a) ? 1 : 0))
    : groups
  const chosen = []
  const used = new Set()
  for (let pass = 0; pass < 6 && chosen.length < count; pass++) {
    for (const g of order) {
      if (chosen.length >= count) break
      const next = (byMuscle[g] || []).find((e) => !used.has(e.id))
      if (next) {
        used.add(next.id)
        chosen.push(next)
      }
    }
  }
  return chosen
}

export function generatePlan(prefs) {
  const rank = LEVEL_RANK[prefs.level] || 1
  const avoid = (prefs.limitations || []).flatMap((l) => LIMIT_AVOID[l] || [])
  const pool = EXERCISES.filter((ex) => {
    const equipOk = ex.equipment === 'Bodyweight' || (prefs.equipment || []).includes(ex.equipment)
    const levelOk = LEVEL_RANK[ex.level] <= rank
    const safe = !avoid.includes(ex.muscle)
    return equipOk && levelOk && safe
  })

  const pres = PRESCRIPTION[prefs.goal] || PRESCRIPTION.fitness
  const perSession = exercisesPerSession(prefs.sessionMinutes)
  const split = splitForDays(prefs.days)

  const sessions = split.map((day) => {
    const picks = pickForGroups(pool, day.groups, perSession, prefs.focus)
    return {
      title: day.title,
      groups: day.groups,
      exercises: picks.map((e) => ({
        id: e.id, name: e.name, muscle: e.muscle, equipment: e.equipment, image: e.image,
        sets: pres.sets, reps: pres.reps, rest: pres.rest,
      })),
    }
  })

  const goalLabel = GOALS.find((g) => g.id === prefs.goal)?.label || 'General Fitness'
  const gearLabel =
    (prefs.equipment || []).length === 1 && prefs.equipment[0] === 'Dumbbell'
      ? 'Dumbbell only'
      : (prefs.equipment || []).join(' + ') || 'Bodyweight'
  const rationale =
    `Because your goal is ${goalLabel}, you train ${prefs.days} days a week for ` +
    `${prefs.sessionMinutes} min with ${gearLabel}, GymGenie built you a ${splitName(prefs.days)} — ` +
    `${pres.sets} sets × ${pres.reps} reps on each move, ${pres.rest} rest.`

  return {
    goal: prefs.goal,
    goalLabel,
    days: prefs.days,
    sessionMinutes: prefs.sessionMinutes,
    gearLabel,
    splitName: splitName(prefs.days),
    prescription: pres,
    rationale,
    sessions,
  }
}
