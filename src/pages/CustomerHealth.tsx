import customerHealth from '@/data/mock/customerHealth.json'
import { ResponsiveContainer, BarChart, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts'
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
					<span className="text-xs text-muted-foreground">vs last month</span>
				</div>
			</CardContent>
		</Card>
	)
}

export default function CustomerHealth() {
	const { ltv, cohorts } = customerHealth as any

	return (
		<section className="grid gap-6">
			<FilterBar />

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<KPICard label="Net Sales LTV" value={ltv.netSalesLtv} change={-6.1} />
				<KPICard label="Customers" value={ltv.customers} change={146.7} />
				<KPICard label="Repeat Rate" value={ltv.repeatRate} change={29.3} format={(v) => `${v}%`} />
				<KPICard label="Frequency" value={ltv.frequency} change={4.3} />
				<KPICard label="LTV:CAC" value={ltv.ltvCac} change={-13.3} />
				<KPICard label="Contribution LTV" value={ltv.contributionLtv} change={-61.1} />
			</div>

			{/* One-Time vs. Repeat Customer LTV */}
			<Card>
				<CardHeader>
					<CardTitle>One-Time vs. Repeat Customer LTV</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<BarChart data={[{ name: 'One-Time Shopper', ltv: ltv.oneTimeVsRepeat.oneTime }, { name: 'Repeat Shopper', ltv: ltv.oneTimeVsRepeat.repeat }]} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis label={{ value: 'Net Sales LTV', angle: -90, position: 'insideLeft' }} stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar dataKey="ltv" name="Net Sales LTV" fill="hsl(var(--primary))" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* LTV by Cohort Grouping */}
			<Card>
				<CardHeader>
					<CardTitle>LTV by Cohort Grouping</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={ltv.byCohortGrouping} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="cohort" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
								<YAxis yAxisId="left" label={{ value: 'Net Sales LTV', angle: -90, position: 'insideLeft' }} stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" label={{ value: '%', angle: 90, position: 'insideRight' }} stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar yAxisId="left" dataKey="netSalesLtv" name="Net Sales LTV" fill="hsl(var(--primary))" />
								<Bar yAxisId="left" dataKey="contributionLtv" name="Contribution LTV" fill="hsl(var(--muted))" />
								<Line yAxisId="right" type="monotone" dataKey="repeatRate" name="Repeat Rate" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--foreground))', r: 3 }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Cohort Analysis Table */}
			<Card>
				<CardHeader>
					<CardTitle>Cohort Analysis</CardTitle>
					<CardDescription>Detailed cohort metrics and performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-accent/20 text-muted-foreground">
								<tr>
									<th className="px-3 py-2 text-left font-medium">Cohort Group</th>
									<th className="px-3 py-2 text-left font-medium">Customers</th>
									<th className="px-3 py-2 text-left font-medium">Customers % Var</th>
									<th className="px-3 py-2 text-left font-medium">Net Sales LTV</th>
									<th className="px-3 py-2 text-left font-medium">Net Sales % Var</th>
									<th className="px-3 py-2 text-left font-medium">Repeat Rate</th>
									<th className="px-3 py-2 text-left font-medium">Repeat Rate % Var</th>
									<th className="px-3 py-2 text-left font-medium">Frequency</th>
									<th className="px-3 py-2 text-left font-medium">Frequency % Var</th>
									<th className="px-3 py-2 text-left font-medium">LTV:CAC</th>
									<th className="px-3 py-2 text-left font-medium">LTV:CAC % Var</th>
									<th className="px-3 py-2 text-left font-medium">CAC</th>
									<th className="px-3 py-2 text-left font-medium">CAC % Var</th>
									<th className="px-3 py-2 text-left font-medium">Average Days to 2nd Purchase</th>
								</tr>
							</thead>
							<tbody>
								{cohorts.map((cohort: any, idx: number) => (
									<tr key={cohort.cohortGroup} className={idx % 2 === 0 ? 'bg-surface' : 'bg-muted/20'}>
										<td className="px-3 py-3 font-medium">{cohort.cohortGroup}</td>
										<td className="px-3 py-3">{cohort.customers.toLocaleString()}</td>
										<td className="px-3 py-3">{cohort.customersPercentVar > 0 ? '+' : ''}{cohort.customersPercentVar}%</td>
										<td className="px-3 py-3">{cohort.netSalesLtv}</td>
										<td className="px-3 py-3">{cohort.netSalesPercentVar > 0 ? '+' : ''}{cohort.netSalesPercentVar}%</td>
										<td className="px-3 py-3">{cohort.repeatRate}%</td>
										<td className="px-3 py-3">{cohort.repeatRatePercentVar > 0 ? '+' : ''}{cohort.repeatRatePercentVar}%</td>
										<td className="px-3 py-3">{cohort.frequency}</td>
										<td className="px-3 py-3">{cohort.frequencyPercentVar > 0 ? '+' : ''}{cohort.frequencyPercentVar}%</td>
										<td className="px-3 py-3">{cohort.ltvCac}</td>
										<td className="px-3 py-3">{cohort.ltvCacPercentVar > 0 ? '+' : ''}{cohort.ltvCacPercentVar}%</td>
										<td className="px-3 py-3">{cohort.cac}</td>
										<td className="px-3 py-3">{cohort.cacPercentVar > 0 ? '+' : ''}{cohort.cacPercentVar}%</td>
										<td className="px-3 py-3">{cohort.averageDaysTo2ndPurchase}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Footer */}
			<div className="mt-6 pt-4 border-t border-muted/30 flex items-center justify-between text-xs text-muted-foreground">
				<div>
					<span className="font-semibold">CUSTOMER HEALTH - LTV MODEL TRENDS</span>
					<span className="ml-2">Data Last Updated: 10/30/2024 | DigitalRx Data</span>
				</div>
				<div>Ben Macpherson</div>
			</div>
		</section>
	)
}

