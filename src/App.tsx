import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { AIAssistant } from '@/components/layout/AIAssistant'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { SupportResources } from '@/components/layout/SupportResources'
import { AIAssistantProvider, useAIAssistant } from '@/contexts/AIAssistantContext'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

function TopBar() {
	return (
		<header className="sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="flex h-14 items-center px-4">
				<div className="relative flex-1 max-w-3xl">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input className="w-full rounded-full bg-secondary/50 pl-9" placeholder="Search or jump to…" />
				</div>
			</div>
		</header>
	)
}

function AppContent() {
	const location = useLocation()
	const { activePanel } = useAIAssistant()
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
			<RightSidebar />
			<div className="flex min-h-screen flex-col md:pl-64 md:pr-20">
				<TopBar />
				<main
					className={cn(
						'mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 pr-4 transition-all duration-300',
						activePanel && 'mr-96'
					)}
				>
					<Outlet />
				</main>
			</div>
			<AIAssistant />
			<SupportResources />
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
