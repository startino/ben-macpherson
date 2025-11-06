import { useState, useMemo } from 'react'
import creativeBriefsData from '@/data/mock/creativeBriefs.json'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
		<section className="space-y-6">
			{/* Header */}
			<div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border/40 bg-secondary/40 px-6 py-5">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Creative</p>
					<h2 className="mt-2 text-3xl font-semibold text-foreground">Creative Intelligence Studio</h2>
					<p className="mt-1 max-w-2xl text-sm text-muted-foreground/80">
						AI-generated briefs, roadmap governance, and persona-resonant messaging for profitable growth.
					</p>
				</div>
				<Button
					variant="ghost"
					className="rounded-full border border-border/40 px-4"
					onClick={() => setExportDialogOpen(true)}
				>
					<Download className="mr-2 h-4 w-4" />
					Export Campaigns
				</Button>
			</div>

			{/* Stats */}
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<Card className="border-none bg-secondary/40">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Total Briefs</CardDescription>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<CardTitle className="text-3xl font-semibold">{briefs.length}</CardTitle>
						<p className="mt-1 text-xs text-muted-foreground/80">
							{stats.activeCount} active • {stats.plannedCount} planned
						</p>
					</CardContent>
				</Card>
				<Card className="border-none bg-secondary/40">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Timeline</CardDescription>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<CardTitle className="text-3xl font-semibold">6 Months</CardTitle>
						<p className="mt-1 text-xs text-muted-foreground/80">Q1 &amp; Q2 2025 coverage</p>
					</CardContent>
				</Card>
				<Card className="border-none bg-secondary/40">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Personas</CardDescription>
						<Sparkles className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<CardTitle className="text-3xl font-semibold">{stats.personaCount}</CardTitle>
						<p className="mt-1 text-xs text-muted-foreground/80">Persona segments targeted</p>
					</CardContent>
				</Card>
				<Card className="border-none bg-secondary/40">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardDescription className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Total Budget</CardDescription>
						<Download className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<CardTitle className="text-3xl font-semibold">${(stats.totalBudget / 1000).toFixed(0)}K</CardTitle>
						<p className="mt-1 text-xs text-muted-foreground/80">Across all campaigns</p>
					</CardContent>
				</Card>
			</div>

			{/* Main Content */}
			<Tabs defaultValue="roadmap" className="space-y-6">
				<TabsList className="justify-start gap-2">
					<TabsTrigger value="roadmap" className="gap-2">
						<Calendar className="h-4 w-4" />
						Roadmap
					</TabsTrigger>
					<TabsTrigger value="briefs" className="gap-2">
						<FileText className="h-4 w-4" />
						All Briefs
					</TabsTrigger>
					<TabsTrigger value="by-persona" className="gap-2">
						<Sparkles className="h-4 w-4" />
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
					<div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-secondary/30 px-4 py-3">
						<p className="text-sm text-muted-foreground/80">
							Showing {briefs.length} creative briefs sorted by quarter and month
						</p>
						<div className="flex flex-wrap items-center gap-2">
							<Badge variant="outline" className="rounded-full px-3">All Personas</Badge>
							<Badge variant="outline" className="rounded-full px-3">All Quarters</Badge>
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
						<div key={personaLabel} className="space-y-4 rounded-2xl border border-border/40 bg-secondary/30 p-5">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div>
									<h3 className="text-lg font-semibold text-foreground">{personaLabel}</h3>
									<p className="text-sm text-muted-foreground/80">
										{personaBriefs.length} {personaBriefs.length === 1 ? 'brief' : 'briefs'} • $
										{(personaBriefs.reduce((sum, b) => sum + b.estimatedBudget, 0) / 1000).toFixed(0)}K budget
									</p>
								</div>
								<Badge variant="outline" className="rounded-full px-3">{personaBriefs.length} briefs</Badge>
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
