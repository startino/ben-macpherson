import { LifeBuoy, BookOpen, MessageSquare, Mail, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAIAssistant } from '@/contexts/AIAssistantContext'

const RESOURCE_LINKS = [
	{
		title: 'Docs & Playbooks',
		description: 'Deep dives on D.LUX methodology, persona strategy, and go-to-market templates.',
		icon: BookOpen,
		action: 'View docs',
	},
	{
		title: 'Office Hours',
		description: 'Book time with the DRX team to review your roadmap or performance questions.',
		icon: MessageSquare,
		action: 'Schedule session',
	},
	{
		title: 'Email Support',
		description: 'Reach out to our specialists for bespoke help or to request new analyses.',
		icon: Mail,
		action: 'Contact support',
	},
]

export function SupportResources() {
	const { activePanel, closeAssistant } = useAIAssistant()

	if (activePanel !== 'resources') return null

	return (
		<div className="fixed right-0 top-0 z-40 flex h-screen w-96 flex-col border-l border-border/40 bg-background/95 shadow-[0_-24px_60px_rgba(0,0,0,0.45)] backdrop-blur">
			<div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-secondary/80">
						<LifeBuoy className="h-4 w-4 text-primary" />
					</div>
					<div>
						<h2 className="text-sm font-semibold text-foreground">Resources & Support</h2>
						<p className="text-xs text-muted-foreground/80">Guides, office hours, and help from the DRX team</p>
					</div>
				</div>
				<Button variant="ghost" size="icon" className="rounded-full border border-border/40" onClick={closeAssistant}>
					<ArrowUpRight className="h-4 w-4 rotate-45" />
				</Button>
			</div>
			<div className="flex-1 overflow-y-auto px-6 py-8">
				<div className="space-y-6">
					<section className="rounded-2xl border border-border/40 bg-secondary/40 p-4">
						<h3 className="text-sm font-semibold text-foreground">Need a human?</h3>
						<p className="mt-1 text-sm text-muted-foreground/80">
							We&apos;ll match you with a specialist who understands your brand and growth goals.
						</p>
						<Button variant="default" className="mt-4 w-full rounded-full">
							Talk to DRX team
						</Button>
					</section>
					<div className="space-y-4">
						<h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">Explore</h4>
						<div className="space-y-3">
							{RESOURCE_LINKS.map(({ title, description, icon: Icon, action }) => (
								<button
									key={title}
									className="flex w-full items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-4 text-left transition-colors hover:border-border/60"
								>
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
										<Icon className="h-4 w-4 text-primary" />
									</div>
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<span className="text-sm font-semibold text-foreground">{title}</span>
											<span className="text-xs text-primary">{action}</span>
										</div>
										<p className="mt-1 text-xs text-muted-foreground/80">{description}</p>
									</div>
								</button>
							))}
						</div>
					</div>
					<section className="rounded-2xl border border-border/40 bg-background/60 p-4">
						<h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">Changelog</h4>
						<ul className="mt-3 space-y-3 text-sm text-muted-foreground/80">
							<li className="rounded-xl border border-border/30 bg-background/80 p-3">
								<strong className="block text-foreground">Nov 6</strong>
								<span>New persona profitability bridge now live in Dashboard → Profit Impacts.</span>
							</li>
							<li className="rounded-xl border border-border/30 bg-background/80 p-3">
								<strong className="block text-foreground">Oct 28</strong>
								<span>Creative brief export now includes AI-generated testing angles.</span>
							</li>
							<li className="rounded-xl border border-border/30 bg-background/80 p-3">
								<strong className="block text-foreground">Oct 12</strong>
								<span>Persona mix optimizer refreshed with new audience cohorts.</span>
							</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	)
}


