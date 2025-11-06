import { Home, Users, Palette, BarChart3, FileText, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
	{ to: '/dashboard', icon: Home, label: 'Home' },
	{ to: '/personas', icon: Users, label: 'Personas' },
	{ to: '/creative', icon: Palette, label: 'Creative' },
	{ to: '/dashboard/reports', icon: BarChart3, label: 'Analytics' },
	{ to: '/exports', icon: FileText, label: 'Exports' },
	{ to: '/settings', icon: Settings, label: 'Settings' },
]

export function RightSidebar() {
	const location = useLocation()

	return (
		<aside className="fixed right-0 top-0 z-30 hidden h-screen w-20 flex-col items-center border-l border-border/40 bg-background/95 py-4 backdrop-blur md:flex">
			<nav className="flex flex-1 flex-col items-center gap-2">
				{navItems.map((item) => {
					const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
					return (
						<Link
							key={item.to}
							to={item.to}
							className={cn(
								'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
								isActive
									? 'bg-primary/10 text-primary'
									: 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
							)}
							title={item.label}
						>
							<item.icon className="h-5 w-5" />
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
