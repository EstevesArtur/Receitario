import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <p className="text-5xl font-bold text-stone-300">404</p>
      <h1 className="mt-3 mb-2 text-xl font-bold">Página não encontrada</h1>
      <p className="mb-5 text-sm text-stone-500">O endereço digitado não existe no Receitário.</p>
      <Link to="/" className="btn-primary">
        Voltar ao catálogo
      </Link>
    </div>
  )
}
