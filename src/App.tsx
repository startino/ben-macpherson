import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { AIAssistant } from '@/components/layout/AIAssistant'
import { AIAssistantProvider, useAIAssistant } from '@/contexts/AIAssistantContext'

function AppContent() {
	const location = useLocation()
	const { isOpen } = useAIAssistant()
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
			<div className="flex md:pl-60">
				<main 
					className={`flex-1 px-4 py-6 transition-all duration-300 ${
						isOpen ? 'mr-96' : 'mx-auto max-w-7xl'
					}`}
				>
					<Outlet />
				</main>
				<AIAssistant />
			</div>
		</div>
	)
}

function App() {
	return (
		<AIAssistantProvider>
			<AppContent />
		</AIAssistantProvider>
	)
}

export default App
