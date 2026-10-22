import { Link } from 'react-router-dom'
import type { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  // Tempo total calculado no front (regra do checkpoint)
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <article className="card flex flex-col overflow-hidden">
      <Link to={`/receitas/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link to={`/receitas/${recipe.id}`} className="font-semibold hover:text-orange-600">
          {recipe.name}
        </Link>
        <p className="text-sm text-stone-500">{recipe.cuisine}</p>
        <p className="text-sm text-stone-500">⏱ {totalTime} min</p>

        <button
          type="button"
          onClick={() => onToggleFavorite(recipe.id)}
          aria-pressed={isFavorite}
          className="mt-auto self-start rounded-full border border-stone-200 px-3 py-1 text-sm hover:bg-stone-100"
        >
          {isFavorite ? '❤️ Favorita' : '🤍 Favoritar'}
        </button>
      </div>
    </article>
  )
}
