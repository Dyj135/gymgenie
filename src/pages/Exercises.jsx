import { useState } from 'react'
import { Link } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'
import Footer from '../components/Footer.jsx'
import Icon from '../components/Icon.jsx'
import { EXERCISES, MUSCLES } from '../data/exercises.js'

const MUSCLE_FILTERS = ['All', ...MUSCLES]
const EQUIPMENT_FILTERS = ['All', 'Bodyweight', 'Dumbbell']

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest transition-all border ${
        active
          ? 'bg-primary-fixed text-on-primary-fixed border-primary-fixed'
          : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary-fixed-dim/50'
      }`}
    >
      {label}
    </button>
  )
}

export default function Exercises() {
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState('All')
  const [equipment, setEquipment] = useState('All')

  const results = EXERCISES.filter((e) => {
    const matchesQuery = e.name.toLowerCase().includes(query.trim().toLowerCase())
    const matchesMuscle = muscle === 'All' || e.muscle === muscle
    const matchesEquip = equipment === 'All' || e.equipment === equipment
    return matchesQuery && matchesMuscle && matchesEquip
  })

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav active="Exercises" />
      <main className="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tighter">Exercise Library</h1>
          <p className="text-on-surface-variant font-body-md mt-1">Browse all {EXERCISES.length} moves — search and filter to find your next exercise.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"><Icon name="search" /></span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises…"
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-12 pr-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {MUSCLE_FILTERS.map((m) => (
              <Chip key={m} label={m} active={muscle === m} onClick={() => setMuscle(m)} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {EQUIPMENT_FILTERS.map((eq) => (
              <Chip key={eq} label={eq} active={equipment === eq} onClick={() => setEquipment(eq)} />
            ))}
          </div>
        </div>

        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">{results.length} result{results.length === 1 ? '' : 's'}</p>

        {/* Grid */}
        {results.length === 0 ? (
          <div className="bento-card rounded-xl p-12 text-center">
            <Icon name="search_off" className="text-[48px] text-on-surface-variant" />
            <p className="text-on-surface-variant mt-4">No exercises match your filters. Try clearing the search or picking a different group.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {results.map((e) => (
              <Link key={e.id} to={`/exercise/${e.id}`} className="bento-card rounded-xl overflow-hidden group block">
                <div className="aspect-video relative overflow-hidden">
                  <img src={e.image} alt={e.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <span className="font-label-caps text-label-caps text-primary-fixed mb-1 block">{e.muscle.toUpperCase()}</span>
                  <h3 className="font-headline-lg text-[20px] text-primary uppercase leading-tight">{e.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps uppercase text-on-surface-variant">{e.equipment}</span>
                    <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps uppercase text-on-surface-variant">{e.level}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
