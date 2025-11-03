import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'

function App() {
	return (
		<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
			<Sidebar />
			<div className="md:pl-60">
				<header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80 shadow-sm">
					<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
						<div className="text-lg font-semibold tracking-tight">Persona Intelligence</div>
					</div>
				</header>
				<main className="mx-auto max-w-7xl px-4 py-6">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default App
