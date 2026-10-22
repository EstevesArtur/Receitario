import { useMemo, useState } from 'react'
import { HeartIcon } from '@/components/icons'
import { RecipeList } from '@/components/RecipeList'
import { RecipeGridSkeleton } from '@/components/RecipeCardSkeleton'
import { useRecipes } from '@/hooks/useRecipes'

export function CatalogPage() {
  const { recipes, loading, error } = useRecipes()

  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('all')
  // Favoritos vivem só nesta página (regra do checkpoint)
  const [favorites, setFavorites] = useState<number[]>([])

  // Lista de culinárias montada a partir da API, sem valores escritos à mão
  const cuisines = useMemo(
    () => ['all', ...new Set(recipes.map((recipe) => recipe.cuisine))],
    [recipes],
  )

  // Busca e filtro funcionam juntos
  const filtered = useMemo(
    () =>
      recipes.filter(
        (recipe) =>
          (cuisine === 'all' || recipe.cuisine === cuisine) &&
          recipe.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [recipes, cuisine, query],
  )

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    )
  }

  return (
    <section>
      {/* Faixa de título */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold tracking-widest text-pepper uppercase">
            {recipes.length > 0 ? `${recipes.length} receitas` : 'Catálogo'}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-ink">O que vamos cozinhar hoje?</h1>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-light px-4 py-2 text-sm font-semibold text-ink">
          <HeartIcon className="h-4 w-4 text-pepper" />
          {favorites.length} {favorites.length === 1 ? 'favorita' : 'favoritas'}
        </span>
      </div>

      {/* Busca + filtro */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Buscar por nome..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="input flex-1"
        />
        <select
          value={cuisine}
          onChange={(event) => setCuisine(event.target.value)}
          className="input sm:w-56"
        >
          {cuisines.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'Todas as culinárias' : option}
            </option>
          ))}
        </select>
      </div>

      {/* Ordem importa: erro → carregando → conteúdo */}
      {error ? (
        <p className="rounded-xl border border-amber bg-amber-light px-4 py-3 text-sm text-ink">
          {error} Verifique sua conexão e recarregue a página.
        </p>
      ) : loading ? (
        <RecipeGridSkeleton />
      ) : (
        <RecipeList recipes={filtered} favorites={favorites} onToggleFavorite={toggleFavorite} />
      )}
    </section>
  )
}
