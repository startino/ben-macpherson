import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'

function App() {
	return (
		<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
			<Sidebar />
			<div className="md:pl-60">
				<main className="mx-auto max-w-7xl px-4 py-6">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default App
