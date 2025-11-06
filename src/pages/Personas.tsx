import { useEffect, useMemo, useState } from 'react'
import personasData from '@/data/mock/personas.json'
import personaDetailsData from '@/data/mock/personaDetails.json'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PersonaCard } from '@/components/personas/PersonaCard'
import { PersonaMixVisualizer } from '@/components/personas/PersonaMixVisualizer'
import { ProfitImpactCalculator } from '@/components/personas/ProfitImpactCalculator'
import { LayoutGrid, Users, TrendingUp } from 'lucide-react'

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
	const [savedTargetMix, setSavedTargetMix] = useState<Record<string, number>>({})
	const [expandedPersonas, setExpandedPersonas] = useState<Record<string, boolean>>({})

	const personas = personasData as Persona[]
	const personaDetails = personaDetailsData as PersonaDetails[]

	// Merge data
	const mergedPersonas = personas.map((p) => {
		const details = personaDetails.find((pd) => pd.id === p.id)
		return { ...p, ...details }
	}) as PersonaDetails[]

	// Heuristic: favor higher profitIndex and LTV, penalize longer payback
	const suggestedMix: Record<string, number> = useMemo(() => {
		const scores = personas.map((p) => ({ id: p.id, score: (p.profitIndex * p.ltv) / Math.max(1, p.paybackDays) }))
		const totalScore = scores.reduce((a, s) => a + s.score, 0)
		if (totalScore === 0) return {}
		let raw = scores.map((s) => ({ id: s.id, pct: (s.score / totalScore) * 100 }))
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
				const parsed = JSON.parse(saved)
				setTargetMix(parsed)
				setSavedTargetMix(parsed)
			} else {
				setTargetMix(suggestedMix)
				setSavedTargetMix(suggestedMix)
				localStorage.setItem('targetMix', JSON.stringify(suggestedMix))
			}
		} catch {
			setTargetMix(suggestedMix)
			setSavedTargetMix(suggestedMix)
		}
	}, [suggestedMix])

	function resetToSuggested() {
		setTargetMix(suggestedMix)
		setSavedTargetMix(suggestedMix)
		localStorage.setItem('targetMix', JSON.stringify(suggestedMix))
	}

	function updateMix(id: string, value: number) {
		const next = { ...targetMix, [id]: value }
		setTargetMix(next)
	}

	function saveMix() {
		setSavedTargetMix(targetMix)
		localStorage.setItem('targetMix', JSON.stringify(targetMix))
	}

	function toggleExpand(id: string) {
		setExpandedPersonas((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	const total = Object.values(targetMix).reduce((a, b) => a + (b || 0), 0)

	const hasUnsavedChanges = useMemo(() => {
		return JSON.stringify(targetMix) !== JSON.stringify(savedTargetMix)
	}, [targetMix, savedTargetMix])

	// Prepare data for visualizations
	const personaData = mergedPersonas.map((p) => ({
		id: p.id,
		label: p.label,
		currentShare: p.revenueShare * 100,
		targetShare: targetMix[p.id] || 0,
		color: '#000',
		ltv: p.ltv,
		cac: 50, // Mock CAC, should come from data
		profitIndex: p.profitIndex,
	}))

	return (
		<section className="grid gap-6">
			{/* Header */}
			<div className="flex items-end justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Persona Intelligence</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Visual persona analysis with AI-generated avatars and rich data representations
					</p>
				</div>
				<div className="flex gap-2">
					{hasUnsavedChanges && <Button variant="default" onClick={saveMix}>Save Changes</Button>}
					<Button variant="outline" onClick={resetToSuggested}>
						Reset to Optimal
					</Button>
				</div>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="cards" className="space-y-6">
				<TabsList>
					<TabsTrigger value="cards">
						<LayoutGrid className="mr-2 h-4 w-4" />
						Persona Cards
					</TabsTrigger>
					<TabsTrigger value="mix">
						<Users className="mr-2 h-4 w-4" />
						Mix Visualizer
					</TabsTrigger>
					<TabsTrigger value="impact">
						<TrendingUp className="mr-2 h-4 w-4" />
						Profit Impact
					</TabsTrigger>
				</TabsList>

				<TabsContent value="cards" className="space-y-4">
					<div className="grid gap-4">
						{mergedPersonas.map((persona) => (
							<PersonaCard
								key={persona.id}
								persona={persona}
								targetMix={targetMix[persona.id] || 0}
								suggestedMix={suggestedMix[persona.id] || 0}
								onMixChange={(value) => updateMix(persona.id, value)}
								isExpanded={expandedPersonas[persona.id]}
								onToggleExpand={() => toggleExpand(persona.id)}
							/>
						))}
					</div>

					{total !== 100 && (
						<div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-4">
							<div className="text-sm font-medium text-amber-700 dark:text-amber-400">
								Target mix totals {total}%. Adjust personas to equal 100% for accurate projections.
							</div>
						</div>
					)}
				</TabsContent>

				<TabsContent value="mix" className="space-y-4">
					<PersonaMixVisualizer personas={personaData} mode="current" />
					<PersonaMixVisualizer personas={personaData} mode="target" />
				</TabsContent>

				<TabsContent value="impact" className="space-y-4">
					<ProfitImpactCalculator personas={personaData} monthlyNewCustomers={500} />
				</TabsContent>
			</Tabs>
		</section>
	)
}

