import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Target, Users, TrendingUp, MessageSquare, Image } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CreativeBriefProps {
	brief: {
		id: string
		personaId: string
		personaLabel: string
		quarter: string
		month: number
		title: string
		objective: string
		targetAudience: string
		keyMessage: string
		hooks: string[]
		messagingAngles?: Array<{
			angle: string
			description: string
			rationale: string
		}>
		motivators: string[]
		blockers: string[]
		channels: string[]
		imagePrompts: string[]
		copyVariations: {
			headlines: string[]
			descriptions: string[]
			cta: string[]
		}
		successMetrics: {
			primaryKPI: string
			targetCAC: number
			targetLTV: number
			targetPayback: number
		}
		estimatedBudget: number
		status: string
		notes?: string
	}
	isExpanded?: boolean
	onToggleExpand?: () => void
}

export function CreativeBrief({ brief, isExpanded = false, onToggleExpand }: CreativeBriefProps) {
	const [localExpanded, setLocalExpanded] = useState(isExpanded)

	const expanded = onToggleExpand ? isExpanded : localExpanded
	const toggleExpanded = onToggleExpand || (() => setLocalExpanded(!localExpanded))

	const statusColors: Record<string, string> = {
		active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		planned: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
		completed: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
	}

	return (
		<Card
			aiContext={`Creative brief: ${brief.title} targeting ${brief.personaLabel}. Budget: $${brief.estimatedBudget}`}
			aiTitle={brief.title}
		>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="mb-2 flex items-center gap-2">
							<Badge variant="outline">{brief.personaLabel}</Badge>
							<Badge variant="outline">{brief.quarter} - M{brief.month}</Badge>
							<Badge className={cn('border', statusColors[brief.status])}>
								{brief.status}
							</Badge>
						</div>
						<CardTitle className="text-lg">{brief.title}</CardTitle>
						<CardDescription className="mt-1">{brief.objective}</CardDescription>
					</div>
					<Button variant="ghost" size="icon" onClick={toggleExpanded}>
						{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
					</Button>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Quick Stats */}
				<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
					<div className="rounded-lg border bg-muted/30 p-3">
						<div className="text-xs text-muted-foreground">Budget</div>
						<div className="text-sm font-semibold">${(brief.estimatedBudget / 1000).toFixed(0)}K</div>
					</div>
					<div className="rounded-lg border bg-muted/30 p-3">
						<div className="text-xs text-muted-foreground">Target CAC</div>
						<div className="text-sm font-semibold">${brief.successMetrics.targetCAC}</div>
					</div>
					<div className="rounded-lg border bg-muted/30 p-3">
						<div className="text-xs text-muted-foreground">Target LTV</div>
						<div className="text-sm font-semibold">${brief.successMetrics.targetLTV}</div>
					</div>
					<div className="rounded-lg border bg-muted/30 p-3">
						<div className="text-xs text-muted-foreground">Payback</div>
						<div className="text-sm font-semibold">{brief.successMetrics.targetPayback}d</div>
					</div>
				</div>

				{/* Key Message */}
				<div className="rounded-lg border bg-accent/30 p-3">
					<div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
						<MessageSquare className="h-3.5 w-3.5" />
						Key Message
					</div>
					<p className="text-sm font-medium">{brief.keyMessage}</p>
				</div>

				{/* Hooks Preview */}
				<div>
					<div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
						<Target className="h-3.5 w-3.5" />
						Hooks ({brief.hooks.length})
					</div>
					<div className="space-y-1.5">
						{(expanded ? brief.hooks : brief.hooks.slice(0, 2)).map((hook, i) => (
							<div key={i} className="rounded-md border bg-card p-2 text-sm">
								"{hook}"
							</div>
						))}
						{!expanded && brief.hooks.length > 2 && (
							<div className="text-xs text-muted-foreground">
								+ {brief.hooks.length - 2} more hooks
							</div>
						)}
					</div>
				</div>

				{expanded && (
					<>
						{/* Messaging Angles */}
						{brief.messagingAngles && brief.messagingAngles.length > 0 && (
							<div>
								<div className="mb-2 text-xs font-medium text-muted-foreground">
									Messaging Angles
								</div>
								<div className="space-y-2">
									{brief.messagingAngles.map((angle, i) => (
										<div key={i} className="rounded-md border bg-muted/30 p-3">
											<div className="mb-1 font-medium text-sm">{angle.angle}</div>
											<p className="mb-2 text-xs text-muted-foreground">{angle.description}</p>
											<p className="text-xs">
												<span className="font-medium">Rationale:</span> {angle.rationale}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Target Audience */}
						<div>
							<div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
								<Users className="h-3.5 w-3.5" />
								Target Audience
							</div>
							<p className="text-sm">{brief.targetAudience}</p>
						</div>

						{/* Motivators & Blockers */}
						<div className="grid gap-3 md:grid-cols-2">
							<div>
								<div className="mb-2 text-xs font-medium text-muted-foreground">
									Motivators
								</div>
								<div className="flex flex-wrap gap-1.5">
									{brief.motivators.map((m, i) => (
										<Badge key={i} variant="success" className="text-xs">
											{m}
										</Badge>
									))}
								</div>
							</div>
							<div>
								<div className="mb-2 text-xs font-medium text-muted-foreground">
									Blockers
								</div>
								<div className="flex flex-wrap gap-1.5">
									{brief.blockers.map((b, i) => (
										<Badge key={i} variant="warning" className="text-xs">
											{b}
										</Badge>
									))}
								</div>
							</div>
						</div>

						{/* Copy Variations */}
						<div>
							<div className="mb-2 text-xs font-medium text-muted-foreground">
								Copy Variations
							</div>
							<div className="space-y-3 rounded-md border bg-muted/30 p-3">
								<div>
									<div className="mb-1 text-xs font-medium">Headlines</div>
									<div className="space-y-1">
										{brief.copyVariations.headlines.map((h, i) => (
											<div key={i} className="text-sm">• {h}</div>
										))}
									</div>
								</div>
								<div>
									<div className="mb-1 text-xs font-medium">Descriptions</div>
									<div className="space-y-1">
										{brief.copyVariations.descriptions.map((d, i) => (
											<div key={i} className="text-xs text-muted-foreground">• {d}</div>
										))}
									</div>
								</div>
								<div>
									<div className="mb-1 text-xs font-medium">CTAs</div>
									<div className="flex flex-wrap gap-1.5">
										{brief.copyVariations.cta.map((c, i) => (
											<Badge key={i} variant="outline" className="text-xs">
												{c}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Image Prompts */}
						<div>
							<div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
								<Image className="h-3.5 w-3.5" />
								Image Prompts
							</div>
							<div className="space-y-2">
								{brief.imagePrompts.map((prompt, i) => (
									<div key={i} className="rounded-md border bg-card p-2 text-xs">
										<span className="font-medium">{i + 1}.</span> {prompt}
									</div>
								))}
							</div>
						</div>

						{/* Channels */}
						<div>
							<div className="mb-2 text-xs font-medium text-muted-foreground">
								Channels
							</div>
							<div className="flex flex-wrap gap-1.5">
								{brief.channels.map((channel, i) => (
									<Badge key={i} variant="outline">
										{channel}
									</Badge>
								))}
							</div>
						</div>

						{/* Success Metrics */}
						<div>
							<div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
								<TrendingUp className="h-3.5 w-3.5" />
								Success Metrics
							</div>
							<div className="rounded-md border bg-muted/30 p-3 text-sm">
								<div className="mb-2">
									<span className="font-medium">Primary KPI:</span> {brief.successMetrics.primaryKPI}
								</div>
								<div className="grid grid-cols-3 gap-3 text-xs">
									<div>
										<div className="text-muted-foreground">Target CAC</div>
										<div className="font-medium">${brief.successMetrics.targetCAC}</div>
									</div>
									<div>
										<div className="text-muted-foreground">Target LTV</div>
										<div className="font-medium">${brief.successMetrics.targetLTV}</div>
									</div>
									<div>
										<div className="text-muted-foreground">Payback Period</div>
										<div className="font-medium">{brief.successMetrics.targetPayback} days</div>
									</div>
								</div>
							</div>
						</div>

						{/* Notes */}
						{brief.notes && (
							<div className="rounded-md border-l-4 border-amber-500 bg-amber-500/10 p-3">
								<div className="mb-1 text-xs font-medium text-amber-700 dark:text-amber-400">
									Note
								</div>
								<p className="text-xs text-muted-foreground">{brief.notes}</p>
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

