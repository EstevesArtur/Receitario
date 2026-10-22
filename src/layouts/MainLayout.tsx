import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'

// Header e footer compartilhados; o <Outlet /> troca só o miolo
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-cream-dark py-6 text-center text-xs text-ink-soft">
        Receitário · Checkpoint 5 · FIAP · Artur Esteves — RM569450
      </footer>
    </div>
  )
}
