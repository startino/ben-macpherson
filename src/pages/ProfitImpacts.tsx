import profitImpactsData from '@/data/mock/profitImpacts.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react'
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

export default function ProfitImpacts() {
	const { kpis } = profitImpactsData as any

	return (
		<section className="grid gap-6">
			<FilterBar />

			<div>
				<h2 className="text-2xl font-bold tracking-tight">EXECUTIVE SUMMARY - PROFIT IMPACTS BY KPI</h2>
			</div>

			{/* Top Row KPI Cards - 8 cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<KPICard label="Profit" value={kpis.profit.value} change={kpis.profit.change} />
				<KPICard label="Total Sessions (GA)" value={kpis.totalSessions.value} change={kpis.totalSessions.change} />
				<KPICard label="Paid Sessions" value={kpis.paidSessions.value} change={kpis.paidSessions.change} />
				<KPICard label="Unpaid Sessions" value={kpis.unpaidSessions.value} change={kpis.unpaidSessions.change} />
				<KPICard label="CVR" value={kpis.cvr.value} change={kpis.cvr.change} format={(v) => `${v}%`} />
				<KPICard label="AOV (Gross)" value={kpis.aovGross.value} change={kpis.aovGross.change} format={(v) => `$${v}`} />
				<KPICard label="New AOV (Gross)" value={kpis.newAovGross.value} change={kpis.newAovGross.change} format={(v) => `$${v}`} />
				<KPICard label="Repeat AOV (Gross)" value={kpis.repeatAovGross.value} change={kpis.repeatAovGross.change} format={(v) => `$${v}`} />
			</div>

			<div className="text-sm text-muted-foreground">
				DTC Profit Impact by KPI, for TY vs. LY
			</div>

			{/* Chart Placeholder */}
			<Card>
				<CardContent className="h-96 flex items-center justify-center">
					<div className="flex flex-col items-center gap-4 text-muted-foreground">
						<BarChart3 className="h-16 w-16 opacity-20" />
						<p className="text-sm">Chart placeholder - DTC Profit Impact visualization</p>
					</div>
				</CardContent>
			</Card>

			{/* Bottom Row KPI Cards - 6 cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<KPICard label="Spend" value={kpis.spend.value} change={kpis.spend.change} />
				<KPICard label="New Customers" value={kpis.newCustomers.value} change={kpis.newCustomers.change} />
				<KPICard label="CAC" value={kpis.cac.value} change={kpis.cac.change} format={(v) => `$${v}`} />
				<KPICard label="Repeat Orders" value={kpis.repeatOrders.value} change={kpis.repeatOrders.change} />
				<KPICard label="Discount Rate" value={kpis.discountRate.value} change={kpis.discountRate.change} format={(v) => `${v}%`} />
				<KPICard label="Return Rate" value={kpis.returnRate.value} change={kpis.returnRate.change} format={(v) => `${v}%`} />
			</div>

			{/* Footer */}
			<div className="mt-6 pt-4 border-t border-muted/30 flex items-center justify-between text-xs text-muted-foreground">
				<div>
					<span className="font-semibold">EXECUTIVE SUMMARY - PROFIT IMPACTS</span>
					<span className="ml-2">Data Last Updated: 10/29/2025 | DigitalRx Data</span>
				</div>
				<div>Ben Macpherson</div>
			</div>
		</section>
	)
}

