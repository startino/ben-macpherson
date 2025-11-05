import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Zap } from 'lucide-react'
import surveyAutomation from '@/data/mock/surveyAutomation.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

export default function Surveys() {
	const [surveyOpen, setSurveyOpen] = useState(false)
	const { workflows, recentSurveys, automationStats } = surveyAutomation as any

	return (
		<section className="grid gap-6">
			<div className="flex items-end justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Survey Automation</h2>
					<p className="mt-1 text-sm text-muted-foreground">Fully automated survey sending and building</p>
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
		</section>
	)
}


