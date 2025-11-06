import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Target, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoadmapBrief {
	id: string
	personaId: string
	personaLabel: string
	quarter: string
	month: number
	title: string
	objective: string
	estimatedBudget: number
	status: string
	successMetrics: {
		targetCAC: number
		targetLTV: number
	}
}

interface CreativeRoadmapProps {
	briefs: RoadmapBrief[]
	onBriefClick?: (briefId: string) => void
}

export function CreativeRoadmap({ briefs, onBriefClick }: CreativeRoadmapProps) {
	// Group briefs by quarter and month
	const roadmap = useMemo(() => {
		const grouped: Record<string, Record<number, RoadmapBrief[]>> = {}

		briefs.forEach((brief) => {
			if (!grouped[brief.quarter]) {
				grouped[brief.quarter] = {}
			}
			if (!grouped[brief.quarter][brief.month]) {
				grouped[brief.quarter][brief.month] = []
			}
			grouped[brief.quarter][brief.month].push(brief)
		})

		return grouped
	}, [briefs])

	const quarters = Object.keys(roadmap).sort()

	const statusColors: Record<string, string> = {
		active: 'bg-emerald-500',
		planned: 'bg-blue-500',
		completed: 'bg-gray-400',
	}

	const getMonthName = (month: number) => {
		const date = new Date(2025, month - 1)
		return date.toLocaleString('default', { month: 'short' })
	}

	return (
		<Card aiContext="Creative roadmap showing planned and active campaigns across quarters" aiTitle="Creative Roadmap">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>3-6 Month Creative Roadmap</CardTitle>
						<CardDescription>Persona-mapped campaign timeline and budget allocation</CardDescription>
					</div>
					<div className="flex gap-2">
						<Badge variant="outline" className="gap-1.5">
							<span className="h-2 w-2 rounded-full bg-emerald-500"></span>
							Active
						</Badge>
						<Badge variant="outline" className="gap-1.5">
							<span className="h-2 w-2 rounded-full bg-blue-500"></span>
							Planned
						</Badge>
						<Badge variant="outline" className="gap-1.5">
							<span className="h-2 w-2 rounded-full bg-gray-400"></span>
							Completed
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{quarters.map((quarter) => {
						const months = Object.keys(roadmap[quarter]).map(Number).sort()
						const quarterBudget = months.reduce((total, month) => {
							return total + roadmap[quarter][month].reduce((sum, b) => sum + b.estimatedBudget, 0)
						}, 0)

						return (
							<div key={quarter} className="space-y-4">
								{/* Quarter Header */}
								<div className="flex items-center justify-between border-b pb-2">
									<h3 className="text-lg font-semibold">{quarter} 2025</h3>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<DollarSign className="h-4 w-4" />
										<span className="font-medium">${(quarterBudget / 1000).toFixed(0)}K</span>
										<span>total budget</span>
									</div>
								</div>

								{/* Timeline */}
								<div className="relative space-y-6">
									{/* Vertical line */}
									<div className="absolute left-[23px] top-0 bottom-0 w-px bg-border" />

									{months.map((month) => {
										const monthBriefs = roadmap[quarter][month]
										const monthBudget = monthBriefs.reduce((sum, b) => sum + b.estimatedBudget, 0)

										return (
											<div key={month} className="relative flex gap-6">
												{/* Month indicator */}
												<div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-background">
													<Calendar className="h-5 w-5 text-primary" />
												</div>

												{/* Month content */}
												<div className="flex-1 space-y-3 pb-4">
													<div className="flex items-baseline gap-3">
														<h4 className="text-base font-semibold">{getMonthName(month)}</h4>
														<span className="text-sm text-muted-foreground">
															${(monthBudget / 1000).toFixed(0)}K budget • {monthBriefs.length} {monthBriefs.length === 1 ? 'brief' : 'briefs'}
														</span>
													</div>

													{/* Briefs */}
													<div className="grid gap-3 md:grid-cols-2">
														{monthBriefs.map((brief) => (
															<button
																key={brief.id}
																onClick={() => onBriefClick?.(brief.id)}
																className="group relative overflow-hidden rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-md"
															>
																{/* Status indicator */}
																<div
																	className={cn(
																		'absolute left-0 top-0 h-full w-1',
																		statusColors[brief.status]
																	)}
																/>

																<div className="space-y-2 pl-2">
																	<div className="flex items-start justify-between gap-2">
																		<div className="flex-1">
																			<Badge variant="outline" className="mb-1 text-[10px]">
																				{brief.personaLabel}
																			</Badge>
																			<h5 className="text-sm font-medium leading-snug">{brief.title}</h5>
																		</div>
																		<Target className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
																	</div>

																	<p className="line-clamp-2 text-xs text-muted-foreground">
																		{brief.objective}
																	</p>

																	<div className="flex items-center justify-between text-xs">
																		<div className="flex gap-3">
																			<div>
																				<span className="text-muted-foreground">CAC:</span>{' '}
																				<span className="font-medium">${brief.successMetrics.targetCAC}</span>
																			</div>
																			<div>
																				<span className="text-muted-foreground">LTV:</span>{' '}
																				<span className="font-medium">${brief.successMetrics.targetLTV}</span>
																			</div>
																		</div>
																		<div className="font-medium text-primary">
																			${(brief.estimatedBudget / 1000).toFixed(0)}K
																		</div>
																	</div>
																</div>
															</button>
														))}
													</div>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

