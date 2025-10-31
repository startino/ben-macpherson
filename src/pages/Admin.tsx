import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Admin() {
	const [baselineHours, setBaselineHours] = useState('20')
	const [postHours, setPostHours] = useState('8')

	useEffect(() => {
		try {
			const v = localStorage.getItem('valueTracker')
			if (v) {
				const obj = JSON.parse(v)
				setBaselineHours(obj.baselineHours ?? '20')
				setPostHours(obj.postHours ?? '8')
			}
		} catch {}
	}, [])

	function save() {
		localStorage.setItem('valueTracker', JSON.stringify({ baselineHours, postHours }))
	}

	const savedHours = Math.max(0, Number(baselineHours) - Number(postHours))

	return (
		<section className="grid gap-6">
			<h2 className="text-xl font-semibold">Admin</h2>
			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="mb-3 text-sm text-muted-foreground">ValueTracker (hours saved)</div>
					<label className="mb-2 grid gap-1">
						<span className="text-xs text-muted-foreground">Baseline hours/month (pre‑MVP)</span>
						<input value={baselineHours} onChange={(e) => setBaselineHours(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
					</label>
					<label className="mb-4 grid gap-1">
						<span className="text-xs text-muted-foreground">Hours/month with MVP</span>
						<input value={postHours} onChange={(e) => setPostHours(e.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
					</label>
					<Button variant="outline" onClick={save}>Save</Button>
				</div>
				<div className="rounded-lg border border-border bg-card p-4">
					<div className="text-xs text-muted-foreground">Estimated hours saved</div>
					<div className="text-3xl font-semibold">{savedHours}</div>
					<div className="text-xs text-muted-foreground">per brand per month</div>
				</div>
			</div>
		</section>
	)
}
