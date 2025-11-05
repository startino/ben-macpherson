import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle2, Circle, Clock, RefreshCw } from 'lucide-react'
import { Select } from '@/components/ui/select'

export default function Settings() {
	const [connected, setConnected] = useState<Record<string, boolean>>({
		Shopify: false,
		GA4: false,
		Meta: false,
		"Google Ads": false,
		Klaviyo: false,
	})

	// Mock sync timestamps
	const syncTimestamps: Record<string, string> = {
		Shopify: '2 minutes ago',
		GA4: '5 minutes ago',
		Meta: '8 minutes ago',
		"Google Ads": '12 minutes ago',
		Klaviyo: '1 hour ago'
	}

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

	const connectedCount = Object.values(connected).filter(Boolean).length
	const totalCount = Object.keys(connected).length

	return (
		<section className="grid gap-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="mt-1 text-sm text-muted-foreground">Manage data connections and preferences</p>
			</div>

			<Tabs defaultValue="connections" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="connections">Data Connections</TabsTrigger>
					<TabsTrigger value="general">General</TabsTrigger>
				</TabsList>

				{/* Data Connections Tab */}
				<TabsContent value="connections" className="space-y-4 mt-6">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Data Connections</CardTitle>
									<CardDescription>Connect your data sources to enable persona intelligence</CardDescription>
								</div>
								<Badge variant={connectedCount === totalCount ? 'success' : 'outline'}>
									{connectedCount}/{totalCount} connected
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid gap-2">
								{Object.keys(connected).map((k) => {
									const isConnected = connected[k as keyof typeof connected]
									const lastSync = syncTimestamps[k]
									return (
										<button
											key={k}
											onClick={() => toggleConnection(k)}
											className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-all duration-200 hover:bg-accent/50 ${
												isConnected ? 'bg-accent/30' : 'bg-surface'
											}`}
										>
											<div className="flex items-center gap-3 flex-1 min-w-0">
												<div className="flex-shrink-0">
													{isConnected ? (
														<CheckCircle2 className="h-5 w-5 text-emerald-500" />
													) : (
														<Circle className="h-5 w-5 text-muted-foreground" />
													)}
												</div>
												<div className="flex-1 min-w-0">
													<div className="font-medium">{k}</div>
													{isConnected && lastSync && (
														<div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
															<Clock className="h-3 w-3 flex-shrink-0" />
															<span>Last sync: {lastSync}</span>
														</div>
													)}
												</div>
											</div>
											<div className="flex items-center gap-2 flex-shrink-0 ml-4">
												{isConnected && (
													<Badge variant="outline" className="text-xs whitespace-nowrap">
														<RefreshCw className="h-3 w-3 mr-1" />
														Live
													</Badge>
												)}
												<Badge variant={isConnected ? 'success' : 'outline'} className="whitespace-nowrap">
													{isConnected ? 'Connected' : 'Connect'}
												</Badge>
											</div>
										</button>
									)
								})}
							</div>
							<div className="mt-4 pt-4 bg-muted/20 rounded-lg p-3">
								<div className="flex items-center justify-between mb-2">
									<div className="text-sm font-medium">Data Warehouse Status</div>
									<Badge variant="success">Healthy</Badge>
								</div>
								<div className="text-xs text-muted-foreground">
									Data warehouse is syncing automatically. All connected sources are up to date.
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* General Settings Tab */}
				<TabsContent value="general" className="space-y-4 mt-6">
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>Manage your application preferences</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div>
									<label className="text-sm font-medium mb-2 block">Default Time Range</label>
									<Select defaultValue="7days">
										<option value="7days">Last 7 days</option>
										<option value="30days">Last 30 days</option>
										<option value="90days">Last 90 days</option>
										<option value="year">Last year</option>
									</Select>
								</div>
								<div>
									<label className="text-sm font-medium mb-2 block">Email Notifications</label>
									<div className="space-y-2">
										<label className="flex items-center gap-2 cursor-pointer">
											<input type="checkbox" className="rounded" defaultChecked />
											<span className="text-sm">Weekly summary reports</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input type="checkbox" className="rounded" defaultChecked />
											<span className="text-sm">Data sync alerts</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input type="checkbox" className="rounded" />
											<span className="text-sm">Persona mix changes</span>
										</label>
									</div>
								</div>
								<div className="pt-4 bg-muted/20 rounded-lg p-4">
									<Button variant="outline">Save Preferences</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	)
}
