import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsContextValue {
	value: string
	onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

interface TabsProps {
	defaultValue: string
	value?: string
	onValueChange?: (value: string) => void
	className?: string
	children: React.ReactNode
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, className, children }: TabsProps) {
	const [internalValue, setInternalValue] = React.useState(defaultValue)
	const value = controlledValue ?? internalValue
	const handleValueChange = React.useCallback((newValue: string) => {
		if (controlledValue === undefined) {
			setInternalValue(newValue)
		}
		onValueChange?.(newValue)
	}, [controlledValue, onValueChange])

	return (
		<TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
			<div className={cn('w-full', className)}>{children}</div>
		</TabsContext.Provider>
	)
}

function useTabsContext() {
	const context = React.useContext(TabsContext)
	if (!context) {
		throw new Error('Tabs components must be used within a Tabs component')
	}
	return context
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
	return (
		<div
			className={cn(
				'relative inline-flex w-full items-center gap-1 border-b border-border/50 text-sm text-muted-foreground',
				className
			)}
		>
			{children}
		</div>
	)
}

export function TabsTrigger({
	value,
	className,
	children,
}: {
	value: string
	className?: string
	children: React.ReactNode
}) {
	const { value: selectedValue, onValueChange } = useTabsContext()
	const isSelected = selectedValue === value

	return (
		<button
			type="button"
			onClick={() => onValueChange(value)}
			className={cn(
				'relative inline-flex items-center whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
				isSelected
					? 'border-primary text-foreground'
					: 'text-muted-foreground hover:border-border/60 hover:text-foreground',
				className
			)}
		>
			{children}
		</button>
	)
}

export function TabsContent({
	value,
	className,
	children,
}: {
	value: string
	className?: string
	children: React.ReactNode
}) {
	const { value: selectedValue } = useTabsContext()
	if (selectedValue !== value) return null

	return (
		<div className={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}>
			{children}
		</div>
	)
}

