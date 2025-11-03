import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Admin</h2>
				<p className="mt-1 text-sm text-muted-foreground">Manage system settings and track value metrics</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>ValueTracker</CardTitle>
						<CardDescription>Calculate hours saved per month</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<label className="grid gap-1.5">
							<span className="text-sm font-medium">Baseline hours/month (pre‑MVP)</span>
							<Input type="number" value={baselineHours} onChange={(e) => setBaselineHours(e.target.value)} />
						</label>
						<label className="grid gap-1.5">
							<span className="text-sm font-medium">Hours/month with MVP</span>
							<Input type="number" value={postHours} onChange={(e) => setPostHours(e.target.value)} />
						</label>
						<Button variant="outline" onClick={save}>Save</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>Estimated hours saved</CardDescription>
						<CardTitle className="text-4xl">{savedHours}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">per brand per month</p>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}
