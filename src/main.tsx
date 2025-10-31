import { StrictMode, useEffect, useState } from 'react'
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

function Inputs() {
	const [connected, setConnected] = useState<Record<string, boolean>>({
		Shopify: false,
		GA4: false,
		Meta: false,
		"Google Ads": false,
		Klaviyo: false,
	})
	const [styleGuide, setStyleGuide] = useState('Quiet luxury, minimal, neutral palette')
	const [doSay, setDoSay] = useState('Emphasize material quality, longevity, tactile feel')
	const [dontSay, setDontSay] = useState('No discount framing, avoid hype/flashy claims')

	useEffect(() => {
		try {
			const saved = localStorage.getItem('guardrails')
			if (saved) {
				const g = JSON.parse(saved)
				setStyleGuide(g.styleGuide ?? styleGuide)
				setDoSay(g.doSay ?? doSay)
				setDontSay(g.dontSay ?? dontSay)
			}
		} catch {}
		try {
			const savedConn = localStorage.getItem('connections')
			if (savedConn) setConnected(JSON.parse(savedConn))
		} catch {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function saveGuardrails() {
		localStorage.setItem('guardrails', JSON.stringify({ styleGuide, doSay, dontSay }))
	}
	function toggleConnection(k: string) {
		setConnected((prev) => {
			const next = { ...prev, [k]: !prev[k as keyof typeof prev] }
			localStorage.setItem('connections', JSON.stringify(next))
			return next
		})
	}

	return (
		<section className="grid gap-6">
			<h2 className="text-xl font-semibold">Inputs</h2>
			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="mb-3 text-sm text-muted-foreground">Connections</div>
					<div className="grid gap-2">
						{Object.keys(connected).map((k) => (
							<button key={k} onClick={() => toggleConnection(k)} className={`flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:bg-accent/30 ${connected[k as keyof typeof connected] ? 'bg-accent/20' : 'bg-card'}`}>
								<span>{k}</span>
								<span className={`text-xs ${connected[k as keyof typeof connected] ? 'text-emerald-400' : 'text-muted-foreground'}`}>{connected[k as keyof typeof connected] ? 'Connected' : 'Connect'}</span>
							</button>
						))}
					</div>
				</div>
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="mb-3 text-sm text-muted-foreground">Brand guardrails</div>
					<div className="grid gap-3">
						<label className="grid gap-1">
							<span className="text-xs text-muted-foreground">Style</span>
							<input value={styleGuide} onChange={(e) => setStyleGuide(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
						</label>
						<label className="grid gap-1">
							<span className="text-xs text-muted-foreground">Do say</span>
							<input value={doSay} onChange={(e) => setDoSay(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
						</label>
						<label className="grid gap-1">
							<span className="text-xs text-muted-foreground">Don’t say</span>
							<input value={dontSay} onChange={(e) => setDontSay(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
						</label>
						<div>
							<button onClick={saveGuardrails} className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent/30">Save</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

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
