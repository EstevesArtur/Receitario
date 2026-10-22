// Campos da DummyJSON que o Receitário usa (modelados a partir do JSON real)
export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  image: string
  tags: string[]
  mealType: string[]
}

// A lista não vem como array direto: vem dentro deste envelope
export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}
