import type { Recipe, RecipesResponse } from '@/types/recipe'

const BASE_URL = 'https://dummyjson.com/recipes'

// limit=0 traz as 50 receitas (sem ele a API devolve só 30)
export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}?limit=0`)
  if (!response.ok) throw new Error('Falha ao carregar receitas')
  const data: RecipesResponse = await response.json()
  return data.recipes
}

// Id inexistente responde 404 → lança erro para a tela tratar
export async function getRecipeById(id: number): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Receita não encontrada')
  return response.json()
}
