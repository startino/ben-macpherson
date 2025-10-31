import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import { downloadCSV, downloadJSON } from './lib/export'
import personas from './data/mock/personas.json'
import mixOverTime from './data/mock/mixOverTime.json'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const Landing = () => (
	<section className="space-y-4">
		<h1 className="text-2xl font-semibold tracking-tight">A first‑party persona intelligence + creative system</h1>
		<p className="text-muted-foreground max-w-2xl">Ingest data and survey responses, identify high‑value personas, track acquisition mix in real time, and generate persona‑specific creative.</p>
	</section>
)

const Inputs = () => (
	<section className="grid gap-6">
		<h2 className="text-xl font-semibold">Inputs</h2>
		<p className="text-muted-foreground">Connect Shopify, GA4, Meta, Google Ads, Klaviyo. Launch survey. Define brand guardrails.</p>
	</section>
)

const Personas = () => (
	<section className="grid gap-6">
		<h2 className="text-xl font-semibold">Persona Intelligence</h2>
		<p className="text-muted-foreground">Cluster customers by value + survey signals to form actionable personas and set a target mix.</p>
	</section>
)

const Creative = () => (
	<section className="grid gap-6">
		<h2 className="text-xl font-semibold">Creative & Strategy</h2>
		<p className="text-muted-foreground">Generate briefs, hooks, copy, prompts, and budget reallocation suggestions per persona.</p>
	</section>
)

const Dashboard = () => (
	<section className="grid gap-6">
		<h2 className="text-xl font-semibold">Dashboard</h2>
		<p className="text-muted-foreground">Persona share over time, profitability bridge, drift vs target mix, CAC payback by persona.</p>
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

const Exports = () => (
	<section className="grid gap-6">
		<h2 className="text-xl font-semibold">Exports</h2>
		<p className="text-muted-foreground">Download CSV/JSON of personas, segments, and creative artifacts.</p>
		<div className="flex flex-wrap gap-3">
			<button className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent/30" onClick={() => downloadJSON('personas.json', personas)}>Download Personas (JSON)</button>
			<button className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent/30" onClick={() => downloadCSV('personas.csv', personas as unknown as Record<string, unknown>[]) }>Download Personas (CSV)</button>
		</div>
	</section>
)

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Landing /> },
			{ path: 'inputs', element: <Inputs /> },
			{ path: 'personas', element: <Personas /> },
			{ path: 'creative', element: <Creative /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'exports', element: <Exports /> },
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
