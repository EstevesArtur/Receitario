import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
    return <p className="py-20 text-center text-sm text-stone-500">Carregando receita...</p>
  }

  if (notFound || !recipe) {
    return (
      <div className="py-20 text-center">
        <p className="mb-3 text-stone-600">Receita não encontrada.</p>
        <Link to="/" className="btn-primary">
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  return (
    <article className="grid gap-6 sm:grid-cols-2">
      <img src={recipe.image} alt={recipe.name} className="h-72 w-full rounded-xl object-cover" />

      <div>
        <h1 className="mb-2 text-2xl font-bold">{recipe.name}</h1>
        <p className="mb-4 text-sm text-stone-500">
          {recipe.cuisine} · {recipe.difficulty} · {recipe.servings} porções
        </p>

        <ul className="mb-6 flex flex-wrap gap-2 text-sm">
          <li className="rounded-full bg-stone-100 px-3 py-1">Preparo: {recipe.prepTimeMinutes} min</li>
          <li className="rounded-full bg-stone-100 px-3 py-1">Cozimento: {recipe.cookTimeMinutes} min</li>
          <li className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
            Total: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
          </li>
        </ul>

        <h2 className="mb-2 text-lg font-semibold">Ingredientes</h2>
        <ul className="mb-6 list-disc space-y-1 pl-5 text-sm">
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mb-2 text-lg font-semibold">Modo de preparo</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <Link to="/" className="mt-6 inline-block text-sm font-medium text-orange-600 hover:underline">
          ← Voltar ao catálogo
        </Link>
      </div>
    </article>
  )
}
