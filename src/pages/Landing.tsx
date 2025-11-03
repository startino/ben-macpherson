import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Landing() {
	return (
		<section className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">A first‑party persona intelligence + creative system</h1>
				<p className="mt-3 text-muted-foreground max-w-2xl text-lg leading-relaxed">It ingests data and survey responses, identifies the highest‑value customer personas, tracks acquisition mix in real time, and generates persona‑specific creative and messaging to shift spend toward profitable customers.</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>After NDA, assets to accelerate:</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
						<li>Example surveys</li>
						<li>Full list of platforms to integrate</li>
						<li>LookerStudio examples</li>
						<li>Case studies</li>
						<li>Internal SOPs</li>
					</ul>
				</CardContent>
			</Card>
		</section>
	)
}
