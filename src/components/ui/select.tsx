import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div className="relative">
				<select
					className={cn(
						'flex h-10 w-full appearance-none rounded-lg border border-border/60 bg-secondary/50 px-3 py-2 pr-9 text-sm text-foreground shadow-inner transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				>
					{children}
				</select>
				<ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			</div>
		)
	}
)
Select.displayName = 'Select'

export { Select }

