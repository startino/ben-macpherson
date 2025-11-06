import { useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronRight, LayoutDashboard, Plus } from 'lucide-react'

type Workspace = {
	id: string
	name: string
	plan: string
	brandCount: number
	lastActive: string
}

const WORKSPACES: Workspace[] = [
	{ id: 'startino', name: 'startino website', plan: 'Growth · Paid', brandCount: 7, lastActive: 'Active now' },
	{ id: 'ben', name: 'ben macpherson', plan: 'Starter · Free', brandCount: 3, lastActive: 'Active 2d ago' },
	{ id: 'futino', name: 'futino studio', plan: 'Enterprise', brandCount: 5, lastActive: 'Active 4h ago' },
]

const FAVORITE_BRANDS = [
	{ name: 'Persona Intelligence', description: 'Revenue analytics · Updated 3h ago' },
	{ name: 'Creative Copilot', description: 'Experiments · Updated yesterday' },
]

export function WorkspaceSwitcher() {
	const [open, setOpen] = useState(false)
	const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(WORKSPACES[0]?.id ?? '')
	const selectedWorkspace = useMemo(() => WORKSPACES.find((ws) => ws.id === selectedWorkspaceId) ?? WORKSPACES[0], [selectedWorkspaceId])

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mt-3 flex w-full items-center justify-between rounded-lg border border-border/50 bg-secondary/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
				>
					<span className="flex flex-col text-left">
						{selectedWorkspace?.name || 'Select workspace'}
						<span className="text-xs text-muted-foreground">{selectedWorkspace?.plan}</span>
					</span>
					<ChevronRight className="h-4 w-4 text-muted-foreground" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[420px] border-r border-border/40 bg-background/95">
				<SheetHeader className="space-y-1 text-left">
					<SheetTitle>Switch workspace</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground">
						Workspaces group brands, data sources, and billing for your team.
					</SheetDescription>
				</SheetHeader>
				<div className="mt-6 space-y-6">
					<section>
						<h3 className="px-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">Your workspaces</h3>
						<div className="mt-3 space-y-2">
							{WORKSPACES.map((workspace) => {
								const isSelected = workspace.id === selectedWorkspaceId
								return (
									<button
										key={workspace.id}
										onClick={() => {
											setSelectedWorkspaceId(workspace.id)
											setOpen(false)
										}}
										className={cn(
											'flex w-full items-start justify-between rounded-xl border border-transparent bg-secondary/50 p-4 text-left transition-colors',
											isSelected
												? 'border-border/60 bg-secondary'
												: 'hover:border-border/50 hover:bg-secondary/80'
										)}
									>
										<div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-semibold text-foreground">{workspace.name}</span>
												{isSelected && <Check className="h-4 w-4 text-primary" />}
											</div>
											<p className="mt-1 text-xs text-muted-foreground/80">{workspace.plan}</p>
										</div>
										<div className="text-right">
											<p className="text-xs text-muted-foreground/70">{workspace.brandCount} brands</p>
											<p className="text-xs text-muted-foreground/70">{workspace.lastActive}</p>
										</div>
									</button>
								)
							})}
						</div>
						<Button variant="outline" className="mt-4 w-full justify-start gap-2 rounded-xl border-dashed text-sm">
							<Plus className="h-4 w-4" />
							Create new workspace
						</Button>
					</section>
					<section>
						<h3 className="px-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">Pinned brands</h3>
						<div className="mt-3 space-y-2">
							{FAVORITE_BRANDS.map((brand) => (
								<button
									key={brand.name}
									className="flex w-full items-center justify-between rounded-xl border border-border/40 bg-background/70 p-3 text-left transition-colors hover:border-border/60"
								>
									<span>
										<p className="text-sm font-semibold text-foreground">{brand.name}</p>
										<p className="text-xs text-muted-foreground/80">{brand.description}</p>
									</span>
									<LayoutDashboard className="h-4 w-4 text-muted-foreground/70" />
								</button>
							))}
						</div>
					</section>
				</div>
			</SheetContent>
		</Sheet>
	)
}

