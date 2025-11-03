import creative from '@/data/mock/creative.json'
import personaDetailsData from '@/data/mock/personaDetails.json'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Creative() {
	const entries = Object.entries(creative as Record<string, any>)
	const personaDetails = personaDetailsData as any[]

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Creative & Strategy</h2>
				<p className="mt-1 text-sm text-muted-foreground">Persona-specific creative briefs, messaging, and campaign strategy</p>
			</div>
			<div className="grid gap-6">
				{entries.map(([pid, c]) => {
					const persona = personaDetails.find((p) => p.id === pid)
					return (
						<Card key={pid}>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl">{persona?.label || `Persona ${pid.toUpperCase()}`}</CardTitle>
										<CardDescription className="mt-1">
											{persona?.qualitative?.messaging || 'Creative strategy and messaging guidelines'}
										</CardDescription>
									</div>
									<Badge variant="outline">{pid.toUpperCase()}</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<Tabs defaultValue="creative" className="w-full">
									<TabsList className="grid w-full grid-cols-4">
										<TabsTrigger value="creative">Creative Brief</TabsTrigger>
										<TabsTrigger value="messaging">Messaging</TabsTrigger>
										<TabsTrigger value="influencers">Influencers</TabsTrigger>
										<TabsTrigger value="products">First Purchase</TabsTrigger>
									</TabsList>
									<TabsContent value="creative" className="space-y-4 mt-4">
										{c.brief?.angles && (
											<div>
												<div className="mb-2 text-sm font-semibold">Creative Angles</div>
												<div className="flex flex-wrap gap-2">
													{c.brief.angles.map((a: string, i: number) => (
														<Badge key={i} variant="secondary">{a}</Badge>
													))}
												</div>
											</div>
										)}
										{c.brief?.hooks && (
											<div>
												<div className="mb-2 text-sm font-semibold">Hooks</div>
												<div className="flex flex-wrap gap-2">
													{c.brief.hooks.map((a: string, i: number) => (
														<Badge key={i} variant="outline">{a}</Badge>
													))}
												</div>
											</div>
										)}
										{c.brief?.pairings && (
											<div>
												<div className="mb-2 text-sm font-semibold">Product Pairings</div>
												<div className="flex flex-wrap gap-2">
													{c.brief.pairings.map((a: string, i: number) => (
														<Badge key={i} variant="success">{a}</Badge>
													))}
												</div>
											</div>
										)}
										{c.imagePrompts && (
											<div>
												<div className="mb-2 text-sm font-semibold">Image Prompts</div>
												<div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
													{c.imagePrompts.join('; ')}
												</div>
											</div>
										)}
									</TabsContent>
									<TabsContent value="messaging" className="space-y-4 mt-4">
										{c.copy && (
											<div>
												<div className="mb-2 text-sm font-semibold">Draft Copy</div>
												<div className="space-y-2">
													{c.copy.map((a: string, i: number) => (
														<div key={i} className="rounded-md bg-muted/30 p-3 text-sm italic">
															"{a}"
														</div>
													))}
												</div>
											</div>
										)}
										{persona?.qualitative?.emailTone && (
											<div>
												<div className="mb-2 text-sm font-semibold">Email Tone</div>
												<Badge variant="outline">{persona.qualitative.emailTone}</Badge>
											</div>
										)}
										{persona?.qualitative?.messaging && (
											<div>
												<div className="mb-2 text-sm font-semibold">Messaging Strategy</div>
												<p className="text-sm text-muted-foreground">{persona.qualitative.messaging}</p>
											</div>
										)}
									</TabsContent>
									<TabsContent value="influencers" className="space-y-4 mt-4">
										{persona?.qualitative?.influencers ? (
											<div>
												<div className="mb-2 text-sm font-semibold">Recommended Influencer Types</div>
												<div className="flex flex-wrap gap-2">
													{persona.qualitative.influencers.map((inf: string, i: number) => (
														<Badge key={i} variant="outline">{inf}</Badge>
													))}
												</div>
												<p className="mt-3 text-xs text-muted-foreground">
													Target influencers who align with this persona's values and interests for maximum engagement and conversion.
												</p>
											</div>
										) : (
											<p className="text-sm text-muted-foreground">No influencer recommendations available for this persona.</p>
										)}
									</TabsContent>
									<TabsContent value="products" className="space-y-4 mt-4">
										{persona?.qualitative?.firstPurchase ? (
											<div>
												<div className="mb-2 text-sm font-semibold">Recommended First Purchase Products</div>
												<div className="flex flex-wrap gap-2">
													{persona.qualitative.firstPurchase.map((item: string, i: number) => (
														<Badge key={i} variant="success">{item}</Badge>
													))}
												</div>
												<p className="mt-3 text-xs text-muted-foreground">
													These products have the highest conversion rates for this persona's first purchase. Use them in acquisition campaigns.
												</p>
											</div>
										) : (
											<p className="text-sm text-muted-foreground">No first purchase recommendations available for this persona.</p>
										)}
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</section>
	)
}
