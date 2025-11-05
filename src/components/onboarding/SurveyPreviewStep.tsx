import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircle2, Mail, ShoppingBag } from 'lucide-react'

interface SurveyPreviewStepProps {
	onNext: () => void
	onBack: () => void
}

const mockSurvey = {
	title: 'Customer Insights Survey',
	description: 'Help us understand your preferences and shopping behavior',
	questions: [
		{
			id: 1,
			question: 'What motivates your purchase decisions most?',
			type: 'multiple-choice',
			options: ['Quality and craftsmanship', 'Price and value', 'Brand reputation', 'Trend and style'],
		},
		{
			id: 2,
			question: 'Which products are you most interested in?',
			type: 'multiple-choice',
			options: ['Premium basics', 'Limited edition items', 'Sustainable options', 'Accessories'],
		},
		{
			id: 3,
			question: 'How do you prefer to discover new brands?',
			type: 'multiple-choice',
			options: ['Social media', 'Influencer recommendations', 'Search engines', 'Word of mouth'],
		},
		{
			id: 4,
			question: 'What values are important to you when shopping?',
			type: 'multiple-choice',
			options: ['Sustainability', 'Ethical production', 'Local sourcing', 'Innovation'],
		},
	],
}

export function SurveyPreviewStep({ onNext, onBack }: SurveyPreviewStepProps) {
	const [selectedPlatforms, setSelectedPlatforms] = useState<{ shopify: boolean; email: boolean }>({
		shopify: false,
		email: false,
	})
	const [isLaunching, setIsLaunching] = useState(false)
	const [launched, setLaunched] = useState(false)

	function handlePlatformToggle(platform: 'shopify' | 'email') {
		setSelectedPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }))
	}

	async function handleLaunch() {
		if (!selectedPlatforms.shopify && !selectedPlatforms.email) {
			return
		}
		setIsLaunching(true)
		// Simulate campaign launch
		setTimeout(() => {
			setIsLaunching(false)
			setLaunched(true)
			setTimeout(() => {
				onNext()
			}, 2000)
		}, 2000)
	}

	if (launched) {
		return (
			<div className="mx-auto max-w-2xl">
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<CheckCircle2 className="mb-4 h-16 w-16 text-emerald-500" />
						<h3 className="mb-2 text-xl font-semibold">Survey Campaign Launched!</h3>
						<p className="text-center text-muted-foreground">
							Your survey has been successfully sent to customers.
						</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Survey Preview</CardTitle>
					<CardDescription>Review your generated survey before sending it to customers</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<h3 className="mb-2 font-semibold">{mockSurvey.title}</h3>
						<p className="text-sm text-muted-foreground">{mockSurvey.description}</p>
					</div>
					<div className="space-y-4">
						{mockSurvey.questions.map((q) => (
							<div key={q.id} className="rounded-lg border border-muted bg-surface p-4">
								<div className="mb-3 font-medium">{q.question}</div>
								<div className="space-y-2">
									{q.options.map((option, idx) => (
										<div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
											<div className="h-2 w-2 rounded-full bg-muted-foreground" />
											{option}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Send Survey to Customers</CardTitle>
					<CardDescription>Select where you want to send the survey</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3">
						<label className="flex cursor-pointer items-center gap-3 rounded-lg border border-muted bg-surface p-4 hover:bg-accent/50">
							<Checkbox
								checked={selectedPlatforms.shopify}
								onCheckedChange={() => handlePlatformToggle('shopify')}
							/>
							<ShoppingBag className="h-5 w-5" />
							<div className="flex-1">
								<div className="font-medium">Shopify</div>
								<div className="text-xs text-muted-foreground">Send to recent buyers via Shopify</div>
							</div>
						</label>
						<label className="flex cursor-pointer items-center gap-3 rounded-lg border border-muted bg-surface p-4 hover:bg-accent/50">
							<Checkbox
								checked={selectedPlatforms.email}
								onCheckedChange={() => handlePlatformToggle('email')}
							/>
							<Mail className="h-5 w-5" />
							<div className="flex-1">
								<div className="font-medium">Email (ESP)</div>
								<div className="text-xs text-muted-foreground">Send via your email service provider</div>
							</div>
						</label>
					</div>
					<div className="flex justify-between pt-4">
						<Button variant="outline" onClick={onBack} disabled={isLaunching}>
							Back
						</Button>
						<Button
							onClick={handleLaunch}
							disabled={(!selectedPlatforms.shopify && !selectedPlatforms.email) || isLaunching}
						>
							{isLaunching ? 'Launching...' : 'Launch Survey Campaign'}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

