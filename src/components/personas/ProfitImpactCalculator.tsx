import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Persona {
	id: string
	label: string
	currentShare: number
	targetShare: number
	ltv: number
	cac: number
	profitIndex: number
}

interface ProfitImpactCalculatorProps {
	personas: Persona[]
	monthlyNewCustomers: number
}

export function ProfitImpactCalculator({ personas, monthlyNewCustomers }: ProfitImpactCalculatorProps) {
	const impact = useMemo(() => {
		// Calculate current profit
		const currentProfit = personas.reduce((sum, p) => {
			const customers = (p.currentShare / 100) * monthlyNewCustomers
			const profit = customers * (p.ltv - p.cac)
			return sum + profit
		}, 0)

		// Calculate target profit
		const targetProfit = personas.reduce((sum, p) => {
			const customers = (p.targetShare / 100) * monthlyNewCustomers
			const profit = customers * (p.ltv - p.cac)
			return sum + profit
		}, 0)

		const difference = targetProfit - currentProfit
		const percentageChange = (difference / currentProfit) * 100

		// Calculate per-persona impact
		const personaImpacts = personas.map((p) => {
			const currentCustomers = (p.currentShare / 100) * monthlyNewCustomers
			const targetCustomers = (p.targetShare / 100) * monthlyNewCustomers
			const customerDiff = targetCustomers - currentCustomers
			const profitPerCustomer = p.ltv - p.cac
			const profitImpact = customerDiff * profitPerCustomer

			return {
				...p,
				customerDiff,
				profitImpact,
				profitPerCustomer,
			}
		})

		// Find biggest deviations
		const deviations = personas
			.map((p) => ({
				id: p.id,
				label: p.label,
				deviation: Math.abs(p.targetShare - p.currentShare),
				direction: p.targetShare > p.currentShare ? 'increase' : 'decrease',
			}))
			.filter((d) => d.deviation > 5)
			.sort((a, b) => b.deviation - a.deviation)

		return {
			currentProfit,
			targetProfit,
			difference,
			percentageChange,
			personaImpacts,
			deviations,
		}
	}, [personas, monthlyNewCustomers])

	const isPositive = impact.difference > 0

	return (
		<Card
			aiContext={`Profit impact analysis showing potential ${isPositive ? 'gain' : 'loss'} of $${Math.abs(impact.difference).toFixed(0)} per month by optimizing persona mix`}
			aiTitle="Profit Impact Calculator"
		>
			<CardHeader>
				<CardTitle>Profit Impact Analysis</CardTitle>
				<CardDescription>
					Potential profit change from shifting to optimal persona mix
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Overall Impact */}
				<div className="grid gap-4 md:grid-cols-3">
					<div className="rounded-lg border bg-muted/30 p-4">
						<div className="text-xs text-muted-foreground">Current Monthly Profit</div>
						<div className="mt-1 text-2xl font-bold">${(impact.currentProfit / 1000).toFixed(1)}K</div>
					</div>
					<div className="rounded-lg border bg-muted/30 p-4">
						<div className="text-xs text-muted-foreground">Target Monthly Profit</div>
						<div className="mt-1 text-2xl font-bold">${(impact.targetProfit / 1000).toFixed(1)}K</div>
					</div>
					<div
						className={cn(
							'rounded-lg border p-4',
							isPositive ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-red-500/50 bg-red-500/10'
						)}
					>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							{isPositive ? (
								<TrendingUp className="h-4 w-4 text-emerald-500" />
							) : (
								<TrendingDown className="h-4 w-4 text-red-500" />
							)}
							Monthly Impact
						</div>
						<div
							className={cn(
								'mt-1 text-2xl font-bold',
								isPositive ? 'text-emerald-500' : 'text-red-500'
							)}
						>
							{isPositive ? '+' : ''}${(impact.difference / 1000).toFixed(1)}K
						</div>
						<div className={cn('text-xs', isPositive ? 'text-emerald-600' : 'text-red-600')}>
							{isPositive ? '+' : ''}{impact.percentageChange.toFixed(1)}%
						</div>
					</div>
				</div>

				{/* Annual Projection */}
				<div className="rounded-lg border bg-accent/50 p-4">
					<div className="flex items-center gap-2">
						<DollarSign className="h-5 w-5 text-primary" />
						<div>
							<div className="font-semibold">Annual Impact</div>
							<div className="text-2xl font-bold text-primary">
								{isPositive ? '+' : ''}${((impact.difference * 12) / 1000).toFixed(0)}K/year
							</div>
							<div className="mt-1 text-xs text-muted-foreground">
								Based on maintaining optimal mix across all months
							</div>
						</div>
					</div>
				</div>

				{/* Persona-Level Breakdown */}
				<div>
					<h4 className="mb-3 text-sm font-semibold">Impact by Persona</h4>
					<div className="space-y-2">
						{impact.personaImpacts
							.sort((a, b) => Math.abs(b.profitImpact) - Math.abs(a.profitImpact))
							.map((p) => {
								const isGain = p.profitImpact > 0
								return (
									<div
										key={p.id}
										className="flex items-center justify-between rounded-lg border bg-card p-3"
									>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{p.label}</span>
												<Badge variant="outline" className="text-xs">
													{p.customerDiff > 0 ? '+' : ''}
													{Math.round(p.customerDiff)} customers
												</Badge>
											</div>
											<div className="mt-1 text-xs text-muted-foreground">
												${p.profitPerCustomer.toFixed(0)} profit per customer
											</div>
										</div>
										<div
											className={cn(
												'text-right',
												isGain ? 'text-emerald-500' : 'text-red-500'
											)}
										>
											<div className="text-sm font-semibold">
												{isGain ? '+' : ''}${(p.profitImpact / 1000).toFixed(1)}K
											</div>
											<div className="text-xs">/month</div>
										</div>
									</div>
								)
							})}
					</div>
				</div>

				{/* Warnings for Large Deviations */}
				{impact.deviations.length > 0 && (
					<div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-4">
						<div className="flex gap-3">
							<AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
							<div className="space-y-2">
								<div className="font-semibold">Large Mix Deviations Detected</div>
								<div className="space-y-1 text-sm text-muted-foreground">
									{impact.deviations.map((d) => (
										<div key={d.id}>
											• <span className="font-medium">{d.label}</span>: {d.deviation.toFixed(0)}%{' '}
											{d.direction === 'increase' ? 'below' : 'above'} target
										</div>
									))}
								</div>
								<div className="text-xs text-muted-foreground">
									Consider adjusting creative and budget allocation to align with target mix
								</div>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

