import { Link } from 'react-router-dom'
import { ClockIcon, HeartIcon } from '@/components/icons'
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
    <article className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/receitas/${recipe.id}`} className="relative block overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Selo de tempo sobre a foto */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
          <ClockIcon className="h-3.5 w-3.5" />
          {totalTime} min
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-semibold tracking-wide text-pepper uppercase">{recipe.cuisine}</p>
        <Link
          to={`/receitas/${recipe.id}`}
          className="font-display text-lg leading-snug font-semibold text-ink hover:text-pepper"
        >
          {recipe.name}
        </Link>

        <button
          type="button"
          onClick={() => onToggleFavorite(recipe.id)}
          aria-pressed={isFavorite}
          className={
            isFavorite
              ? 'mt-auto inline-flex items-center gap-1.5 self-start rounded-full bg-pepper px-3 py-1.5 text-sm font-medium text-white transition hover:bg-pepper-dark'
              : 'mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-cream-dark px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:border-pepper hover:text-pepper'
          }
        >
          <HeartIcon />
          {isFavorite ? 'Favorita' : 'Favoritar'}
        </button>
      </div>
    </article>
  )
}
