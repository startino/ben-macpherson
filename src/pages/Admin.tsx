import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Admin() {
	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Admin</h2>
				<p className="mt-1 text-sm text-muted-foreground">Manage system settings and configuration</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Admin tools coming soon</CardTitle>
					<CardDescription>We&apos;re working on a refreshed experience for managing platform controls.</CardDescription>
				</CardHeader>
			</Card>
		</section>
	)
}
