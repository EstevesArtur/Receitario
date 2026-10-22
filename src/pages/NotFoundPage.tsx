import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-7xl font-bold text-amber">404</p>
      <h1 className="mt-3 mb-2 text-2xl font-bold text-ink">Página não encontrada</h1>
      <p className="mb-6 text-sm text-ink-soft">O endereço digitado não existe no Receitário.</p>
      <Link to="/" className="btn-primary">
        Voltar ao catálogo
      </Link>
    </div>
  )
}
