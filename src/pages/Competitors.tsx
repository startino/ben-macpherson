import competitors from '@/data/mock/competitors.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Competitors() {
	const { competitors: compList, benchmarks, ourMetrics, trends } = competitors as any

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Competitors</h2>
				<p className="mt-1 text-sm text-muted-foreground">Competitive analysis and market benchmarks</p>
			</div>

			{/* Competitive Comparison */}
			<Card>
				<CardHeader>
					<CardTitle>Competitive Comparison</CardTitle>
					<CardDescription>Key metrics vs industry benchmarks</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">CAC</div>
							<div className="text-2xl font-bold">${ourMetrics.cac}</div>
							<div className={cn('mt-1 text-xs flex items-center gap-1', ourMetrics.cac < benchmarks.avgCAC ? 'text-emerald-500' : 'text-red-500')}>
								{ourMetrics.cac < benchmarks.avgCAC ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
								Benchmark: ${benchmarks.avgCAC}
							</div>
						</div>
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">LTV</div>
							<div className="text-2xl font-bold">${ourMetrics.ltv}</div>
							<div className={cn('mt-1 text-xs flex items-center gap-1', ourMetrics.ltv > benchmarks.avgLTV ? 'text-emerald-500' : 'text-red-500')}>
								{ourMetrics.ltv > benchmarks.avgLTV ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
								Benchmark: ${benchmarks.avgLTV}
							</div>
						</div>
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
							<div className="text-2xl font-bold">{ourMetrics.conversionRate}%</div>
							<div className={cn('mt-1 text-xs flex items-center gap-1', ourMetrics.conversionRate > benchmarks.avgConversionRate ? 'text-emerald-500' : 'text-red-500')}>
								{ourMetrics.conversionRate > benchmarks.avgConversionRate ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
								Benchmark: {benchmarks.avgConversionRate}%
							</div>
						</div>
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">AOV</div>
							<div className="text-2xl font-bold">${ourMetrics.aov}</div>
							<div className={cn('mt-1 text-xs flex items-center gap-1', ourMetrics.aov > benchmarks.avgAOV ? 'text-emerald-500' : 'text-red-500')}>
								{ourMetrics.aov > benchmarks.avgAOV ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
								Benchmark: ${benchmarks.avgAOV}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Competitor List */}
			<Card>
				<CardHeader>
					<CardTitle>Key Competitors</CardTitle>
					<CardDescription>Market share and positioning analysis</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{compList.map((comp: any, idx: number) => (
							<div key={idx} className="bg-surface rounded-lg p-4">
								<div className="flex items-start justify-between mb-3">
									<div className="flex-1">
										<div className="font-medium text-lg">{comp.name}</div>
										<div className="text-sm text-muted-foreground mt-1">
											${comp.avgPrice} avg price • {(comp.marketShare * 100).toFixed(1)}% market share
										</div>
									</div>
									<Badge variant="outline">{(comp.marketShare * 100).toFixed(1)}%</Badge>
								</div>
								<div className="grid gap-2 md:grid-cols-2 mt-3">
									<div>
										<div className="text-xs text-muted-foreground mb-1">Strengths</div>
										<div className="flex flex-wrap gap-1">
											{comp.strengths.map((s: string, i: number) => (
												<Badge key={i} variant="success">{s}</Badge>
											))}
										</div>
									</div>
									<div>
										<div className="text-xs text-muted-foreground mb-1">Weaknesses</div>
										<div className="flex flex-wrap gap-1">
											{comp.weaknesses.map((w: string, i: number) => (
												<Badge key={i} variant="warning">{w}</Badge>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Market Share Trend */}
			<Card>
				<CardHeader>
					<CardTitle>Market Share Trend</CardTitle>
					<CardDescription>Our market share vs top competitor</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-64 w-full">
						<ResponsiveContainer>
							<LineChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip 
									contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
									formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
								/>
								<Legend />
								<Line type="monotone" dataKey="ourMarketShare" name="Our Market Share" stroke="#a3e635" strokeWidth={2} dot={{ fill: '#a3e635', r: 4 }} />
								<Line type="monotone" dataKey="topCompetitor" name="Top Competitor" stroke="#f472b6" strokeWidth={2} dot={{ fill: '#f472b6', r: 4 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}

