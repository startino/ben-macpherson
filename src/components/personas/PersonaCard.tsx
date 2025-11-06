import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { PersonaAvatar } from './PersonaAvatar'
import { ChevronDown, ChevronUp, TrendingUp, DollarSign, Calendar, Heart, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { WordCloud } from '@/components/ui/word-cloud'

interface PersonaCardProps {
	persona: {
		id: string
		label: string
		revenueShare: number
		ltv: number
		paybackDays: number
		profitIndex: number
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
	targetMix: number
	suggestedMix: number
	onMixChange: (value: number) => void
	isExpanded?: boolean
	onToggleExpand?: () => void
}

export function PersonaCard({
	persona,
	targetMix,
	suggestedMix,
	onMixChange,
	isExpanded = false,
	onToggleExpand,
}: PersonaCardProps) {
	const [localExpanded, setLocalExpanded] = useState(isExpanded)

	const expanded = onToggleExpand ? isExpanded : localExpanded
	const toggleExpanded = onToggleExpand || (() => setLocalExpanded(!localExpanded))

	const isDeviating = Math.abs(targetMix - suggestedMix) > 10

	// Profit indicator color
	const profitColor =
		persona.profitIndex > 1.2
			? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
			: persona.profitIndex > 1.0
			? 'text-blue-500 bg-blue-500/10 border-blue-500/20'
			: 'text-amber-500 bg-amber-500/10 border-amber-500/20'

	return (
		<Card
			aiContext={`${persona.label}: LTV $${persona.ltv}, CAC payback ${persona.paybackDays} days, profit index ${persona.profitIndex.toFixed(2)}`}
			aiTitle={persona.label}
			className="overflow-hidden transition-all hover:shadow-lg"
		>
			<CardHeader className="pb-4">
				<div className="flex items-start gap-4">
					<PersonaAvatar personaId={persona.id} personaLabel={persona.label} size="lg" />

					<div className="flex-1 space-y-2">
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-xl">{persona.label}</CardTitle>
								<CardDescription className="mt-1">
									{Math.round(persona.revenueShare * 100)}% of current revenue
								</CardDescription>
							</div>
							<Button variant="ghost" size="icon" onClick={toggleExpanded}>
								{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
							</Button>
						</div>

						{/* Key Metrics */}
						<div className="grid grid-cols-3 gap-2">
							<div className="rounded-md border bg-card p-2">
								<div className="flex items-center gap-1 text-xs text-muted-foreground">
									<DollarSign className="h-3 w-3" />
									LTV
								</div>
								<div className="text-lg font-bold">${persona.ltv}</div>
							</div>
							<div className="rounded-md border bg-card p-2">
								<div className="flex items-center gap-1 text-xs text-muted-foreground">
									<Calendar className="h-3 w-3" />
									Payback
								</div>
								<div className="text-lg font-bold">{persona.paybackDays}d</div>
							</div>
							<div className={cn('rounded-md border p-2', profitColor)}>
								<div className="flex items-center gap-1 text-xs">
									<TrendingUp className="h-3 w-3" />
									Profit
								</div>
								<div className="text-lg font-bold">{persona.profitIndex.toFixed(2)}</div>
							</div>
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Mix Targeting */}
				<div className="space-y-3 rounded-lg border bg-muted/30 p-4">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm font-medium">Target Mix</div>
							<div className="text-xs text-muted-foreground">
								Suggested: {suggestedMix}% • Current: {targetMix}%
							</div>
						</div>
						{isDeviating && (
							<Badge variant="warning" className="gap-1">
								<TrendingUp className="h-3 w-3" />
								{Math.abs(targetMix - suggestedMix)}% off
							</Badge>
						)}
					</div>

					<div className="flex items-center gap-3">
						<Slider
							min={0}
							max={60}
							step={1}
							value={[targetMix]}
							onValueChange={(value) => onMixChange(value[0])}
							className="flex-1"
						/>
						<span className="w-12 text-right text-sm font-semibold">{targetMix}%</span>
					</div>

					{isDeviating && (
						<div className="text-xs text-amber-600 dark:text-amber-400">
							Warning: Deviating from optimal mix may reduce profitability
						</div>
					)}
				</div>

				{expanded && persona.qualitative && (
					<>
						{/* Word Cloud */}
						{persona.qualitative.wordCloud && persona.qualitative.wordCloud.length > 0 && (
							<Card>
								<CardHeader className="pb-3">
									<CardTitle className="text-sm">Emotional Triggers</CardTitle>
									<CardDescription className="text-xs">
										Words that resonate most with this persona
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-0">
									<WordCloud words={persona.qualitative.wordCloud} />
								</CardContent>
							</Card>
						)}

						{/* Likes & Dislikes */}
						<div className="grid gap-3 md:grid-cols-2">
							<div>
								<div className="mb-2 flex items-center gap-2 text-sm font-medium">
									<Heart className="h-4 w-4 text-emerald-500" />
									Likes
								</div>
								<div className="flex flex-wrap gap-1.5">
									{persona.qualitative.likes.map((like, i) => (
										<Badge key={i} variant="success" className="text-xs">
											{like}
										</Badge>
									))}
								</div>
							</div>
							<div>
								<div className="mb-2 flex items-center gap-2 text-sm font-medium">
									<X className="h-4 w-4 text-red-500" />
									Dislikes
								</div>
								<div className="flex flex-wrap gap-1.5">
									{persona.qualitative.dislikes.map((dislike, i) => (
										<Badge key={i} variant="warning" className="text-xs">
											{dislike}
										</Badge>
									))}
								</div>
							</div>
						</div>

						{/* Competitive Brands */}
						<div>
							<div className="mb-2 text-sm font-medium">Competitive Brands</div>
							<div className="flex flex-wrap gap-1.5">
								{persona.qualitative.competitiveBrands.map((brand, i) => (
									<Badge key={i} variant="secondary">
										{brand}
									</Badge>
								))}
							</div>
						</div>

						{/* First Purchase */}
						<div>
							<div className="mb-2 text-sm font-medium">First Purchase Products</div>
							<div className="flex flex-wrap gap-1.5">
								{persona.qualitative.firstPurchase.map((item, i) => (
									<Badge key={i} variant="outline">
										{item}
									</Badge>
								))}
							</div>
						</div>

						{/* Messaging Strategy */}
						<div className="rounded-lg border bg-accent/30 p-3">
							<div className="mb-1 text-sm font-medium">Messaging Strategy</div>
							<p className="text-sm text-muted-foreground">{persona.qualitative.messaging}</p>
						</div>

						{/* Influencers */}
						<div>
							<div className="mb-2 text-sm font-medium">Recommended Influencer Types</div>
							<div className="flex flex-wrap gap-1.5">
								{persona.qualitative.influencers.map((inf, i) => (
									<Badge key={i} variant="outline">
										{inf}
									</Badge>
								))}
							</div>
						</div>

						{/* Email Tone */}
						<div>
							<div className="mb-2 text-sm font-medium">Email Tone</div>
							<Badge variant="outline">{persona.qualitative.emailTone}</Badge>
						</div>

						{/* Acquisition Trend */}
						{persona.acquisitionTrend && persona.acquisitionTrend.length > 0 && (
							<div>
								<div className="mb-2 text-sm font-medium">Acquisition Trend</div>
								<div className="h-48 w-full">
									<ResponsiveContainer>
										<LineChart data={persona.acquisitionTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
											<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
											<XAxis
												dataKey="date"
												stroke="hsl(var(--muted-foreground))"
												tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
											/>
											<YAxis
												yAxisId="left"
												stroke="hsl(var(--muted-foreground))"
												tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
											/>
											<YAxis
												yAxisId="right"
												orientation="right"
												stroke="hsl(var(--muted-foreground))"
												tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
											/>
											<Tooltip
												contentStyle={{
													background: 'hsl(var(--card))',
													border: '1px solid hsl(var(--border))',
													color: 'hsl(var(--foreground))',
													borderRadius: '0.5rem',
													fontSize: '12px',
												}}
											/>
											<Line
												yAxisId="left"
												type="monotone"
												dataKey="count"
												name="New Customers"
												stroke="hsl(var(--primary))"
												strokeWidth={2}
												dot={{ fill: 'hsl(var(--primary))', r: 3 }}
											/>
											<Line
												yAxisId="right"
												type="monotone"
												dataKey="cac"
												name="CAC"
												stroke="hsl(var(--accent))"
												strokeWidth={2}
												dot={{ fill: 'hsl(var(--accent))', r: 3 }}
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

