import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Settings, Users2, PenSquare, BarChart3, Download, ChevronRight, ClipboardList, MessageSquare } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const nav = [
	{ to: '/dashboard', label: 'Home', icon: LayoutGrid },
	{ to: '/personas', label: 'Personas', icon: Users2 },
	{ to: '/creative', label: 'Creative Roadmap', icon: PenSquare },
]

const secondaryNav = [
	{ to: '/surveys', label: 'Surveys', icon: ClipboardList },
	{ to: '/exports', label: 'Exports', icon: Download },
	{ to: '/chat', label: 'Chat', icon: MessageSquare },
	{ to: '/settings', label: 'Settings', icon: Settings },
]

const reportsGroup = [
	{ to: '/dashboard', label: 'Revenue Health' },
	{ to: '/dashboard/profitability', label: 'Profitability' },
	{ to: '/dashboard/profit-impacts', label: 'Profit Impacts' },
	{ to: '/dashboard/customer', label: 'Customer Health' },
	{ to: '/dashboard/ltv-waterfall', label: 'LTV Waterfall' },
	{ to: '/dashboard/merchandise', label: 'Merchandise Health' },
	{ to: '/dashboard/site', label: 'Site Health' },
	{ to: '/dashboard/competitors', label: 'Competitors' },
]

export function Sidebar() {
	const { pathname } = useLocation()
	const [reportsOpen, setReportsOpen] = useState(() => {
		// Open if current path is a report
		return pathname.startsWith('/dashboard')
	})

	return (
		<aside className="fixed inset-y-0 left-0 z-40 hidden w-60 bg-surface/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80 shadow-sm md:flex md:flex-col">
			<div className="flex-1 overflow-y-auto">
				<div className="mb-6 px-3 pt-4">
					<div className="text-base font-semibold tracking-tight">Persona Intelligence</div>
					<div className="mt-1 text-xs text-muted-foreground">DigitalRx Revenue Health</div>
				</div>
				<nav className="grid gap-1 px-2">
					{/* Primary Navigation */}
					<div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
						Intelligence
					</div>
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

					{/* Reports Group */}
					<div className="mt-4">
						<div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
							Analytics
						</div>
						<button
							onClick={() => setReportsOpen(!reportsOpen)}
							className={cn(
								'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
								'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
								pathname.startsWith('/dashboard') && 'bg-accent/30 text-foreground'
							)}
						>
							<BarChart3 className="h-4 w-4" />
							<span className="flex-1 text-left">Reports</span>
							<ChevronRight
								className={cn(
									'h-4 w-4 transition-transform duration-200',
									reportsOpen && 'rotate-90'
								)}
							/>
						</button>
						{reportsOpen && (
							<div className="ml-4 mt-1 space-y-1 border-l border-muted/30 pl-2">
								{reportsGroup.map(({ to, label }) => {
									const active = pathname === to || (pathname === '/dashboard' && to === '/dashboard')
									return (
										<Link
											key={to}
											to={to}
											className={cn(
												'flex items-center rounded-md px-3 py-2 text-sm transition-colors',
												'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
												active && 'bg-accent text-foreground'
											)}
										>
											{label}
										</Link>
									)
								})}
							</div>
						)}
					</div>

					{/* Secondary Navigation */}
					<div className="mt-4">
						<div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
							Tools
						</div>
						{secondaryNav.map(({ to, label, icon: Icon }) => {
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
					</div>
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
