import { useEffect, useState } from 'react'
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

	useEffect(() => {
		try {
			const saved = localStorage.getItem('targetMix')
			if (saved) setTargetMix(JSON.parse(saved))
		} catch {}
	}, [])

	function updateMix(id: string, value: number) {
		const next = { ...targetMix, [id]: value }
		setTargetMix(next)
		localStorage.setItem('targetMix', JSON.stringify(next))
	}

	const personas = personasData as Persona[]
	const total = Object.values(targetMix).reduce((a, b) => a + (b || 0), 0)

	return (
		<section className="grid gap-6">
			<div className="flex items-end justify-between">
				<h2 className="text-xl font-semibold">Persona Intelligence</h2>
				<Button variant="outline" onClick={() => { localStorage.removeItem('targetMix'); setTargetMix({}) }}>Reset target mix</Button>
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
			<div className="text-sm text-muted-foreground">Total target: {total}% • Tip: Aim to shift spend toward higher LTV / profit personas.</div>
		</section>
	)
}
