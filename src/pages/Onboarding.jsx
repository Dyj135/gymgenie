import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Logo from '../components/Logo.jsx'
import { useStore } from '../store.jsx'
import { GOALS, LEVELS, EQUIPMENT, SCHEDULE_DAYS, SESSION_MINUTES, LIMITATIONS } from '../engine/planner.js'

const STEPS = [
  { key: 'goal', label: 'Goal', icon: 'target' },
  { key: 'experience', label: 'Experience', icon: 'fitness_center' },
  { key: 'equipment', label: 'Equipment', icon: 'handyman' },
  { key: 'schedule', label: 'Schedule', icon: 'calendar_month' },
  { key: 'limitations', label: 'Limitations', icon: 'report_problem' },
]

const HEADINGS = {
  goal: ["What's your goal?", "We'll tailor every workout and metric to this primary focus."],
  experience: ["What's your experience?", "We'll match exercise difficulty to your level."],
  equipment: ['What gear do you have?', 'Select everything that’s available to you.'],
  schedule: ["What's your schedule?", 'How often and how long can you train each week?'],
  limitations: ['Any limitations?', "We'll avoid movements that aggravate these. Optional."],
}

function OptionCard({ icon, label, desc, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left relative group cursor-pointer rounded-xl p-6 kinetic-hover transition-colors border-2 ${
        selected
          ? 'bg-surface-container-high border-primary-fixed-dim selected-glow'
          : 'bg-surface-container-low border-outline-variant hover:border-primary-fixed-dim/50'
      }`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selected ? 'bg-primary-fixed-dim/20 text-primary-fixed-dim' : 'bg-surface-variant text-on-surface-variant group-hover:text-primary-fixed-dim'} transition-colors`}>
          <Icon name={icon} filled={selected} className="text-3xl" />
        </div>
        {selected && (
          <span className="bg-primary-fixed-dim text-on-primary-fixed rounded-full p-1 flex items-center justify-center">
            <Icon name="check" className="text-sm font-bold" />
          </span>
        )}
      </div>
      <h3 className={`font-data-point text-data-point mb-2 uppercase ${selected ? 'text-primary-fixed-dim' : 'text-on-surface'}`}>{label}</h3>
      {desc && <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>}
    </button>
  )
}

