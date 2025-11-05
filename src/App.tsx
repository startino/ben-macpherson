import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'

function App() {
	const location = useLocation()
	const isOnboarding = location.pathname === '/onboarding' || location.pathname === '/ben-macpherson/onboarding'
	const isLanding = location.pathname === '/' || location.pathname === '/ben-macpherson/'

	// Don't show sidebar on onboarding or landing pages
	if (isOnboarding || isLanding) {
		return (
			<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
				<main>
					<Outlet />
				</main>
			</div>
		)
	}

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
