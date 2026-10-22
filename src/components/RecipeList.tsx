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
      <p className="py-16 text-center text-sm text-stone-500">
        Nenhuma receita encontrada. Tente outra busca ou culinária.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
