import { useEffect, useMemo, useState } from 'react'
import personasData from '@/data/mock/personas.json'
import personaDetailsData from '@/data/mock/personaDetails.json'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WordCloud } from '@/components/ui/word-cloud'

interface Persona {
	id: string
	label: string
	revenueShare: number
	ltv: number
	paybackDays: number
	profitIndex: number
}

interface PersonaDetails extends Persona {
	qualitative?: {
		likes: string[]
		dislikes: string[]
		competitiveBrands: string[]
		firstPurchase: string[]
		messaging: string
		influencers: string[]
		emailTone: string
		wordCloud?: Array<{ text: string; value: number }>
	}
	acquisitionTrend?: Array<{ date: string; count: number; cac: number }>
}

export default function Personas() {
	const [targetMix, setTargetMix] = useState<Record<string, number>>({})
	const [expandedPersonas, setExpandedPersonas] = useState<Record<string, boolean>>({})

	const personas = personasData as Persona[]
	const personaDetails = personaDetailsData as PersonaDetails[]

	// Merge data
	const mergedPersonas = personas.map((p) => {
		const details = personaDetails.find((pd) => pd.id === p.id)
		return { ...p, ...details }
	}) as PersonaDetails[]

	// Heuristic: favor higher profitIndex and LTV, penalize longer payback
	// score = (profitIndex * ltv) / paybackDays
	const suggestedMix: Record<string, number> = useMemo(() => {
		const scores = personas.map((p) => ({ id: p.id, score: (p.profitIndex * p.ltv) / Math.max(1, p.paybackDays) }))
		const totalScore = scores.reduce((a, s) => a + s.score, 0)
		if (totalScore === 0) return {}
		// scale to sum ~100 (rounded)
		let raw = scores.map((s) => ({ id: s.id, pct: (s.score / totalScore) * 100 }))
		// clamp between 5 and 60 to avoid extremes, then renormalize
		raw = raw.map((r) => ({ id: r.id, pct: Math.min(60, Math.max(5, r.pct)) }))
		const clampedTotal = raw.reduce((a, r) => a + r.pct, 0)
		return raw.reduce((acc, r) => {
			acc[r.id] = Math.round((r.pct / clampedTotal) * 100)
			return acc
		}, {} as Record<string, number>)
	}, [personas])

	useEffect(() => {
		try {
			const saved = localStorage.getItem('targetMix')
			if (saved) {
				setTargetMix(JSON.parse(saved))
			} else {
				// seed with suggestions on first load
				setTargetMix(suggestedMix)
				localStorage.setItem('targetMix', JSON.stringify(suggestedMix))
			}
		} catch {
			setTargetMix(suggestedMix)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function applySuggestions() {
		setTargetMix(suggestedMix)
		localStorage.setItem('targetMix', JSON.stringify(suggestedMix))
	}

	function updateMix(id: string, value: number) {
		const next = { ...targetMix, [id]: value }
		setTargetMix(next)
		localStorage.setItem('targetMix', JSON.stringify(next))
	}

	function toggleExpand(id: string) {
		setExpandedPersonas((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	const total = Object.values(targetMix).reduce((a, b) => a + (b || 0), 0)

	return (
		<section className="grid gap-6">
			<div className="flex items-end justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Persona Intelligence</h2>
					<p className="mt-1 text-sm text-muted-foreground">Analyze and optimize persona mix for maximum profitability</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={applySuggestions}>Apply suggestions</Button>
					<Button variant="outline" onClick={() => { localStorage.removeItem('targetMix'); setTargetMix(suggestedMix) }}>Reset</Button>
				</div>
			</div>

			{/* Mix Targeting Table */}
			<Card>
				<CardHeader>
					<CardTitle>Persona Mix Targeting</CardTitle>
					<CardDescription>Adjust target mix percentages to optimize for profitability</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-accent/20 text-muted-foreground">
								<tr>
									<th className="px-3 py-2 text-left font-medium">Persona</th>
									<th className="px-3 py-2 text-left font-medium">Current Share</th>
									<th className="px-3 py-2 text-left font-medium">LTV</th>
									<th className="px-3 py-2 text-left font-medium">Payback</th>
									<th className="px-3 py-2 text-left font-medium">Profit Index</th>
									<th className="px-3 py-2 text-left font-medium">Suggested</th>
									<th className="px-3 py-2 text-left font-medium">Target Mix</th>
									<th className="px-3 py-2 text-left font-medium"></th>
								</tr>
							</thead>
							<tbody>
								{mergedPersonas.map((p, idx) => (
									<>
										<tr key={p.id} className={cn(idx % 2 === 0 ? 'bg-surface' : 'bg-muted/20', 'hover:bg-accent/10')}>
											<td className="px-3 py-3 font-medium">{p.label}</td>
											<td className="px-3 py-3">{Math.round(p.revenueShare * 100)}%</td>
											<td className="px-3 py-3">${p.ltv}</td>
											<td className="px-3 py-3">{p.paybackDays}d</td>
											<td className="px-3 py-3">
												<Badge variant={p.profitIndex > 1.2 ? 'success' : p.profitIndex > 1.0 ? 'outline' : 'warning'}>
													{p.profitIndex.toFixed(2)}
												</Badge>
											</td>
											<td className="px-3 py-3 text-muted-foreground">{suggestedMix[p.id] ?? 0}%</td>
											<td className="px-3 py-3">
												<div className="flex items-center gap-3">
													<input type="range" min={0} max={60} step={1} value={targetMix[p.id] ?? 0} onChange={(e) => updateMix(p.id, Number(e.target.value))} className="w-24" />
													<span className="text-xs font-medium w-10">{targetMix[p.id] ?? 0}%</span>
												</div>
											</td>
											<td className="px-3 py-3">
												<Button variant="ghost" size="icon" onClick={() => toggleExpand(p.id)}>
													{expandedPersonas[p.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
												</Button>
											</td>
										</tr>
										{expandedPersonas[p.id] && p.qualitative && (
											<tr key={`${p.id}-details`} className="bg-muted/40">
												<td colSpan={8} className="px-3 py-4">
													<div className="grid gap-4 md:grid-cols-2">
														<div>
															<h4 className="mb-2 text-sm font-semibold">Qualitative Insights</h4>
															<div className="space-y-4 text-sm">
																{p.qualitative.wordCloud && p.qualitative.wordCloud.length > 0 && (
																	<Card>
																		<CardHeader className="pb-3">
																			<CardTitle className="text-sm">Emotional Triggers</CardTitle>
																			<CardDescription className="text-xs">Words that resonate most with this persona</CardDescription>
																		</CardHeader>
																		<CardContent className="pt-0">
																			<WordCloud words={p.qualitative.wordCloud} />
																		</CardContent>
																	</Card>
																)}
																<div>
																	<span className="font-medium text-muted-foreground">Likes: </span>
																	<div className="mt-1 flex flex-wrap gap-1">
																		{p.qualitative.likes.map((like, i) => (
																			<Badge key={i} variant="outline">{like}</Badge>
																		))}
																	</div>
																</div>
																<div>
																	<span className="font-medium text-muted-foreground">Dislikes: </span>
																	<div className="mt-1 flex flex-wrap gap-1">
																		{p.qualitative.dislikes.map((dislike, i) => (
																			<Badge key={i} variant="outline">{dislike}</Badge>
																		))}
																	</div>
																</div>
																<div>
																	<span className="font-medium text-muted-foreground">Competitive Brands: </span>
																	<div className="mt-1 flex flex-wrap gap-1">
																		{p.qualitative.competitiveBrands.map((brand, i) => (
																			<Badge key={i} variant="secondary">{brand}</Badge>
																		))}
																	</div>
																</div>
																<div>
																	<span className="font-medium text-muted-foreground">First Purchase: </span>
																	<div className="mt-1 flex flex-wrap gap-1">
																		{p.qualitative.firstPurchase.map((item, i) => (
																			<Badge key={i} variant="success">{item}</Badge>
																		))}
																	</div>
																</div>
															</div>
														</div>
														<div>
															<h4 className="mb-2 text-sm font-semibold">Messaging & Strategy</h4>
															<div className="space-y-2 text-sm">
																<div>
																	<span className="font-medium text-muted-foreground">Messaging: </span>
																	<p className="mt-1 text-muted-foreground">{p.qualitative.messaging}</p>
																</div>
																<div>
																	<span className="font-medium text-muted-foreground">Influencers: </span>
																	<div className="mt-1 flex flex-wrap gap-1">
																		{p.qualitative.influencers.map((inf, i) => (
																			<Badge key={i} variant="outline">{inf}</Badge>
																		))}
																	</div>
																</div>
																<div>
																	<span className="font-medium text-muted-foreground">Email Tone: </span>
																	<Badge variant="outline" className="mt-1">{p.qualitative.emailTone}</Badge>
																</div>
															</div>
														</div>
													</div>
													{p.acquisitionTrend && p.acquisitionTrend.length > 0 && (
														<div className="mt-4">
															<h4 className="mb-2 text-sm font-semibold">Acquisition Trend</h4>
															<div className="h-48 w-full">
																<ResponsiveContainer>
																	<LineChart data={p.acquisitionTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
																		<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
																		<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
																		<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
																		<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
																		<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', fontSize: '12px' }} />
																		<Legend />
																		<Line yAxisId="left" type="monotone" dataKey="count" name="New Customers" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 3 }} />
																		<Line yAxisId="right" type="monotone" dataKey="cac" name="CAC" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))', r: 3 }} />
																	</LineChart>
																</ResponsiveContainer>
															</div>
														</div>
													)}
												</td>
											</tr>
										)}
									</>
								))}
							</tbody>
						</table>
					</div>
					<div className="mt-4 text-sm text-muted-foreground">
						Total target: {total}% • Suggestions favor higher LTV/profit and faster payback; adjust as needed.
					</div>
				</CardContent>
			</Card>
		</section>
	)
}
