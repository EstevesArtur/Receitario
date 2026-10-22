import { RecipeCard } from '@/components/RecipeCard'
import type { Recipe } from '@/types/recipe'

interface RecipeListProps {
  recipes: Recipe[]
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

export function RecipeList({ recipes, favorites, onToggleFavorite }: RecipeListProps) {
  // Estado vazio: a busca/filtro não encontrou nada
  if (recipes.length === 0) {
    return (
      <div className="card py-16 text-center">
        <p className="font-display text-xl font-semibold text-ink">Nenhuma receita encontrada</p>
        <p className="mt-1 text-sm text-ink-soft">Tente outra busca ou culinária.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
