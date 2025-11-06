import type { ComponentType } from 'react'
import { Sparkles, LifeBuoy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAIAssistant } from '@/contexts/AIAssistantContext'

const ITEMS: ReadonlyArray<{
	action: 'assistant' | 'resources'
	icon: ComponentType<{ className?: string }>
	label: string
}> = [
	{
		icon: Sparkles,
		label: 'AI Assistant',
		action: 'assistant',
	},
	{
		icon: LifeBuoy,
		label: 'Resources',
		action: 'resources',
	},
]

export function RightSidebar() {
	const { activePanel, openAssistant, openResources, closeAssistant } = useAIAssistant()

	const handleClick = (action: 'assistant' | 'resources') => {
		if (activePanel === action) {
			closeAssistant()
			return
		}
		if (action === 'assistant') {
			openAssistant()
		} else {
			openResources()
		}
	}

	return (
		<aside className="fixed right-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-16 flex-col items-center border-l border-border/40 bg-background/95 py-6 backdrop-blur md:flex">
			<nav className="flex flex-1 flex-col items-center gap-3">
			{ITEMS.map(({ icon: Icon, label, action }) => {
					const isActive = activePanel === action
					return (
						<button
							key={action}
							onClick={() => handleClick(action)}
							className={cn(
								'flex h-12 w-12 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
								isActive
									? 'border-border/70 bg-primary/10 text-primary'
									: 'hover:border-border/60 hover:bg-secondary/70 hover:text-foreground'
							)}
							title={label}
							aria-pressed={isActive}
						>
							<Icon className="h-5 w-5" />
						</button>
					)
				})}
			</nav>
		</aside>
	)
}
