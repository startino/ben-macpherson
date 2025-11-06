import { useState, useMemo } from 'react'
import creativeBriefsData from '@/data/mock/creativeBriefs.json'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreativeRoadmap } from '@/components/creative/CreativeRoadmap'
import { CreativeBrief } from '@/components/creative/CreativeBrief'
import { ExportDialog } from '@/components/creative/ExportDialog'
import { Download, Calendar, FileText, Sparkles } from 'lucide-react'

export default function Creative() {
	const [exportDialogOpen, setExportDialogOpen] = useState(false)
	const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null)
	const [expandedBriefs, setExpandedBriefs] = useState<Record<string, boolean>>({})

	const briefs = creativeBriefsData

	// Calculate stats
	const stats = useMemo(() => {
		const totalBudget = briefs.reduce((sum, b) => sum + b.estimatedBudget, 0)
		const activeCount = briefs.filter((b) => b.status === 'active').length
		const plannedCount = briefs.filter((b) => b.status === 'planned').length
		const personas = new Set(briefs.map((b) => b.personaLabel))

		return {
			totalBudget,
			activeCount,
			plannedCount,
			personaCount: personas.size,
		}
	}, [briefs])

	const handleBriefClick = (briefId: string) => {
		setSelectedBriefId(briefId)
		setExpandedBriefs((prev) => ({ ...prev, [briefId]: !prev[briefId] }))

		// Scroll to brief
		setTimeout(() => {
			const element = document.getElementById(`brief-${briefId}`)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		}, 100)
	}

	const toggleBrief = (briefId: string) => {
		setExpandedBriefs((prev) => ({ ...prev, [briefId]: !prev[briefId] }))
	}

	// Group briefs by persona
	const briefsByPersona = useMemo(() => {
		const grouped: Record<string, typeof briefs> = {}
		briefs.forEach((brief) => {
			if (!grouped[brief.personaLabel]) {
				grouped[brief.personaLabel] = []
			}
			grouped[brief.personaLabel].push(brief)
		})
		return grouped
	}, [briefs])

	return (
		<section className="grid gap-6">
			{/* Header */}
			<div className="flex items-end justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Creative Intelligence</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						AI-generated creative briefs and campaign roadmaps optimized for persona profitability
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={() => setExportDialogOpen(true)}>
						<Download className="mr-2 h-4 w-4" />
						Export Campaigns
					</Button>
				</div>
			</div>

			{/* Stats */}
			<div className="grid gap-4 md:grid-cols-4">
				<div className="rounded-lg border bg-card p-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<FileText className="h-4 w-4" />
						Total Briefs
					</div>
					<div className="mt-2 text-2xl font-bold">{briefs.length}</div>
					<div className="mt-1 text-xs text-muted-foreground">
						{stats.activeCount} active, {stats.plannedCount} planned
					</div>
				</div>
				<div className="rounded-lg border bg-card p-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Calendar className="h-4 w-4" />
						Timeline
					</div>
					<div className="mt-2 text-2xl font-bold">6 Months</div>
					<div className="mt-1 text-xs text-muted-foreground">Q1 & Q2 2025 coverage</div>
				</div>
				<div className="rounded-lg border bg-card p-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Sparkles className="h-4 w-4" />
						Personas
					</div>
					<div className="mt-2 text-2xl font-bold">{stats.personaCount}</div>
					<div className="mt-1 text-xs text-muted-foreground">Persona segments targeted</div>
				</div>
				<div className="rounded-lg border bg-card p-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Download className="h-4 w-4" />
						Total Budget
					</div>
					<div className="mt-2 text-2xl font-bold">${(stats.totalBudget / 1000).toFixed(0)}K</div>
					<div className="mt-1 text-xs text-muted-foreground">Across all campaigns</div>
				</div>
			</div>

			{/* Main Content */}
			<Tabs defaultValue="roadmap" className="space-y-6">
				<TabsList>
					<TabsTrigger value="roadmap">
						<Calendar className="mr-2 h-4 w-4" />
						Roadmap
					</TabsTrigger>
					<TabsTrigger value="briefs">
						<FileText className="mr-2 h-4 w-4" />
						All Briefs
					</TabsTrigger>
					<TabsTrigger value="by-persona">
						<Sparkles className="mr-2 h-4 w-4" />
						By Persona
					</TabsTrigger>
				</TabsList>

				<TabsContent value="roadmap" className="space-y-6">
					<CreativeRoadmap briefs={briefs} onBriefClick={handleBriefClick} />

					{selectedBriefId && (
						<div id={`brief-${selectedBriefId}`}>
							<h3 className="mb-4 text-lg font-semibold">Selected Brief</h3>
							<CreativeBrief
								brief={briefs.find((b) => b.id === selectedBriefId)!}
								isExpanded={expandedBriefs[selectedBriefId]}
								onToggleExpand={() => toggleBrief(selectedBriefId)}
							/>
						</div>
					)}
				</TabsContent>

				<TabsContent value="briefs" className="space-y-4">
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							Showing {briefs.length} creative briefs sorted by quarter and month
						</p>
						<div className="flex gap-2">
							<Badge variant="outline">All Personas</Badge>
							<Badge variant="outline">All Quarters</Badge>
						</div>
					</div>

					<div className="grid gap-4">
						{briefs.map((brief) => (
							<div key={brief.id} id={`brief-${brief.id}`}>
								<CreativeBrief
									brief={brief}
									isExpanded={expandedBriefs[brief.id]}
									onToggleExpand={() => toggleBrief(brief.id)}
								/>
							</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="by-persona" className="space-y-8">
					{Object.entries(briefsByPersona).map(([personaLabel, personaBriefs]) => (
						<div key={personaLabel} className="space-y-4">
							<div className="flex items-center justify-between border-b pb-3">
								<div>
									<h3 className="text-lg font-semibold">{personaLabel}</h3>
									<p className="text-sm text-muted-foreground">
										{personaBriefs.length} {personaBriefs.length === 1 ? 'brief' : 'briefs'} • $
										{(personaBriefs.reduce((sum, b) => sum + b.estimatedBudget, 0) / 1000).toFixed(0)}K budget
									</p>
								</div>
								<Badge variant="outline">{personaBriefs.length} briefs</Badge>
							</div>

							<div className="grid gap-4">
								{personaBriefs.map((brief) => (
									<div key={brief.id} id={`brief-${brief.id}`}>
										<CreativeBrief
											brief={brief}
											isExpanded={expandedBriefs[brief.id]}
											onToggleExpand={() => toggleBrief(brief.id)}
										/>
									</div>
								))}
							</div>
						</div>
					))}
				</TabsContent>
			</Tabs>

			{/* Export Dialog */}
			<ExportDialog isOpen={exportDialogOpen} onClose={() => setExportDialogOpen(false)} briefs={briefs} />
		</section>
	)
}
