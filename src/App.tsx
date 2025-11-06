import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { AIAssistant } from '@/components/layout/AIAssistant'
import { AIAssistantProvider } from '@/contexts/AIAssistantContext'

function App() {
	const location = useLocation()
	const isOnboarding = location.pathname === '/onboarding' || location.pathname === '/ben-macpherson/onboarding'
	const isLanding = location.pathname === '/' || location.pathname === '/ben-macpherson/'

	// Don't show sidebar on onboarding or landing pages
	if (isOnboarding || isLanding) {
		return (
			<AIAssistantProvider>
				<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
					<main>
						<Outlet />
					</main>
				</div>
				<AIAssistant />
			</AIAssistantProvider>
		)
	}

	return (
		<AIAssistantProvider>
			<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
				<Sidebar />
				<div className="md:pl-60">
					<main className="mx-auto max-w-7xl px-4 py-6">
						<Outlet />
					</main>
				</div>
			</div>
			<AIAssistant />
		</AIAssistantProvider>
	)
}

export default App
