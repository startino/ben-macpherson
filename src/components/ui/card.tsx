import * as React from 'react'
import { Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAIAssistant } from '@/contexts/AIAssistantContext'

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		aiContext?: string
		aiTitle?: string
	}
>(({ className, aiContext, aiTitle, children, ...props }, ref) => {
	const { openAssistant } = useAIAssistant()

	return (
		<div
			ref={ref}
			className={cn(
				'relative group rounded-2xl border border-border/40 bg-surface/90 text-card-foreground shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition-colors',
				className
			)}
			{...props}
		>
			{aiContext && (
				<button
					onClick={() => openAssistant(aiContext, aiTitle)}
					className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-transparent bg-secondary/60 opacity-0 transition-all hover:border-border/60 hover:bg-secondary group-hover:opacity-100 focus:opacity-100"
					aria-label="Ask AI about this"
				>
					<Wand2 className="h-4 w-4 text-primary" />
				</button>
			)}
			{children}
		</div>
	)
})
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex flex-col space-y-1.5 px-6 pb-4 pt-6', className)} {...props} />
	)
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h3
			ref={ref}
			className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	)
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
	)
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
	)
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
	)
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

