import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import revenueHealth from '@/data/mock/revenueHealth.json'
import personasData from '@/data/mock/personas.json'
import personaDetailsData from '@/data/mock/personaDetails.json'
import customerHealth from '@/data/mock/customerHealth.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

function KPICard({ label, value, change, format }: { label: string; value: number; change: number; format?: (v: number) => string }) {
	const isPositive = change > 0
	const formatValue = format || ((v: number) => v.toLocaleString())
	const formatValueWithUnit = (v: number) => {
		if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
		if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`
		if (v < 1) return `${v.toFixed(2)}%`
		return formatValue(v)
	}

	const aiContext = `${label}: ${formatValueWithUnit(value)}, Change: ${isPositive ? '+' : ''}${change}% vs last week`

	return (
		<Card
			aiContext={aiContext}
			aiTitle={label}
			className="border-none bg-gradient-to-br from-secondary/80 via-secondary/40 to-background/60"
		>
			<CardHeader className="pb-2">
				<CardDescription className="text-xs uppercase tracking-[0.24em] text-muted-foreground/80">
					{label}
				</CardDescription>
				<CardTitle className="text-3xl font-semibold text-foreground">
					{formatValueWithUnit(value)}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center justify-between pt-0">
				<div className="flex items-center gap-2">
					{isPositive ? (
						<ArrowUpRight className="h-4 w-4 text-emerald-400" />
					) : (
						<ArrowDownRight className="h-4 w-4 text-red-400" />
					)}
					<span
						className={cn(
							'text-sm font-medium',
							isPositive ? 'text-emerald-400' : 'text-red-400'
						)}
					>
						{Math.abs(change)}%
					</span>
					<span className="text-xs text-muted-foreground">vs last week</span>
				</div>
				<Button variant="ghost" size="sm" className="rounded-full px-2 text-xs text-muted-foreground">
					Details
				</Button>
			</CardContent>
		</Card>
	)
}

export default function DashboardHome() {
	const { kpis } = revenueHealth as { kpis: Record<string, { value: number; change: number }> }
	const personas = personasData as Array<{ id: string; label: string; revenueShare: number; ltv: number; paybackDays: number; profitIndex: number }>
	const personaDetails = personaDetailsData as Array<{ id: string; qualitative?: { firstPurchase?: string[] } }>
	const { ltv } = customerHealth as { ltv: { average: number } }

	// Check connection status
	const [connected, setConnected] = useState<Record<string, boolean>>({})

	useEffect(() => {
		try {
			const saved = localStorage.getItem('connections') || localStorage.getItem('onboardingConnections')
			if (saved) setConnected(JSON.parse(saved))
		} catch {
			// Ignore parse errors
		}
	}, [])

	// Mock insights/recommendations
	const insights = [
		{
			type: 'success',
			title: 'Persona Mix Optimization',
			message: 'Shifting 5% more budget to Aspirational Aesthete persona could increase profit by 12%',
			action: { label: 'Adjust Mix', href: '/personas' }
		},
		{
			type: 'warning',
			title: 'CAC Improvement',
			message: 'CAC decreased 25% this week - excellent efficiency gains in acquisition',
			action: { label: 'View Details', href: '/dashboard' }
		},
		{
			type: 'info',
			title: 'Customer Health',
			message: `Average LTV is $${ltv.average} with low churn risk across all personas`,
			action: { label: 'View Health', href: '/dashboard' }
		}
	]

	const connectedCount = Object.values(connected).filter(Boolean).length
	const totalConnections = 5

	return (
		<section className="space-y-6">
			<div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border/40 bg-secondary/30 px-6 py-5">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Overview</p>
					<h1 className="mt-2 text-3xl font-semibold text-foreground">Revenue Health Overview</h1>
					<p className="mt-1 text-sm text-muted-foreground/80">Understand growth, efficiency, and persona performance in one glance.</p>
				</div>
				<Badge variant={connectedCount === totalConnections ? 'success' : 'warning'} className="rounded-full px-3 py-1 text-xs">
					{connectedCount}/{totalConnections} data sources connected
				</Badge>
			</div>

			{/* Top KPIs */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<KPICard label="Sales" value={kpis.sales.value} change={kpis.sales.change} />
				<KPICard label="Contribution" value={kpis.contribution.value} change={kpis.contribution.change} />
				<KPICard label="New Customers" value={kpis.newCustomers.value} change={kpis.newCustomers.change} />
				<KPICard label="CAC" value={kpis.cac.value} change={kpis.cac.change} format={(v) => `$${v}`} />
			</div>

			{/* Key Insights */}
			<Card className="border-none bg-secondary/40">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg font-semibold">Key Insights</CardTitle>
					<CardDescription>AI-powered recommendations and alerts</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{insights.map((insight, idx) => (
						<div
							key={idx}
							className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/40 p-4"
						>
							<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/50">
								{insight.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
								{insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-400" />}
								{insight.type === 'info' && <Lightbulb className="h-5 w-5 text-cyan-400" />}
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-medium text-foreground">{insight.title}</div>
								<p className="mt-1 text-xs text-muted-foreground/80">{insight.message}</p>
							</div>
							<Button variant="secondary" size="sm" asChild className="rounded-full px-3 text-xs">
								<Link to={insight.action.href}>{insight.action.label}</Link>
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Persona Mix Summary */}
			<Card className="border-none bg-secondary/40">
				<CardHeader>
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<CardTitle>Current Persona Mix</CardTitle>
							<CardDescription>Distribution of customer acquisition by persona</CardDescription>
						</div>
						<Button variant="ghost" size="sm" className="rounded-full px-3" asChild>
							<Link to="/personas">Optimize Mix</Link>
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{personas.map((persona) => {
							const details = personaDetails.find((pd) => pd.id === persona.id)
							const profitStatus = persona.profitIndex > 1.2 ? 'success' : persona.profitIndex > 1.0 ? 'outline' : 'warning'
							return (
								<div
									key={persona.id}
									className="flex flex-col gap-3 rounded-2xl border border-border/30 bg-background/40 p-4"
								>
									<div className="flex items-center justify-between">
										<div className="text-sm font-medium text-foreground">{persona.label}</div>
										<Badge variant={profitStatus} className="rounded-full px-2 py-0.5 text-xs">
											{persona.profitIndex.toFixed(2)}
										</Badge>
									</div>
									<div className="text-3xl font-semibold text-foreground">{Math.round(persona.revenueShare * 100)}%</div>
									<div className="space-y-1 text-xs text-muted-foreground/80">
										<div>LTV: ${persona.ltv}</div>
										<div>Payback: {persona.paybackDays}d</div>
									</div>
									<div className="rounded-xl border border-border/30 bg-secondary/40 p-3">
										<div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
											Top Product
										</div>
										<div className="mt-1 text-xs text-foreground/90">
											{details?.qualitative?.firstPurchase?.[0] || 'N/A'}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>

			{/* Profitability Trend */}
			<Card className="border-none bg-secondary/40">
				<CardHeader>
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<CardTitle>Profitability Trend</CardTitle>
							<CardDescription>7-day profit and contribution trend</CardDescription>
						</div>
						<TrendingUp className="h-5 w-5 text-emerald-400" />
					</div>
				</CardHeader>
				<CardContent>
					<div className="h-64 w-full">
						<ResponsiveContainer>
							<LineChart
								data={[
								{ date: '10/19', profit: 24000, contribution: 44200 },
								{ date: '10/20', profit: 21280, contribution: 31280 },
								{ date: '10/21', profit: 34100, contribution: 44100 },
								{ date: '10/22', profit: 33120, contribution: 43120 },
								{ date: '10/23', profit: 40400, contribution: 50400 },
								{ date: '10/24', profit: 38600, contribution: 48600 },
								{ date: '10/25', profit: 16840, contribution: 26840 }
							]} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Line type="monotone" dataKey="profit" name="Profit" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
								<Line type="monotone" dataKey="contribution" name="Contribution" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))', r: 4 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}

