import creative from '@/data/mock/creative.json'

export default function Creative() {
	const entries = Object.entries(creative as Record<string, any>)
	return (
		<section className="grid gap-6">
			<h2 className="text-xl font-semibold">Creative & Strategy</h2>
			<div className="grid gap-4 md:grid-cols-2">
				{entries.map(([pid, c]) => (
					<div key={pid} className="rounded-lg border border-border bg-card p-4">
						<div className="mb-2 text-sm text-muted-foreground">Persona: {pid.toUpperCase()}</div>
						<div className="space-y-2">
							<div>
								<div className="mb-1 text-xs text-muted-foreground">Angles</div>
								<ul className="list-inside list-disc text-sm">
									{c.brief?.angles?.map((a: string, i: number) => <li key={i}>{a}</li>)}
								</ul>
							</div>
							<div>
								<div className="mb-1 text-xs text-muted-foreground">Hooks</div>
								<ul className="list-inside list-disc text-sm">
									{c.brief?.hooks?.map((a: string, i: number) => <li key={i}>{a}</li>)}
								</ul>
							</div>
							<div>
								<div className="mb-1 text-xs text-muted-foreground">Draft copy</div>
								<ul className="list-inside list-disc text-sm">
									{c.copy?.map((a: string, i: number) => <li key={i}>{a}</li>)}
								</ul>
							</div>
							{c.imagePrompts && (
								<div>
									<div className="mb-1 text-xs text-muted-foreground">Image prompts</div>
									<div className="text-sm">{c.imagePrompts.join('; ')}</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
