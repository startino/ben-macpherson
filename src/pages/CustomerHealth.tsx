import customerHealth from '@/data/mock/customerHealth.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

export default function CustomerHealth() {
	const { ltv, churnRisk, productTrends, cohorts } = customerHealth as any

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Customer Health</h2>
				<p className="mt-1 text-sm text-muted-foreground">LTV analysis, churn risk, and product trends per customer segment</p>
			</div>

			{/* LTV Overview */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Average LTV</CardTitle>
						<CardDescription>Customer lifetime value</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">${ltv.average}</div>
						<div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
							<TrendingUp className="h-4 w-4 text-emerald-500" />
							<span>+7.3% vs last month</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>LTV by Persona</CardTitle>
						<CardDescription>Highest value customer segments</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{ltv.byPersona.map((p: any) => (
								<div key={p.persona} className="flex items-center justify-between">
									<span className="text-sm">{p.persona}</span>
									<span className="font-semibold">${p.ltv}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* LTV Trend */}
			<Card>
				<CardHeader>
					<CardTitle>LTV Trend</CardTitle>
					<CardDescription>Customer lifetime value over time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-64 w-full">
						<ResponsiveContainer>
							<LineChart data={ltv.trend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Line type="monotone" dataKey="ltv" name="LTV" stroke="#a3e635" strokeWidth={2} dot={{ fill: '#a3e635', r: 4 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Churn Risk Analysis */}
			<Card>
				<CardHeader>
					<CardTitle>Churn Risk Analysis</CardTitle>
					<CardDescription>Customers at risk of churning (Ben specifically mentioned)</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3 mb-4">
						<div className="bg-red-500/10 rounded-lg p-4">
							<div className="flex items-center gap-2 mb-1">
								<AlertTriangle className="h-4 w-4 text-red-500" />
								<div className="text-sm font-medium text-red-600 dark:text-red-400">High Risk</div>
							</div>
							<div className="text-2xl font-bold">{churnRisk.high}</div>
							<div className="text-xs text-muted-foreground mt-1">customers</div>
						</div>
						<div className="bg-amber-500/10 rounded-lg p-4">
							<div className="flex items-center gap-2 mb-1">
								<AlertTriangle className="h-4 w-4 text-amber-500" />
								<div className="text-sm font-medium text-amber-600 dark:text-amber-400">Medium Risk</div>
							</div>
							<div className="text-2xl font-bold">{churnRisk.medium}</div>
							<div className="text-xs text-muted-foreground mt-1">customers</div>
						</div>
						<div className="bg-emerald-500/10 rounded-lg p-4">
							<div className="flex items-center gap-2 mb-1">
								<TrendingUp className="h-4 w-4 text-emerald-500" />
								<div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Low Risk</div>
							</div>
							<div className="text-2xl font-bold">{churnRisk.low}</div>
							<div className="text-xs text-muted-foreground mt-1">customers</div>
						</div>
					</div>
					<div className="h-64 w-full">
						<ResponsiveContainer>
							<LineChart data={churnRisk.trend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Line type="monotone" dataKey="high" name="High Risk" stroke="#ef4444" strokeWidth={2} />
								<Line type="monotone" dataKey="medium" name="Medium Risk" stroke="#f59e0b" strokeWidth={2} />
								<Line type="monotone" dataKey="low" name="Low Risk" stroke="#10b981" strokeWidth={2} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Product Trends */}
			<Card>
				<CardHeader>
					<CardTitle>Product Trends</CardTitle>
					<CardDescription>Product performance by customer persona</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{productTrends.map((trend: any, idx: number) => (
							<div key={idx} className="flex items-center justify-between bg-surface rounded-lg p-3">
								<div className="flex-1">
									<div className="font-medium">{trend.product}</div>
									<div className="text-sm text-muted-foreground">{trend.persona}</div>
								</div>
								<div className="flex items-center gap-3">
									{trend.trend === 'up' ? (
										<TrendingUp className="h-4 w-4 text-emerald-500" />
									) : trend.trend === 'down' ? (
										<TrendingDown className="h-4 w-4 text-red-500" />
									) : null}
									<Badge variant={trend.trend === 'up' ? 'success' : trend.trend === 'down' ? 'warning' : 'outline'}>
										{trend.change > 0 ? '+' : ''}{trend.change}%
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Cohort Analysis */}
			<Card>
				<CardHeader>
					<CardTitle>Cohort Analysis</CardTitle>
					<CardDescription>Customer retention and LTV by cohort</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-accent/20 text-muted-foreground">
								<tr>
									<th className="px-3 py-2 text-left font-medium">Cohort</th>
									<th className="px-3 py-2 text-left font-medium">Customers</th>
									<th className="px-3 py-2 text-left font-medium">LTV</th>
									<th className="px-3 py-2 text-left font-medium">Retention</th>
								</tr>
							</thead>
							<tbody>
								{cohorts.map((cohort: any, idx: number) => (
									<tr key={cohort.cohort} className={idx % 2 === 0 ? 'bg-surface' : 'bg-muted/20'}>
										<td className="px-3 py-3 font-medium">{cohort.cohort}</td>
										<td className="px-3 py-3">{cohort.customers.toLocaleString()}</td>
										<td className="px-3 py-3">${cohort.ltv}</td>
										<td className="px-3 py-3">
											<Badge variant={cohort.retention > 0.75 ? 'success' : cohort.retention > 0.70 ? 'outline' : 'warning'}>
												{(cohort.retention * 100).toFixed(0)}%
											</Badge>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}

