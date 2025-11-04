import merchandiseHealth from '@/data/mock/merchandiseHealth.json'
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


export default function MerchandiseHealth() {
	const { topProducts, bottomProducts, productMix, trends } = merchandiseHealth as any

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Merchandise Health</h2>
				<p className="mt-1 text-sm text-muted-foreground">Product performance, mix analysis, and profitability</p>
			</div>

			{/* Top Products */}
			<Card>
				<CardHeader>
					<CardTitle>Top Performing Products</CardTitle>
					<CardDescription>Highest revenue and profit margin products</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{topProducts.map((product: any, idx: number) => (
							<div key={idx} className="bg-surface rounded-lg p-4">
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<div className="font-medium">{product.product}</div>
										<div className="text-sm text-muted-foreground">
											{product.units.toLocaleString()} units • ${product.aov} AOV
										</div>
									</div>
									<div className="text-right">
										<div className="font-semibold">${product.revenue.toLocaleString()}</div>
										<Badge variant={product.profitMargin > 0.5 ? 'success' : 'outline'} className="mt-1">
											{(product.profitMargin * 100).toFixed(0)}% margin
										</Badge>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Bottom Products */}
			<Card>
				<CardHeader>
					<CardTitle>Underperforming Products</CardTitle>
					<CardDescription>Products requiring attention</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{bottomProducts.map((product: any, idx: number) => (
							<div key={idx} className="bg-surface rounded-lg p-4">
								<div className="flex items-start justify-between mb-2">
									<div className="flex-1">
										<div className="font-medium">{product.product}</div>
										<div className="text-sm text-muted-foreground">
											{product.units.toLocaleString()} units • ${product.aov} AOV
										</div>
									</div>
									<div className="text-right">
										<div className="font-semibold">${product.revenue.toLocaleString()}</div>
										<Badge variant="warning" className="mt-1">
											{(product.profitMargin * 100).toFixed(0)}% margin
										</Badge>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Product Mix */}
			<Card>
				<CardHeader>
					<CardTitle>Product Mix Analysis</CardTitle>
					<CardDescription>Revenue and profit share by category</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-64 w-full">
						<ResponsiveContainer>
							<BarChart data={productMix} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<YAxis unit="%" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
								<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
								<Legend />
								<Bar dataKey="revenueShare" name="Revenue Share" fill="hsl(var(--primary))" />
								<Bar dataKey="profitShare" name="Profit Share" fill="hsl(var(--accent))" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Profitability Trends */}
			<Card>
				<CardHeader>
					<CardTitle>Average Profit Margin Trend</CardTitle>
					<CardDescription>Overall product profitability over time</CardDescription>
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
								<Line type="monotone" dataKey="avgProfitMargin" name="Avg Profit Margin" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}

