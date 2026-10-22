// Rascunho no mesmo formato do RecipeCard: a página não "pula" quando os dados chegam
export function RecipeCardSkeleton() {
  return (
    <div className="card animate-pulse overflow-hidden">
      <div className="h-44 w-full bg-cream-dark" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 rounded-sm bg-cream-dark" />
        <div className="h-5 w-3/4 rounded-sm bg-cream-dark" />
        <div className="mt-3 h-8 w-24 rounded-full bg-cream-dark" />
      </div>
    </div>
  )
}

export function RecipeGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  )
}
