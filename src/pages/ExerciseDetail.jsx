import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import Footer from '../components/Footer.jsx'
import Icon from '../components/Icon.jsx'
import { EXERCISES, getExerciseById } from '../data/exercises.js'
import { useStore } from '../store.jsx'

function Metric({ value, label }) {
  return (
    <div className="bento-card p-6 flex flex-col items-center justify-center rounded-xl">
      <span className="font-display-metric text-primary-fixed text-4xl mb-1">{value}</span>
      <span className="font-label-caps text-label-caps text-on-surface-variant">{label}</span>
    </div>
  )
}

export default function ExerciseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plan, addToPlan } = useStore()
  const ex = getExerciseById(id)

  // Auto-loop the two demonstration frames (start -> end) to animate the move.
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!ex) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 1100)
    return () => clearInterval(t)
  }, [ex])

  if (!ex) return <Navigate to="/" replace />

  const pres = plan?.prescription || { sets: 4, reps: '8–12', rest: '90s' }
  const related = EXERCISES.filter((e) => e.muscle === ex.muscle && e.id !== ex.id).slice(0, 4)
  const tags = [...ex.tags, ex.equipment, ex.level]

  // Add this exercise to the plan (no duplicates).
  const hasPlan = !!plan
  const inPlan = (plan?.sessions || []).some((s) => s.exercises.some((e) => e.id === ex.id))
  const handleAdd = () => addToPlan({ id: ex.id, name: ex.name, muscle: ex.muscle, equipment: ex.equipment, image: ex.image })

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav active="Exercises" />
      <main className="flex-grow max-w-container-max-width mx-auto w-full px-margin-mobile md:px-margin-desktop py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface-variant hover:text-primary-fixed transition-colors mb-8">
          <Icon name="arrow_back" className="text-sm" />
          <span className="font-label-caps text-label-caps tracking-widest">BACK TO PLAN</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Visuals — single animated start/end demonstration image */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden aspect-[4/3] relative bento-card">
              <img src={frame === 0 ? ex.start : ex.end} alt={`${ex.name} demonstration`} className="w-full h-full object-cover transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Info & actions */}
          <div className="lg:col-span-5 flex flex-col">
            <h1 className="font-display-metric text-[44px] md:text-[56px] leading-[1] uppercase mb-6 text-primary tracking-tighter">{ex.name}</h1>
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((t, i) => (
                <span key={t} className={`px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-label-caps ${i === 0 ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>{String(t).toUpperCase()}</span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <Metric value={pres.sets} label="SETS" />
              <Metric value={pres.reps} label="REPS" />
              <Metric value={pres.rest} label="REST" />
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleAdd}
                disabled={inPlan || !hasPlan}
                className={`w-full py-5 rounded-lg font-headline-lg text-headline-lg-mobile uppercase tracking-tight transition-all flex items-center justify-center gap-3 ${
                  inPlan || !hasPlan
                    ? 'bg-surface-container-high text-on-surface-variant cursor-default'
                    : 'bg-primary-fixed text-on-primary-fixed glow-button hover:brightness-110 active:scale-[0.98]'
                }`}
              >
                <Icon name={inPlan ? 'check_circle' : 'add'} filled={inPlan} /> {inPlan ? 'Added to Plan' : 'Add Exercise'}
              </button>
              <p className="text-on-surface-variant text-sm text-center">
                {!hasPlan ? 'Set up your plan first to add exercises.' : inPlan ? 'This exercise is already in your plan.' : 'Adds this move to your plan.'}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions + muscles */}
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-primary-fixed" />
            <h2 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tighter">How to Perform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {ex.instructions.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary-fixed flex items-center justify-center font-display-metric text-xl text-primary-fixed">{i + 1}</div>
                  <p className="text-on-surface pt-1">{step}</p>
                </div>
              ))}
            </div>
            <div className="bento-card rounded-2xl p-8">
              <div className="w-full flex justify-between items-center mb-6">
                <h3 className="font-headline-lg text-headline-lg uppercase text-primary">Muscles Worked</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-high">
                  <span className="w-3 h-3 rounded-full bg-primary-fixed" />
                  <span className="font-label-caps text-label-caps text-on-surface-variant">PRIMARY</span>
                  <span className="ml-auto font-data-point text-primary-fixed uppercase">{ex.muscle}</span>
                </div>
                {ex.tags.filter((t) => t !== ex.muscle).map((t) => (
                  <div key={t} className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low">
                    <span className="w-3 h-3 rounded-full bg-on-tertiary-container" />
                    <span className="font-label-caps text-label-caps text-on-surface-variant">SECONDARY</span>
                    <span className="ml-auto font-data-point text-on-surface uppercase">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-primary-fixed" />
              <h2 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tighter">Related Exercises</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {related.map((r) => (
                <Link key={r.id} to={`/exercise/${r.id}`} className="bento-card rounded-xl overflow-hidden group block">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <span className="font-label-caps text-label-caps text-primary-fixed mb-1 block">{r.muscle.toUpperCase()}</span>
                    <h4 className="font-headline-lg text-[20px] text-primary uppercase">{r.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
