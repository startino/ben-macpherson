import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-[0_8px_16px_rgba(249,168,37,0.25)] hover:bg-primary/90",
				outline: "border border-border/60 bg-secondary/40 text-foreground shadow-sm hover:bg-secondary/70",
				ghost: "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
				secondary: "bg-secondary/60 text-foreground shadow-sm hover:bg-secondary",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3",
				lg: "h-10 rounded-md px-6",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		)
	}
)
Button.displayName = 'Button'
