import { useLocation } from 'react-router-dom'
import mixOverTime from '@/data/mock/mixOverTime.json'
import revenueHealth from '@/data/mock/revenueHealth.json'
import profitabilityBridge from '@/data/mock/profitabilityBridge.json'
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, ComposedChart, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import CustomerHealth from './CustomerHealth'
import MerchandiseHealth from './MerchandiseHealth'
import SiteHealth from './SiteHealth'
import Competitors from './Competitors'

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

const reports = [
	{ id: 'revenue', label: 'Revenue Health', path: '/dashboard' },
	{ id: 'customer', label: 'Customer Health', path: '/dashboard/customer' },
	{ id: 'merchandise', label: 'Merchandise Health', path: '/dashboard/merchandise' },
	{ id: 'site', label: 'Site Health', path: '/dashboard/site' },
	{ id: 'competitors', label: 'Competitors', path: '/dashboard/competitors' },
]

function RevenueHealthReport() {
	const { kpis, salesTrend, contributionTrend, ordersTrend, acquisitionTrend } = revenueHealth as any
	const { components } = profitabilityBridge as any

	// Calculate cumulative values for waterfall chart
	const waterfallData = components.reduce((acc: any[], comp: any, idx: number) => {
		const prevValue = idx === 0 ? 0 : acc[idx - 1].end
		const endValue = prevValue + comp.value
		return [...acc, { ...comp, start: prevValue, end: endValue }]
	}, [])

	return (
		<>
			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<KPICard label="Sales" value={kpis.sales.value} change={kpis.sales.change} />
				<KPICard label="Contribution" value={kpis.contribution.value} change={kpis.contribution.change} />
				<KPICard label="New Customers" value={kpis.newCustomers.value} change={kpis.newCustomers.change} />
				<KPICard label="Spend" value={kpis.spend.value} change={kpis.spend.change} />
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				<KPICard label="CAC" value={kpis.cac.value} change={kpis.cac.change} format={(v) => `$${v}`} />
				<KPICard label="AOV" value={kpis.aov.value} change={kpis.aov.change} format={(v) => `$${v}`} />
				<KPICard label="CVR" value={kpis.cvr.value} change={kpis.cvr.change} format={(v) => `${v}%`} />
			</div>

			{/* Sales Trend Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Sales Trended over Time</CardTitle>
					<CardDescription>Total Sales vs Sales Comparison (Last Year)</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<BarChart data={salesTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar dataKey="totalSales" name="Total Sales" fill="hsl(var(--primary))" />
								<Bar dataKey="salesComparison" name="Sales Comparison" fill="hsl(var(--muted))" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Contribution Trend Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Contribution, Actual and Percent, Trended over Time</CardTitle>
					<CardDescription>Contribution amount and percentage trend</CardDescription>
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
								<Bar yAxisId="left" dataKey="contribution" name="Contribution" fill="hsl(var(--muted))" />
								<Line yAxisId="right" type="monotone" dataKey="contributionPercent" name="Contribution %" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--foreground))' }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Orders Trend Chart */}
			<Card>
				<CardHeader>
					<CardTitle>New Orders and Repeat Orders Trended over Time</CardTitle>
					<CardDescription>Tracking new vs repeat order patterns</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={ordersTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar yAxisId="left" dataKey="totalOrders" name="Total Orders" fill="hsl(var(--muted))" />
								<Bar yAxisId="left" dataKey="newOrders" name="New Orders" fill="hsl(var(--primary))" />
								<Bar yAxisId="left" dataKey="repeatOrders" name="Repeat Orders" fill="hsl(var(--accent))" />
								<Line yAxisId="right" type="monotone" dataKey="repeatPercent" name="% Repeat Orders" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee' }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Customer Acquisition Trend */}
			<Card>
				<CardHeader>
					<CardTitle>Customers Trended over Time</CardTitle>
					<CardDescription>CAC and New Customers acquisition trends</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<ComposedChart data={acquisitionTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar yAxisId="left" dataKey="cac" name="CAC" fill="hsl(var(--muted))" />
								<Line yAxisId="right" type="monotone" dataKey="newCustomers" name="New Customers" stroke="#a3e635" strokeWidth={2} dot={{ fill: '#a3e635' }} />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Profitability Bridge Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Profitability Bridge</CardTitle>
					<CardDescription>Revenue breakdown showing path to profit (Ben specifically mentioned this)</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<BarChart data={waterfallData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip
									contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
									formatter={(value: number) => `$${value.toLocaleString()}`}
								/>
								<Legend />
								<Bar dataKey="value" name="Amount">
									{waterfallData.map((entry: any, index: number) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
						<div>
							<div className="text-muted-foreground">Revenue</div>
							<div className="text-lg font-semibold text-emerald-500">${components[0].value.toLocaleString()}</div>
						</div>
						<div>
							<div className="text-muted-foreground">Total Costs</div>
							<div className="text-lg font-semibold text-red-500">
								${(components[1].value + components[2].value + components[3].value).toLocaleString()}
							</div>
						</div>
						<div>
							<div className="text-muted-foreground">Contribution</div>
							<div className="text-lg font-semibold text-cyan-500">${components[4].value.toLocaleString()}</div>
						</div>
						<div>
							<div className="text-muted-foreground">Profit</div>
							<div className="text-lg font-semibold text-emerald-500">${components[6].value.toLocaleString()}</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Persona Share Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Persona share over time</CardTitle>
					<CardDescription>Tracking persona mix trends</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer>
							<LineChart data={mixOverTime as any[]} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis unit="%" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Line type="monotone" dataKey="p1" name="Aspirational" stroke="#a3e635" strokeWidth={2} dot={false} />
								<Line type="monotone" dataKey="p2" name="Minimalist" stroke="#22d3ee" strokeWidth={2} dot={false} />
								<Line type="monotone" dataKey="p3" name="Status" stroke="#f472b6" strokeWidth={2} dot={false} />
								<Line type="monotone" dataKey="p4" name="Gift" stroke="#f59e0b" strokeWidth={2} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</>
	)
}

export default function Dashboard() {
	const location = useLocation()
	
	// Determine active report from URL
	const getActiveReport = () => {
		if (location.pathname.includes('/customer')) return 'customer'
		if (location.pathname.includes('/merchandise')) return 'merchandise'
		if (location.pathname.includes('/site')) return 'site'
		if (location.pathname.includes('/competitors')) return 'competitors'
		return 'revenue'
	}

	const activeReport = getActiveReport()

	const renderReport = () => {
		switch (activeReport) {
			case 'customer':
				return <CustomerHealth />
			case 'merchandise':
				return <MerchandiseHealth />
			case 'site':
				return <SiteHealth />
			case 'competitors':
				return <Competitors />
			default:
				return <RevenueHealthReport />
		}
	}

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					{reports.find(r => r.id === activeReport)?.label || 'Reports'}
				</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					{activeReport === 'revenue' && 'Track key performance indicators and revenue trends'}
					{activeReport === 'customer' && 'LTV analysis, churn risk, and product trends per customer segment'}
					{activeReport === 'merchandise' && 'Product performance, mix analysis, and profitability'}
					{activeReport === 'site' && 'Conversion funnel, page performance, and site speed metrics'}
					{activeReport === 'competitors' && 'Competitive analysis and market benchmarks'}
				</p>
			</div>
			{renderReport()}
		</section>
	)
}
