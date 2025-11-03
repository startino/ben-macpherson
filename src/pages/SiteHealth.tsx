import siteHealth from '@/data/mock/siteHealth.json'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, ComposedChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SiteHealth() {
	const { conversionFunnel, pagePerformance, siteSpeed, trends } = siteHealth as any

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Site Health</h2>
				<p className="mt-1 text-sm text-muted-foreground">Conversion funnel, page performance, and site speed metrics</p>
			</div>

			{/* Conversion Funnel */}
			<Card>
				<CardHeader>
					<CardTitle>Conversion Funnel</CardTitle>
					<CardDescription>Visitor journey through purchase</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between bg-surface rounded-lg p-4">
							<div>
								<div className="text-sm text-muted-foreground">Visitors</div>
								<div className="text-2xl font-bold">{conversionFunnel.visitors.toLocaleString()}</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-muted-foreground">100%</div>
								<div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
									<div className="h-full bg-primary" style={{ width: '100%' }} />
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between bg-surface rounded-lg p-4">
							<div>
								<div className="text-sm text-muted-foreground">Add to Cart</div>
								<div className="text-2xl font-bold">{conversionFunnel.addToCart.toLocaleString()}</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-muted-foreground">{((conversionFunnel.addToCart / conversionFunnel.visitors) * 100).toFixed(1)}%</div>
								<div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
									<div className="h-full bg-cyan-500" style={{ width: `${(conversionFunnel.addToCart / conversionFunnel.visitors) * 100}%` }} />
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between bg-surface rounded-lg p-4">
							<div>
								<div className="text-sm text-muted-foreground">Checkout</div>
								<div className="text-2xl font-bold">{conversionFunnel.checkout.toLocaleString()}</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-muted-foreground">{((conversionFunnel.checkout / conversionFunnel.visitors) * 100).toFixed(1)}%</div>
								<div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
									<div className="h-full bg-amber-500" style={{ width: `${(conversionFunnel.checkout / conversionFunnel.visitors) * 100}%` }} />
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between bg-surface rounded-lg p-4">
							<div>
								<div className="text-sm text-muted-foreground">Purchases</div>
								<div className="text-2xl font-bold">{conversionFunnel.purchases.toLocaleString()}</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-muted-foreground">{conversionFunnel.conversionRate}%</div>
								<div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
									<div className="h-full bg-emerald-500" style={{ width: `${conversionFunnel.conversionRate}%` }} />
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Page Performance */}
			<Card>
				<CardHeader>
					<CardTitle>Page Performance</CardTitle>
					<CardDescription>Top pages by views and engagement</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{pagePerformance.map((page: any, idx: number) => (
							<div key={idx} className="bg-surface rounded-lg p-4">
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<div className="font-medium">{page.page}</div>
										<div className="text-sm text-muted-foreground">
											{page.views.toLocaleString()} views • {page.avgTime}s avg
										</div>
									</div>
									<div className="text-right">
										<Badge variant={page.bounceRate < 0.35 ? 'success' : page.bounceRate < 0.45 ? 'outline' : 'warning'}>
											{(page.bounceRate * 100).toFixed(0)}% bounce
										</Badge>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Site Speed */}
			<Card>
				<CardHeader>
					<CardTitle>Site Speed Metrics</CardTitle>
					<CardDescription>Core Web Vitals and performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">First Contentful Paint</div>
							<div className="text-2xl font-bold">{siteSpeed.firstContentfulPaint}s</div>
							<Badge variant={siteSpeed.firstContentfulPaint < 1.8 ? 'success' : 'outline'} className="mt-2">
								{siteSpeed.firstContentfulPaint < 1.8 ? 'Good' : 'Needs Improvement'}
							</Badge>
						</div>
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">Largest Contentful Paint</div>
							<div className="text-2xl font-bold">{siteSpeed.largestContentfulPaint}s</div>
							<Badge variant={siteSpeed.largestContentfulPaint < 2.5 ? 'success' : 'outline'} className="mt-2">
								{siteSpeed.largestContentfulPaint < 2.5 ? 'Good' : 'Needs Improvement'}
							</Badge>
						</div>
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">Time to Interactive</div>
							<div className="text-2xl font-bold">{siteSpeed.timeToInteractive}s</div>
							<Badge variant={siteSpeed.timeToInteractive < 3.8 ? 'success' : 'outline'} className="mt-2">
								{siteSpeed.timeToInteractive < 3.8 ? 'Good' : 'Needs Improvement'}
							</Badge>
						</div>
						<div className="bg-surface rounded-lg p-4">
							<div className="text-sm text-muted-foreground mb-1">Total Blocking Time</div>
							<div className="text-2xl font-bold">{siteSpeed.totalBlockingTime}ms</div>
							<Badge variant={siteSpeed.totalBlockingTime < 200 ? 'success' : 'outline'} className="mt-2">
								{siteSpeed.totalBlockingTime < 200 ? 'Good' : 'Needs Improvement'}
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Conversion Rate Trend */}
			<Card>
				<CardHeader>
					<CardTitle>Conversion Rate Trend</CardTitle>
					<CardDescription>Overall site conversion performance</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-64 w-full">
						<ResponsiveContainer>
							<ComposedChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Line yAxisId="left" type="monotone" dataKey="conversionRate" name="Conversion Rate %" stroke="#a3e635" strokeWidth={2} dot={{ fill: '#a3e635', r: 4 }} />
								<Bar yAxisId="right" dataKey="avgSessionDuration" name="Avg Session Duration (s)" fill="#22d3ee" />
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}

