import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { AIAssistant } from '@/components/layout/AIAssistant'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { SupportResources } from '@/components/layout/SupportResources'
import { AIAssistantProvider, useAIAssistant } from '@/contexts/AIAssistantContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Bell, Plus, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function TopBar() {
	return (
		<header className="sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="flex h-14 items-center gap-4 px-4">
				<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
					<span className="text-muted-foreground/80">Home</span>
					<X className="h-4 w-4 text-muted-foreground/70" />
					<Button
						variant="ghost"
						size="sm"
						className="rounded-full border border-border/40 bg-secondary/60 px-3 text-foreground hover:bg-secondary"
					>
						startino website
					</Button>
				</div>
				<div className="flex flex-1 items-center gap-2">
					<div className="relative flex-1 max-w-xl">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input className="w-full rounded-full bg-secondary/50 pl-9" placeholder="Search or jump to…" />
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full border border-transparent text-muted-foreground hover:border-border/60"
					>
						<Bell className="h-4 w-4" />
					</Button>
					<Button
						variant="default"
						size="sm"
						className="flex items-center gap-1 rounded-full bg-primary px-3 text-primary-foreground shadow-sm hover:bg-primary/90"
					>
						<Plus className="h-4 w-4" />
						New
					</Button>
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
