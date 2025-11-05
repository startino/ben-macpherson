import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, DollarSign, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AIAnalysisReportStepProps {
	onComplete: () => void
}

export function AIAnalysisReportStep({ onComplete }: AIAnalysisReportStepProps) {
	const navigate = useNavigate()

	function handleComplete() {
		localStorage.setItem('onboardingCompleted', 'true')
		// Merge onboarding connections to main connections
		try {
			const onboardingConnections = localStorage.getItem('onboardingConnections')
			if (onboardingConnections) {
				localStorage.setItem('connections', onboardingConnections)
			}
		} catch {
			// Ignore
		}
		onComplete()
		navigate('/dashboard')
	}

	// Mock analysis findings based on connected data
	const findings = [
		{
			title: 'Customer Segments Identified',
			value: '4',
			description: 'Distinct personas detected from your data',
			icon: Users,
			trend: '+2 from baseline',
		},
		{
			title: 'High-Value Persona Found',
			value: '32%',
			description: 'Of customers show premium persona characteristics',
			icon: DollarSign,
			trend: 'LTV: $450 avg',
		},
		{
			title: 'Revenue Opportunity',
			value: '+18%',
			description: 'Potential profit increase by shifting mix',
			icon: TrendingUp,
			trend: 'Based on persona analysis',
		},
	]

	const keyInsights = [
		{
			title: 'Top Performing Segment',
			description: 'Aspirational Aesthete persona shows highest LTV and lowest CAC payback',
			metric: 'LTV: $520 | Payback: 28 days',
		},
		{
			title: 'Optimization Opportunity',
			description: 'Shifting 10% budget from low-value to high-value persona could increase profit by $12K/month',
			metric: 'Projected impact',
		},
		{
			title: 'Survey Ready',
			description: 'Survey generated and ready to capture psychographics and product affinities',
			metric: '4 questions optimized',
		},
	]

	return (
		<div className="mx-auto max-w-4xl space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>AI Analysis Report</CardTitle>
					<CardDescription>
						Key findings from your connected data sources and persona intelligence analysis
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						{findings.map((finding, idx) => {
							const Icon = finding.icon
							return (
								<div key={idx} className="rounded-lg border border-muted bg-surface p-4">
									<div className="mb-3 flex items-center gap-2">
										<Icon className="h-5 w-5 text-primary" />
										<div className="text-xs font-medium text-muted-foreground">{finding.title}</div>
									</div>
									<div className="mb-1 text-2xl font-bold">{finding.value}</div>
									<div className="mb-2 text-xs text-muted-foreground">{finding.description}</div>
									<Badge variant="outline" className="text-xs">
										{finding.trend}
									</Badge>
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Key Insights</CardTitle>
					<CardDescription>AI-powered recommendations based on your data</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{keyInsights.map((insight, idx) => (
						<div key={idx} className="rounded-lg border border-muted bg-surface p-4">
							<div className="flex items-start gap-3">
								<CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
								<div className="flex-1">
									<div className="mb-1 font-medium">{insight.title}</div>
									<p className="mb-2 text-sm text-muted-foreground">{insight.description}</p>
									<Badge variant="outline" className="text-xs">
										{insight.metric}
									</Badge>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button size="lg" onClick={handleComplete}>
					Complete Onboarding
				</Button>
			</div>
		</div>
	)
}