function Pill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-label-caps text-label-caps uppercase tracking-widest transition-all border-2 ${
        selected
          ? 'bg-primary-fixed-dim text-on-primary-fixed border-primary-fixed-dim'
          : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary-fixed-dim/50'
      }`}
    >
      {label}
    </button>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { savePreferences } = useStore()
  const [step, setStep] = useState(0)
  const [prefs, setPrefs] = useState({
    goal: null, level: null, equipment: [], days: null, sessionMinutes: null, focus: [], limitations: [],
  })

  const current = STEPS[step]
  const [title, subtitle] = HEADINGS[current.key]
  const progress = Math.round(((step + 1) / STEPS.length) * 100)

  const set = (patch) => setPrefs((p) => ({ ...p, ...patch }))
  const toggle = (key, value) =>
    setPrefs((p) => ({ ...p, [key]: p[key].includes(value) ? p[key].filter((v) => v !== value) : [...p[key], value] }))

  const canContinue = {
    goal: !!prefs.goal,
    experience: !!prefs.level,
    equipment: prefs.equipment.length > 0,
    schedule: !!prefs.days && !!prefs.sessionMinutes,
    limitations: true, // optional
  }[current.key]

  const goBack = () => (step === 0 ? navigate('/') : setStep((s) => s - 1))
  const goNext = () => {
    if (!canContinue) return
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      savePreferences(prefs)
      navigate('/')
    }
  }

  const gearLabel =
    prefs.equipment.length === 0 ? '—'
      : prefs.equipment.length === 1 && prefs.equipment[0] === 'Dumbbell' ? 'Dumbbells Only'
        : prefs.equipment.join(' + ')

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      {/* Header with progress */}
      <header className="bg-background border-b border-outline-variant flex justify-between items-center px-4 md:px-margin-desktop h-20 w-full fixed top-0 z-50">
        <Logo />
        <div className="flex flex-col items-end gap-2 w-48 md:w-64">
          <div className="flex justify-between w-full">
            <span className="font-label-caps text-label-caps text-on-surface-variant">STEP {step + 1} OF {STEPS.length}</span>
            <span className="font-label-caps text-label-caps text-primary-fixed-dim">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary-fixed-dim transition-all duration-300" style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(171,214,0,0.5)' }} />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-28 min-h-screen flex flex-col md:flex-row max-w-container-max-width mx-auto px-4 md:px-8 gap-8">
        {/* Stepper */}
        <nav className="hidden md:flex flex-col w-64 shrink-0 pt-8">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant px-4 mb-4 uppercase tracking-widest">Onboarding Progress</h2>
          <div className="flex flex-col gap-1">
            {STEPS.map((s, i) => {
              const active = i === step
              const done = i < step
              return (
                <div key={s.key} className={`flex items-center gap-4 p-4 rounded-lg transition-all ${active ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant'}`}>
                  <Icon name={done ? 'check_circle' : s.icon} filled={active} className={done ? 'text-primary-fixed-dim' : ''} />
                  <span className="font-label-caps text-label-caps">{s.label}</span>
                </div>
              )
            })}
          </div>
        </nav>

        {/* Question */}
        <section className="flex-1 pt-8 pb-12">
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-fixed-dim uppercase mb-2">{title}</h1>
            <p className="text-on-surface-variant font-body-md">{subtitle}</p>
          </div>

          {current.key === 'goal' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOALS.map((g) => (
                <OptionCard key={g.id} icon={g.icon} label={g.label} desc={g.desc} selected={prefs.goal === g.id} onClick={() => set({ goal: g.id })} />
              ))}
            </div>
          )}

          {current.key === 'experience' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LEVELS.map((l) => (
                <OptionCard key={l.id} icon="trending_up" label={l.label} desc={l.desc} selected={prefs.level === l.id} onClick={() => set({ level: l.id })} />
              ))}
            </div>
          )}

          {current.key === 'equipment' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EQUIPMENT.map((e) => (
                <OptionCard key={e.id} icon={e.icon} label={e.label} desc={e.id === 'Bodyweight' ? 'No gear needed — train anywhere.' : 'A pair of adjustable or fixed dumbbells.'} selected={prefs.equipment.includes(e.id)} onClick={() => toggle('equipment', e.id)} />
              ))}
            </div>
          )}

          {current.key === 'schedule' && (
            <div className="space-y-8">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-3">Days per week</p>
                <div className="flex flex-wrap gap-3">
                  {SCHEDULE_DAYS.map((d) => (
                    <Pill key={d} label={`${d} Days`} selected={prefs.days === d} onClick={() => set({ days: d })} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-3">Time per session</p>
                <div className="flex flex-wrap gap-3">
                  {SESSION_MINUTES.map((m) => (
                    <Pill key={m} label={`${m} Min`} selected={prefs.sessionMinutes === m} onClick={() => set({ sessionMinutes: m })} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {current.key === 'limitations' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LIMITATIONS.map((l) => (
                <OptionCard key={l} icon="health_and_safety" label={l} desc={`Avoid movements that stress the ${l.toLowerCase()}.`} selected={prefs.limitations.includes(l)} onClick={() => toggle('limitations', l)} />
              ))}
            </div>
          )}
        </section>

        {/* Live plan preview */}
        <aside className="w-full md:w-80 shrink-0">
          <div className="sticky top-28 bg-surface-container-low border border-outline-variant rounded-xl p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h4 className="font-label-caps text-label-caps text-primary-fixed-dim mb-6 uppercase tracking-widest border-b border-outline-variant pb-2">Your Plan Preview</h4>
            <div className="space-y-6 relative z-10">
              <PreviewRow icon="stars" label="Primary Focus" value={GOALS.find((g) => g.id === prefs.goal)?.label || '—'} />
              <PreviewRow icon="trending_up" label="Experience" value={prefs.level || '—'} />
              <PreviewRow icon="calendar_today" label="Commitment" value={prefs.days ? `${prefs.days} Days / Week` : '—'} />
              <PreviewRow icon="handyman" label="Core Gear" value={gearLabel} />
              <div className="pt-4 border-t border-outline-variant/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-label-caps text-on-surface-variant uppercase">Setup Progress</span>
                  <span className="text-[10px] font-label-caps text-primary-fixed-dim">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim/40 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer controls */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-outline-variant p-4 z-50">
        <div className="max-w-container-max-width mx-auto flex justify-between items-center gap-4">
          <button onClick={goBack} className="px-8 py-3 rounded-lg border-2 border-primary-fixed-dim/30 text-primary-fixed-dim font-label-caps text-label-caps hover:bg-primary-fixed-dim/10 transition-all uppercase tracking-widest active:scale-95">
            Back
          </button>
          <button
            onClick={goNext}
            disabled={!canContinue}
            className="px-12 py-3 rounded-lg bg-primary-fixed-dim text-on-primary-fixed font-bold font-label-caps text-label-caps hover:bg-primary-fixed transition-all uppercase tracking-widest active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 4px 14px 0 rgba(171,214,0,0.39)' }}
          >
            {step === STEPS.length - 1 ? 'Generate Plan' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  )
}

function PreviewRow({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-label-caps text-on-surface-variant uppercase">{label}</span>
      <div className="flex items-center gap-2">
        <Icon name={icon} filled className="text-primary-fixed-dim text-lg" />
        <span className="font-data-point text-on-surface">{value}</span>
      </div>
    </div>
  )
}
