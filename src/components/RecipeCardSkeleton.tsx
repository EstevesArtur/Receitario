// Rascunho cinza no mesmo formato do RecipeCard: a página não "pula" quando os dados chegam
export function RecipeCardSkeleton() {
  return (
    <div className="card animate-pulse overflow-hidden">
      <div className="h-40 w-full bg-stone-200" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 rounded-sm bg-stone-200" />
        <div className="h-3 w-1/2 rounded-sm bg-stone-200" />
        <div className="h-3 w-1/3 rounded-sm bg-stone-200" />
      </div>
    </div>
  )
}

export function RecipeGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  )
}
