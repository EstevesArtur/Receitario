import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClockIcon } from '@/components/icons'
import { getRecipeById } from '@/services/recipes'
import type { Recipe } from '@/types/recipe'

export function RecipePage() {
  const { id } = useParams<{ id: string }>()

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    setLoading(true)
    setNotFound(false)

    getRecipeById(Number(id))
      .then((data) => active && setRecipe(data))
      // Id inexistente (404) ou API fora do ar caem aqui
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false))

    // Cleanup: ignora resposta atrasada se o id mudar antes
    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return <p className="py-20 text-center text-sm text-ink-soft">Carregando receita...</p>
  }

  if (notFound || !recipe) {
    return (
      <div className="card mx-auto max-w-md py-16 text-center">
        <p className="font-display text-2xl font-semibold text-ink">Receita não encontrada</p>
        <p className="mt-1 mb-6 text-sm text-ink-soft">Essa receita não existe ou foi removida.</p>
        <Link to="/" className="btn-primary">
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <article className="grid gap-8 sm:grid-cols-2">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-80 w-full rounded-2xl object-cover shadow-md"
      />

      <div>
        <p className="mb-2 text-xs font-semibold tracking-widest text-pepper uppercase">
          {recipe.cuisine} · {recipe.difficulty}
        </p>
        <h1 className="mb-3 text-4xl leading-tight font-bold tracking-tight text-ink">{recipe.name}</h1>
        <p className="mb-5 text-sm text-ink-soft">{recipe.servings} porções</p>

        {/* Tempos */}
        <ul className="mb-8 flex flex-wrap gap-2 text-sm">
          <li className="rounded-full bg-white px-3 py-1.5 ring-1 ring-cream-dark">
            Preparo: <strong>{recipe.prepTimeMinutes} min</strong>
          </li>
          <li className="rounded-full bg-white px-3 py-1.5 ring-1 ring-cream-dark">
            Cozimento: <strong>{recipe.cookTimeMinutes} min</strong>
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-pepper px-3 py-1.5 font-semibold text-white">
            <ClockIcon className="h-4 w-4" />
            Total: {totalTime} min
          </li>
        </ul>

        <h2 className="mb-3 text-2xl font-semibold text-ink">Ingredientes</h2>
        <ul className="mb-8 space-y-2 text-sm">
          {recipe.ingredients.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pepper" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 text-2xl font-semibold text-ink">Modo de preparo</h2>
        <ol className="space-y-3 text-sm">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-light text-xs font-bold text-ink">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <Link to="/" className="mt-8 inline-block text-sm font-semibold text-pepper hover:underline">
          ← Voltar ao catálogo
        </Link>
      </div>
    </article>
  )
}
