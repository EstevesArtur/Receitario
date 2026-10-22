import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'

// Header e footer compartilhados; o <Outlet /> troca só o miolo
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        Receitário · Checkpoint 5 · FIAP · Artur Esteves — RM569450
      </footer>
    </div>
  )
}
