// Shared minimal footer. Links are inert (assignment scope).
export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full mt-auto border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max-width mx-auto gap-4">
        <div className="text-center md:text-left">
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase font-bold">GymGenie</span>
          <p className="font-body-md text-label-caps text-on-surface-variant opacity-60 mt-1">© 2024 GymGenie. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          {['Privacy Policy', 'Terms of Service', 'Contact'].map((l) => (
            <span key={l} className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-fixed transition-colors cursor-default">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
