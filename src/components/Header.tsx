import { Link } from 'react-router-dom'
import { ForkIcon } from '@/components/icons'

export function Header() {
  return (
    <header className="bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-pepper text-cream">
            <ForkIcon />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">Receitário</span>
        </Link>
        <nav>
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-cream/80 transition hover:bg-white/10 hover:text-cream"
          >
            Catálogo
          </Link>
        </nav>
      </div>
    </header>
  )
}
