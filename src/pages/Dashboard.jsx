import { Link, useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import Footer from '../components/Footer.jsx'
import Icon from '../components/Icon.jsx'
import { useStore } from '../store.jsx'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Conic-gradient progress ring.
function Ring({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div
      className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
      style={{ background: `radial-gradient(closest-side, #1e1e1e 80%, transparent 0), conic-gradient(#c3f400 ${pct}%, #2a2a2a 0)` }}
    >
      <div className="flex flex-col items-center">
        <span className="font-display-metric text-[32px] md:text-[40px] leading-none">{done}/{total}</span>
        <span className="font-label-caps text-[10px] uppercase opacity-60 mt-1">Done</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, valueClass = '' }) {
  return (
    <div className="bg-surface-container-low p-6 border border-outline-variant rounded-lg">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">{label}</span>
      <div className={`font-display-metric text-headline-lg mt-1 ${valueClass}`}>{value}</div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { plan, progress, toggleExercise, removeFromPlan } = useStore()

  const today = plan.sessions[0]
  const todayTotal = today.exercises.length
  const todayDone = today.exercises.filter((e) => progress[e.id]).length
  const todayPct = todayTotal ? Math.round((todayDone / todayTotal) * 100) : 0
  const allDone = todayTotal > 0 && todayDone === todayTotal
  const muscleTags = [...new Set(today.exercises.map((e) => e.muscle))].slice(0, 3)

  // Recommendations: plan moves not in today's session.
  const todayIds = new Set(today.exercises.map((e) => e.id))
  const recommended = plan.sessions
    .flatMap((s) => s.exercises)
    .filter((e, i, arr) => arr.findIndex((x) => x.id === e.id) === i)
    .filter((e) => !todayIds.has(e.id))
    .slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav active="Dashboard" />
      <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8">
        {/* Hero — today's workout */}
        <section className="relative bg-surface-container rounded-xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row justify-between items-center border border-outline-variant soft-glow-primary gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps rounded-full">
              Tailored for: {plan.goalLabel} · {plan.gearLabel}
            </span>
            <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight">TODAY · DAY 1 — {today.title}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-on-surface-variant">
              <div className="flex items-center gap-1 font-body-md text-body-md"><Icon name="schedule" /> {plan.sessionMinutes} min</div>
              <div className="flex items-center gap-1 font-body-md text-body-md"><Icon name="fitness_center" /> {today.exercises.length} exercises</div>
              <div className="flex gap-2">
                {muscleTags.map((m) => (
                  <span key={m} className="px-2 py-0.5 bg-surface-container-highest rounded text-label-caps font-label-caps text-on-surface">{m}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => today.exercises[0] && navigate(`/exercise/${today.exercises[0].id}`)}
              className="mt-6 px-8 py-4 bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps rounded-full font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              {allDone ? (<><Icon name="check_circle" filled /> Workout Complete</>) : 'Start Workout'}
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Ring done={todayDone} total={todayTotal} />
            <span className="font-label-caps text-label-caps text-on-surface-variant">Today's Workout</span>
          </div>
        </section>

        {/* Personalised rationale */}
        <p className="text-on-surface-variant font-body-md text-body-md border-l-2 border-primary-fixed pl-4">
          {plan.rationale}
        </p>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Done today" value={`${todayDone}/${todayTotal}`} valueClass="text-primary-fixed" />
          <StatCard label="Current streak" value="12 days" valueClass="text-secondary" />
          <StatCard label="Weekly volume" value="12.4k kg" />
          <StatCard label="Today's progress" value={`${todayPct}%`} valueClass="text-primary-fixed" />
        </section>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: week + today's exercises */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-4">This Week</h2>
              <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                {WEEKDAYS.map((d, i) => {
                  const session = plan.sessions[i]
                  const isToday = i === 0
                  return (
                    <div key={d} className="flex flex-col items-center gap-2 min-w-[50px]">
                      <span className={`font-label-caps text-label-caps ${isToday ? 'text-primary-fixed' : session ? 'text-on-surface-variant' : 'text-on-surface-variant opacity-40'}`}>{d}</span>
                      {isToday ? (
                        <div className="w-10 h-10 border-2 border-primary-fixed rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-fixed rounded-full" />
                        </div>
                      ) : session ? (
                        <div className="w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant flex items-center justify-center">
                          <Icon name="fitness_center" className="text-[16px] text-on-surface-variant" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-surface-container-high rounded-full border border-outline-variant" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-headline-lg text-headline-lg">Today's Exercises</h2>
              {today.exercises.map((ex, idx) => {
                const done = !!progress[ex.id]
                return (
                  <div
                    key={ex.id}
                    className={`flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border transition-colors ${done ? 'border-primary-fixed/40' : idx === 0 ? 'border-l-4 border-secondary-container' : 'border-outline-variant'}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExercise(ex.id)}
                      aria-label={done ? 'Mark as not done' : 'Mark as done'}
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${done ? 'bg-primary-fixed border-primary-fixed text-on-primary-fixed' : 'border-outline-variant text-transparent hover:border-primary-fixed'}`}
                    >
                      <Icon name="check" className="text-[18px]" />
                    </button>
                    <Link to={`/exercise/${ex.id}`} className="flex items-center gap-4 flex-grow group min-w-0">
                      <img src={ex.image} alt={ex.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                      <div className="flex-grow min-w-0">
                        <h3 className={`font-data-point text-data-point ${done ? 'line-through opacity-60' : ''}`}>{ex.name}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-surface-container-high rounded text-label-caps font-label-caps">{ex.muscle}</span>
                          <span className="px-2 py-0.5 bg-surface-container-high rounded text-label-caps font-label-caps">{ex.equipment}</span>
                        </div>
                        <div className="text-primary-fixed font-label-caps text-label-caps mt-2">{ex.sets} × {ex.reps} Reps</div>
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromPlan(ex.id)}
                      aria-label="Remove from plan"
                      className="shrink-0 p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                    >
                      <Icon name="delete" />
                    </button>
                  </div>
                )
              })}
              {today.exercises.length === 0 && (
                <Link to="/exercises" className="flex items-center justify-center gap-2 bento-card rounded-xl p-8 text-on-surface-variant hover:text-primary-fixed transition-colors">
                  <Icon name="add" /> No exercises today — browse the library to add some.
                </Link>
              )}
            </div>
          </div>

          {/* Right: recommended + tip */}
          <div className="space-y-8">
            <section>
              <h2 className="font-headline-lg text-headline-lg mb-4">Recommended for you</h2>
              <div className="space-y-4">
                {recommended.map((ex) => (
                  <Link key={ex.id} to={`/exercise/${ex.id}`} className="block bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant group">
                    <img src={ex.image} alt={ex.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3">
                      <h4 className="font-data-point text-label-caps uppercase">{ex.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] font-label-caps uppercase">{ex.muscle}</span>
                        <span className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] font-label-caps uppercase">{ex.equipment}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="bg-surface-container-high p-6 rounded-xl border border-outline-variant relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Icon name="lightbulb" className="text-[120px] text-primary-fixed" />
              </div>
              <div className="relative z-10">
                <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest">Personalised tip</span>
                <div className="mt-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-metric text-headline-lg">180g</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Protein Target</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    To support your {plan.goalLabel} goal, aim to hit your protein target within a few hours of today's {today.title} session.
                  </p>
                </div>
              </div>
            </section>

            <button onClick={() => navigate('/onboarding')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-fixed/10 border-2 border-primary-fixed text-primary-fixed font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">
              <Icon name="tune" /> Edit preferences
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
