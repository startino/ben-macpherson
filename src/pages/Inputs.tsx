import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Inputs() {
	const [connected, setConnected] = useState<Record<string, boolean>>({
		Shopify: false,
		GA4: false,
		Meta: false,
		"Google Ads": false,
		Klaviyo: false,
	})
	const [surveyOpen, setSurveyOpen] = useState(false)

	useEffect(() => {
		try {
			const savedConn = localStorage.getItem('connections')
			if (savedConn) setConnected(JSON.parse(savedConn))
		} catch {}
	}, [])

	function toggleConnection(k: string) {
		setConnected((prev) => {
			const next = { ...prev, [k]: !prev[k as keyof typeof prev] }
			localStorage.setItem('connections', JSON.stringify(next))
			return next
		})
	}

	return (
		<section className="grid gap-6">
			<div className="flex items-end justify-between">
				<h2 className="text-xl font-semibold">Inputs</h2>
				<Button variant="outline" onClick={() => setSurveyOpen(true)}>Launch survey</Button>
			</div>
			<div className="rounded-lg border border-border bg-card p-4">
				<div className="mb-3 text-sm text-muted-foreground">Connections</div>
				<div className="grid gap-2">
					{Object.keys(connected).map((k) => (
						<button key={k} onClick={() => toggleConnection(k)} className={`flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:bg-accent/30 ${connected[k as keyof typeof connected] ? 'bg-accent/20' : 'bg-card'}`}>
							<span>{k}</span>
							<span className={`text-xs ${connected[k as keyof typeof connected] ? 'text-emerald-400' : 'text-muted-foreground'}`}>{connected[k as keyof typeof connected] ? 'Connected' : 'Connect'}</span>
						</button>
					))}
				</div>
			</div>

			{surveyOpen && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<div className="w-full max-w-md rounded-lg border border-border bg-card p-4">
						<div className="mb-2 text-sm font-medium">Survey launcher</div>
						<p className="mb-4 text-sm text-muted-foreground">Share this link with recent buyers or send via your ESP.</p>
						<div className="mb-4 break-all rounded-md border border-border bg-background p-2 text-xs">https://startino.github.io/ben-macpherson/survey/demo</div>
						<div className="flex justify-end gap-2">
							<Button variant="outline" onClick={() => setSurveyOpen(false)}>Close</Button>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
