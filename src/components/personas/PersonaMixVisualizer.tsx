import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

interface PersonaMixVisualizerProps {
	personas: Array<{
		id: string
		label: string
		currentShare: number
		targetShare: number
		color: string
	}>
	mode?: 'current' | 'target'
}

const COLORS = {
	'high-value': '#10b981',
	'mid-value': '#3b82f6',
	'low-value': '#f59e0b',
	'premium': '#a855f7',
	'budget': '#ef4444',
}

export function PersonaMixVisualizer({ personas, mode = 'current' }: PersonaMixVisualizerProps) {
	const data = personas.map((p) => ({
		name: p.label,
		value: mode === 'current' ? p.currentShare : p.targetShare,
		color: COLORS[p.id as keyof typeof COLORS] || '#6b7280',
	}))

	return (
		<Card
			aiContext={`Persona mix visualization showing ${mode === 'current' ? 'current' : 'target'} distribution across segments`}
			aiTitle="Persona Mix"
		>
			<CardHeader>
				<CardTitle>Persona Mix Distribution</CardTitle>
				<CardDescription>
					{mode === 'current' ? 'Current acquisition mix' : 'Target acquisition mix for optimal profitability'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
								outerRadius={100}
								fill="#8884d8"
								dataKey="value"
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
					{personas.map((p) => (
						<div key={p.id} className="rounded-lg border bg-muted/30 p-3">
							<div className="mb-1 flex items-center gap-2">
								<div
									className="h-3 w-3 rounded-full"
									style={{ backgroundColor: COLORS[p.id as keyof typeof COLORS] || '#6b7280' }}
								/>
								<div className="text-xs font-medium">{p.label}</div>
							</div>
							<div className="flex items-baseline gap-2">
								<div className="text-lg font-bold">
									{mode === 'current' ? Math.round(p.currentShare) : Math.round(p.targetShare)}%
								</div>
								{mode === 'current' && p.targetShare !== p.currentShare && (
									<div className="text-xs text-muted-foreground">→ {Math.round(p.targetShare)}%</div>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

