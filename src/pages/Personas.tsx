import { useEffect, useMemo, useState } from 'react'
import personasData from '@/data/mock/personas.json'
import { Button } from '@/components/ui/button'

interface Persona {
	id: string
	label: string
	revenueShare: number
	ltv: number
	paybackDays: number
	profitIndex: number
}

export default function Personas() {
	const [targetMix, setTargetMix] = useState<Record<string, number>>({})

	const personas = personasData as Persona[]

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

	const total = Object.values(targetMix).reduce((a, b) => a + (b || 0), 0)

	return (
		<section className="grid gap-6">
			<div className="flex items-end justify-between">
				<h2 className="text-xl font-semibold">Persona Intelligence</h2>
				<div className="flex gap-2">
					<Button variant="outline" onClick={applySuggestions}>Apply suggestions</Button>
					<Button variant="outline" onClick={() => { localStorage.removeItem('targetMix'); setTargetMix(suggestedMix) }}>Reset</Button>
				</div>
			</div>
			<div className="overflow-x-auto rounded-lg border border-border">
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
						</tr>
					</thead>
					<tbody>
						{personas.map(p => (
							<tr key={p.id} className="border-t border-border">
								<td className="px-3 py-2">{p.label}</td>
								<td className="px-3 py-2">{Math.round(p.revenueShare * 100)}%</td>
								<td className="px-3 py-2">${p.ltv}</td>
								<td className="px-3 py-2">{p.paybackDays}d</td>
								<td className="px-3 py-2">{p.profitIndex.toFixed(2)}</td>
								<td className="px-3 py-2 text-muted-foreground">{suggestedMix[p.id] ?? 0}%</td>
								<td className="px-3 py-2">
									<div className="flex items-center gap-3">
										<input type="range" min={0} max={60} step={1} value={targetMix[p.id] ?? 0} onChange={(e) => updateMix(p.id, Number(e.target.value))} />
										<span className="text-xs text-muted-foreground">{targetMix[p.id] ?? 0}%</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="text-sm text-muted-foreground">Total target: {total}% • Suggestions favor higher LTV/profit and faster payback; adjust as needed.</div>
		</section>
	)
}
