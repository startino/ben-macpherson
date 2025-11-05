import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface AISurveyGenerationStepProps {
	onComplete: () => void
}

export function AISurveyGenerationStep({ onComplete }: AISurveyGenerationStepProps) {
	const [progress, setProgress] = useState(0)
	const [status, setStatus] = useState('Analyzing your data connections...')

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					setTimeout(() => {
						onComplete()
					}, 500)
					return 100
				}
				return prev + 10
			})
		}, 300)

		const statusMessages = [
			'Analyzing your data connections...',
			'Identifying customer segments...',
			'Generating survey questions...',
			'Optimizing for psychographics and affinities...',
			'Finalizing survey...',
		]

		let statusIndex = 0
		const statusInterval = setInterval(() => {
			if (statusIndex < statusMessages.length - 1) {
				statusIndex++
				setStatus(statusMessages[statusIndex])
			}
		}, 800)

		return () => {
			clearInterval(interval)
			clearInterval(statusInterval)
		}
	}, [onComplete])

	return (
		<div className="mx-auto max-w-2xl">
			<Card>
				<CardHeader>
					<CardTitle>Generating Your Survey</CardTitle>
					<CardDescription>
						Our AI is creating a personalized survey based on your data connections to capture psychographics, affinities, and product intents.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-col items-center justify-center py-12">
						<Loader2 className="mb-6 h-12 w-12 animate-spin text-primary" />
						<div className="mb-4 text-center">
							<div className="mb-2 font-medium">{status}</div>
							<div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted">
								<div
									className="h-full bg-primary transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
							<div className="mt-2 text-xs text-muted-foreground">{progress}%</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

