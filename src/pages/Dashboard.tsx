import mixOverTime from '@/data/mock/mixOverTime.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

export default function Dashboard() {
	return (
		<section className="grid gap-6">
			<div className="grid gap-3 md:grid-cols-3">
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="text-xs text-muted-foreground">North Star</div>
					<div className="text-lg font-semibold">High-value persona orders</div>
					<div className="text-xs text-muted-foreground">Goal: +20% in 90 days</div>
				</div>
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="text-xs text-muted-foreground">Time to First Insight</div>
					<div className="text-lg font-semibold">2 days</div>
					<div className="text-xs text-muted-foreground">Target ≤ 5 days</div>
				</div>
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="text-xs text-muted-foreground">Time to First Lift</div>
					<div className="text-lg font-semibold">21 days</div>
					<div className="text-xs text-muted-foreground">Target ≤ 30 days</div>
				</div>
			</div>
			<div className="rounded-lg border border-border bg-card p-4">
				<div className="mb-2 text-sm text-muted-foreground">Persona share over time</div>
				<div className="h-72 w-full">
					<ResponsiveContainer>
						<LineChart data={mixOverTime as any[]} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
							<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
							<YAxis unit="%" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
							<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
							<Legend />
							<Line type="monotone" dataKey="p1" name="Aspirational" stroke="#a3e635" strokeWidth={2} dot={false} />
							<Line type="monotone" dataKey="p2" name="Minimalist" stroke="#22d3ee" strokeWidth={2} dot={false} />
							<Line type="monotone" dataKey="p3" name="Status" stroke="#f472b6" strokeWidth={2} dot={false} />
							<Line type="monotone" dataKey="p4" name="Gift" stroke="#f59e0b" strokeWidth={2} dot={false} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</section>
	)
}
