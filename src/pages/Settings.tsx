import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle2, Circle, ExternalLink, Clock, RefreshCw, Zap } from 'lucide-react'
import surveyAutomation from '@/data/mock/surveyAutomation.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { Select } from '@/components/ui/select'

export default function Settings() {
	const [connected, setConnected] = useState<Record<string, boolean>>({
		Shopify: false,
		GA4: false,
		Meta: false,
		"Google Ads": false,
		Klaviyo: false,
	})
	const [surveyOpen, setSurveyOpen] = useState(false)
	const { workflows, recentSurveys, automationStats } = surveyAutomation as any

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
				<p className="mt-1 text-sm text-muted-foreground">Manage data connections, survey automation, and preferences</p>
			</div>

			<Tabs defaultValue="connections" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="connections">Data Connections</TabsTrigger>
					<TabsTrigger value="surveys">Survey Automation</TabsTrigger>
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
											<div className="flex items-center gap-3 flex-1">
												{isConnected ? (
													<CheckCircle2 className="h-5 w-5 text-emerald-500" />
												) : (
													<Circle className="h-5 w-5 text-muted-foreground" />
												)}
												<div className="flex-1">
													<div className="font-medium">{k}</div>
													{isConnected && lastSync && (
														<div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
															<Clock className="h-3 w-3" />
															Last sync: {lastSync}
														</div>
													)}
												</div>
											</div>
											<div className="flex items-center gap-2">
												{isConnected && (
													<Badge variant="outline" className="text-xs">
														<RefreshCw className="h-3 w-3 mr-1" />
														Live
													</Badge>
												)}
												<Badge variant={isConnected ? 'success' : 'outline'}>
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

				{/* Survey Automation Tab */}
				<TabsContent value="surveys" className="space-y-4 mt-6">
					<div className="flex items-end justify-between">
						<div>
							<h3 className="text-xl font-semibold">Survey Automation</h3>
							<p className="text-sm text-muted-foreground mt-1">Fully automated survey sending and building</p>
						</div>
						<Button variant="outline" onClick={() => setSurveyOpen(true)}>Launch survey</Button>
					</div>

					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Survey Automation</CardTitle>
									<CardDescription>Fully automated survey sending and building (Ben: "fully automated... sending of the emails and the surveys, the building of them")</CardDescription>
								</div>
								<Badge variant="success">
									<Zap className="h-3 w-3 mr-1" />
									{automationStats.activeWorkflows} active
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 mb-4">
								{workflows.map((workflow: any) => (
									<div key={workflow.id} className="bg-surface rounded-lg p-4">
										<div className="flex items-start justify-between mb-2">
											<div className="flex-1">
												<div className="font-medium">{workflow.name}</div>
												<div className="text-sm text-muted-foreground mt-1">
													Trigger: {workflow.trigger} • Delay: {workflow.delay}
												</div>
											</div>
											<Badge variant={workflow.status === 'active' ? 'success' : 'outline'}>
												{workflow.status}
											</Badge>
										</div>
										<div className="grid grid-cols-2 gap-3 mt-3 text-sm">
											<div>
												<div className="text-muted-foreground">Response Rate</div>
												<div className="font-semibold">{(workflow.responseRate * 100).toFixed(1)}%</div>
											</div>
											<div>
												<div className="text-muted-foreground">Total Responses</div>
												<div className="font-semibold">{workflow.totalResponses} / {workflow.totalSent}</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="bg-surface rounded-lg p-4">
								<div className="text-sm font-medium mb-2">Survey Performance</div>
								<div className="h-48 w-full">
									<ResponsiveContainer>
										<LineChart data={recentSurveys} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
											<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
											<XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
											<YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
											<Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', color: 'hsl(var(--foreground))', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }} />
											<Legend />
											<Line type="monotone" dataKey="sent" name="Surveys Sent" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))', r: 3 }} />
											<Line type="monotone" dataKey="responses" name="Responses" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 3 }} />
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>
							<div className="mt-4 grid grid-cols-3 gap-4 text-center">
								<div className="bg-surface rounded-lg p-3">
									<div className="text-xs text-muted-foreground">Total Sent</div>
									<div className="text-lg font-bold">{automationStats.totalSurveysSent.toLocaleString()}</div>
								</div>
								<div className="bg-surface rounded-lg p-3">
									<div className="text-xs text-muted-foreground">Total Responses</div>
									<div className="text-lg font-bold">{automationStats.totalResponses.toLocaleString()}</div>
								</div>
								<div className="bg-surface rounded-lg p-3">
									<div className="text-xs text-muted-foreground">Avg Response Rate</div>
									<div className="text-lg font-bold">{(automationStats.avgResponseRate * 100).toFixed(1)}%</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{surveyOpen && (
						<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm p-4">
							<Card className="w-full max-w-md">
								<CardHeader>
									<CardTitle>Survey launcher</CardTitle>
									<CardDescription>Share this link with recent buyers or send via your ESP</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="break-all rounded-md bg-muted/50 p-3 text-xs font-mono">
										https://startino.github.io/ben-macpherson/survey/demo
									</div>
									<div className="flex justify-end gap-2">
										<Button variant="outline" onClick={() => setSurveyOpen(false)}>Close</Button>
										<Button variant="default">
											<ExternalLink className="mr-2 h-4 w-4" />
											Copy link
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
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
