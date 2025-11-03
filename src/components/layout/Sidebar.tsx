import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Settings, Users2, PenSquare, BarChart3, Download } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const nav = [
	{ to: '/', label: 'Dashboard', icon: LayoutGrid },
	{ to: '/settings', label: 'Settings', icon: Settings },
	{ to: '/personas', label: 'Personas', icon: Users2 },
	{ to: '/creative', label: 'Creative', icon: PenSquare },
	{ to: '/dashboard', label: 'Reports', icon: BarChart3 },
	{ to: '/exports', label: 'Exports', icon: Download },
]

export function Sidebar() {
	const { pathname } = useLocation()
	return (
		<aside className="fixed inset-y-0 left-0 z-40 hidden w-60 bg-surface/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80 shadow-sm md:flex md:flex-col">
			<div className="flex-1 overflow-y-auto">
				<div className="mb-6 px-3 pt-4">
					<div className="text-base font-semibold tracking-tight">Persona Intelligence</div>
					<div className="mt-1 text-xs text-muted-foreground">DigitalRx Revenue Health</div>
				</div>
				<nav className="grid gap-1 px-2">
					{nav.map(({ to, label, icon: Icon }) => {
						const active = pathname === to
						return (
							<Link
								key={to}
								to={to}
								className={cn(
									'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
									'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
									active && 'bg-accent text-foreground shadow-sm'
								)}
							>
								<Icon className={cn('h-4 w-4 transition-transform duration-200', active && 'scale-110')} />
								<span>{label}</span>
							</Link>
						)
					})}
				</nav>
			</div>
			<div className="bg-muted/30 p-3">
				<div className="flex items-center justify-between rounded-lg px-2 py-1.5">
					<span className="text-xs text-muted-foreground">Theme</span>
					<ThemeToggle />
				</div>
			</div>
		</aside>
	)
}
