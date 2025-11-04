import profitabilityData from '@/data/mock/profitability.json'
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FilterBar } from '@/components/layout/FilterBar'

function KPICard({ label, value, change, format }: { label: string; value: number; change: number; format?: (v: number) => string }) {
	const isPositive = change > 0
	const formatValue = format || ((v: number) => v.toLocaleString())
	const formatValueWithUnit = (v: number) => {
		if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
		if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`
		if (v < 1) return `${v.toFixed(2)}%`
		return formatValue(v)
	}

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardDescription className="text-xs">{label}</CardDescription>
				<CardTitle className="text-2xl">{formatValueWithUnit(value)}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-1.5">
					{isPositive ? (
						<ArrowUpRight className="h-4 w-4 text-emerald-500" />
					) : (
						<ArrowDownRight className="h-4 w-4 text-red-500" />
					)}
					<span className={cn('text-sm font-medium', isPositive ? 'text-emerald-500' : 'text-red-500')}>
						{Math.abs(change)}%
					</span>
					<span className="text-xs text-muted-foreground">vs last week</span>
				</div>
			</CardContent>
		</Card>
	)
}

export default function Profitability() {
	const { kpis, contributionTrend, grossMarginTrend, spendToNetTrend, firstOrderProfitability } = profitabilityData as any

	return (
		<section className="grid gap-6">
			<FilterBar />

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<KPICard label="Net Sales" value={kpis.netSales.value} change={kpis.netSales.change} />
				<KPICard label="Contribution" value={kpis.contribution.value} change={kpis.contribution.change} />
				<KPICard label="First Order Profit" value={kpis.firstOrderProfit.value} change={kpis.firstOrderProfit.change} />
				<KPICard label="Spend" value={kpis.spend.value} change={kpis.spend.change} />
				<KPICard label="POAS" value={kpis.poas.value} change={kpis.poas.change} />
				<KPICard label="Spend to Net %" value={kpis.spendToNet.value} change={kpis.spendToNet.change} format={(v) => `${v}%`} />
			</div>

			{/* Contribution, Actual and Percent Trends */}
			<Card>
				<CardHeader>
					<CardTitle>Contribution, Actual and Percent, Trended over Time</CardTitle>
					<CardDescription>Contribution amount and percentage trend with comparison</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={contributionTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar yAxisId="left" dataKey="contribution" name="TY Contribution" fill="#404040" />
								<Line yAxisId="right" type="monotone" dataKey="contributionPercent" name="Contribution %" stroke="#404040" strokeWidth={2} dot={{ fill: '#404040', r: 4 }} />
								<Line yAxisId="right" type="monotone" dataKey="contributionComparison" name="Contribution Comparison" stroke="#a0a0a0" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#a0a0a0', r: 3 }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Gross Margin Trends */}
			<Card>
				<CardHeader>
					<CardTitle>Gross Margin Trends</CardTitle>
					<CardDescription>Net Sales and Gross Margin percentage trended over time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={grossMarginTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar yAxisId="left" dataKey="netSales" name="Net Sales" fill="#404040" />
								<Line yAxisId="right" type="monotone" dataKey="grossMarginPercent" name="Gross Margin %" stroke="#404040" strokeWidth={2} dot={{ fill: '#404040', r: 4 }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Spend to Net % and POAS Trends */}
			<Card>
				<CardHeader>
					<CardTitle>Spend to Net % and Profit on Ad Spend Trends</CardTitle>
					<CardDescription>Spend to Net percentage and POAS trended over time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={spendToNetTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar yAxisId="left" dataKey="poas" name="POAS" fill="#a0a0a0" />
								<Line yAxisId="right" type="monotone" dataKey="spendToNetPercent" name="Spend to Net %" stroke="#404040" strokeWidth={2} dot={{ fill: '#404040', r: 4 }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* First Order Profitability Trends */}
			<Card>
				<CardHeader>
					<CardTitle>First Order Profitability Trends</CardTitle>
					<CardDescription>CAC, First Order Profit, and LY First Order Profit trended over time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={firstOrderProfitability} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Line type="monotone" dataKey="cac" name="CAC" stroke="#404040" strokeWidth={2} dot={{ fill: '#404040', r: 4 }} />
								<Line type="monotone" dataKey="firstOrderProfit" name="First Order Profit" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
								<Line type="monotone" dataKey="lyFirstOrderProfit" name="LY First Order Profit" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Footer */}
			<div className="mt-6 pt-4 border-t border-muted/30 flex items-center justify-between text-xs text-muted-foreground">
				<div>
					<span className="font-semibold">REVENUE HEALTH - PROFITABILITY</span>
					<span className="ml-2">Data Last Updated: 10/28/2025 03:37 PM | DigitalRx Data</span>
				</div>
				<div>Ben Macpherson</div>
			</div>
		</section>
	)
}

