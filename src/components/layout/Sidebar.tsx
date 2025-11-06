import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import {
	LayoutGrid,
	Settings,
	Users2,
	PenSquare,
	BarChart3,
	Download,
	ChevronRight,
	ClipboardList,
	Database,
	Sparkles,
	LineChart,
	Layers,
	Gauge,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

type NavItem = {
	to: string
	label: string
	icon?: React.ComponentType<{ className?: string }>
	secondaryText?: string
}

type NavSection = {
	group: string
	items: NavItem[]
	collapsible?: boolean
	id?: string
}

const NAV_SECTIONS: NavSection[] = [
	{
		group: 'Project',
		items: [
			{ to: '/dashboard', label: 'Home', icon: LayoutGrid },
			{ to: '/inputs', label: 'Data Connections', icon: Database },
			{ to: '/settings', label: 'Settings', icon: Settings },
		],
	},
	{
		group: 'Analytics',
		id: 'analytics',
		collapsible: true,
		items: [
			{ to: '/dashboard', label: 'Revenue Health', icon: LineChart },
			{ to: '/dashboard/profitability', label: 'Profitability', icon: Gauge },
			{ to: '/dashboard/profit-impacts', label: 'Profit Impacts', icon: Layers },
			{ to: '/dashboard/customer', label: 'Customer Health', icon: Users2 },
			{ to: '/dashboard/ltv-waterfall', label: 'LTV Waterfall', icon: BarChart3 },
			{ to: '/dashboard/merchandise', label: 'Merchandise Health', icon: PenSquare },
			{ to: '/dashboard/site', label: 'Site Health', icon: Gauge },
			{ to: '/dashboard/competitors', label: 'Competitors', icon: ClipboardList },
		],
	},
	{
		group: 'Behavior',
		items: [
			{ to: '/personas', label: 'Personas', icon: Users2 },
			{ to: '/surveys', label: 'Surveys', icon: ClipboardList },
		],
	},
	{
		group: 'Features',
		items: [
			{ to: '/creative', label: 'Creative Roadmap', icon: PenSquare },
			{ to: '/exports', label: 'Exports', icon: Download },
		],
	},
	{
		group: 'Tools',
		items: [
			{ to: '/chat', label: 'AI Assistant', icon: Sparkles },
			{ to: '/admin', label: 'Admin', icon: Settings },
		],
	},
]

export function Sidebar() {
	const { pathname } = useLocation()
	const initialOpenSections = useMemo(() => {
		const analyticsActive = pathname.startsWith('/dashboard')
		return {
			analytics: analyticsActive,
		}
	}, [pathname])
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpenSections)

	const toggleSection = (id: string | undefined) => {
		if (!id) return
		setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	const renderNavItem = ({ to, label, icon: Icon }: NavItem) => {
		const active = pathname === to || (to === '/dashboard' && pathname === '/')
		return (
			<Link
				key={to}
				to={to}
				className={cn(
					'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150',
					'hover:bg-secondary/60 hover:text-foreground text-muted-foreground',
					active && 'bg-secondary text-foreground shadow-sm border border-border/40'
				)}
			>
				{Icon && <Icon className={cn('h-4 w-4 text-muted-foreground group-hover:text-foreground', active && 'text-primary')} />}
				<span className="truncate">{label}</span>
			</Link>
		)
	}

	return (
		<aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-r border-border/40 md:flex md:flex-col">
			<div className="border-b border-border/40 px-4 pb-4 pt-6">
				<div className="text-[10px] uppercase tracking-wide text-muted-foreground">Workspace</div>
				<button className="mt-2 flex w-full items-center justify-between rounded-md border border-border/50 bg-secondary/60 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
					<span>startino website</span>
					<ChevronRight className="h-4 w-4 text-muted-foreground" />
				</button>
			</div>
			<div className="flex-1 overflow-y-auto px-3 py-4">
				<nav className="space-y-6">
					{NAV_SECTIONS.map(({ group, items, collapsible, id }) => {
						const isOpen = id ? openSections[id] ?? false : true
						const activeInSection = items.some(({ to }) => pathname === to || pathname.startsWith(to))
						return (
							<div key={group}>
								<div className="mb-2 flex items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
									<span>{group}</span>
									{collapsible && (
										<button
											type="button"
											onClick={() => toggleSection(id)}
											className={cn(
												'flex h-6 w-6 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors',
												'hover:border-border/60 hover:text-foreground',
												activeInSection && 'border-border/60 text-foreground'
											)}
										>
											<ChevronRight
												className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-90')}
											/>
										</button>
									)}
								</div>
								{(!collapsible || isOpen) && (
									<div className="space-y-1">
										{items.map(renderNavItem)}
									</div>
								)}
							</div>
						)
					})}
				</nav>
			</div>
			<div className="border-t border-border/40 p-3">
				<div className="flex items-center justify-between rounded-md border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
					<span>Theme</span>
					<ThemeToggle />
				</div>
			</div>
		</aside>
	)
}
