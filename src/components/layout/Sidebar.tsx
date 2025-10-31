import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Settings, Users2, PenSquare, BarChart3, Download } from 'lucide-react'

const nav = [
	{ to: '/', label: 'Overview', icon: LayoutGrid },
	{ to: '/inputs', label: 'Inputs', icon: Settings },
	{ to: '/personas', label: 'Personas', icon: Users2 },
	{ to: '/creative', label: 'Creative', icon: PenSquare },
	{ to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
	{ to: '/exports', label: 'Exports', icon: Download },
]

export function Sidebar() {
	const { pathname } = useLocation()
	return (
		<aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-border bg-card/60 p-3 backdrop-blur md:block">
			<div className="mb-4 px-2 text-sm font-semibold tracking-tight">Persona Intelligence</div>
			<nav className="grid gap-1">
				{nav.map(({ to, label, icon: Icon }) => {
					const active = pathname === to
					return (
						<Link
							key={to}
							to={to}
							className={cn(
								'flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent/30',
								active && 'bg-accent/20 text-foreground'
							)}
						>
							<Icon className="h-4 w-4" />
							<span>{label}</span>
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
