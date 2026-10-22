import { useMemo, useState } from 'react'
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Catálogo de receitas</h1>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
          ❤️ {favorites.length} favoritas
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Buscar por nome..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
        />
        <select
          value={cuisine}
          onChange={(event) => setCuisine(event.target.value)}
          className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
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
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
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
