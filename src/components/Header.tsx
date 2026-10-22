import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-orange-600">
          Receitário
        </Link>
        <nav>
          <Link to="/" className="text-sm font-medium text-stone-600 hover:text-orange-600">
            Catálogo
          </Link>
        </nav>
      </div>
    </header>
  )
}
