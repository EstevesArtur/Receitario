import { useEffect, useState } from 'react'
import { getRecipes } from '@/services/recipes'
import type { Recipe } from '@/types/recipe'

interface UseRecipesResult {
  recipes: Recipe[]
  loading: boolean
  error: string | null
}

// Busca a lista uma vez e expõe os estados: carregando / erro / sucesso
export function useRecipes(): UseRecipesResult {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getRecipes()
      .then((data) => active && setRecipes(data))
      .catch(() => active && setError('Não foi possível carregar as receitas.'))
      .finally(() => active && setLoading(false))

    // Cleanup: evita setState em componente desmontado
    return () => {
      active = false
    }
  }, [])

  return { recipes, loading, error }
}
