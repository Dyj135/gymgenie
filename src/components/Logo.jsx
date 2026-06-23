import Icon from './Icon.jsx'

// Wordmark: lime tile + "GYMGENIE". Self-contained, no image asset.
export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed">
        <Icon name="exercise" filled className="text-[20px]" />
      </span>
      <span className="font-headline-lg text-2xl font-bold tracking-tighter text-primary">
        <span className="text-primary-fixed">GYM</span>GENIE
      </span>
    </div>
  )
}
