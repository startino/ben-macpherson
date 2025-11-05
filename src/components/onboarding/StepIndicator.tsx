import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface StepIndicatorProps {
	currentStep: number
	totalSteps: number
	stepLabels?: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
	return (
		<div className="flex items-center justify-center gap-2 mb-8">
			{Array.from({ length: totalSteps }, (_, i) => {
				const stepNumber = i + 1
				const isCompleted = stepNumber < currentStep
				const isCurrent = stepNumber === currentStep
				
				return (
					<div key={stepNumber} className="flex items-center">
						<div className="flex flex-col items-center">
							<div
								className={cn(
									'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
									isCompleted && 'bg-primary border-primary text-primary-foreground',
									isCurrent && 'border-primary bg-primary text-primary-foreground',
									!isCompleted && !isCurrent && 'border-muted-foreground bg-surface text-muted-foreground'
								)}
							>
								{isCompleted ? (
									<Check className="h-5 w-5" />
								) : (
									<span className="text-sm font-medium">{stepNumber}</span>
								)}
							</div>
							{stepLabels && stepLabels[i] && (
								<span className={cn(
									'mt-2 text-xs text-center max-w-[100px]',
									isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
								)}>
									{stepLabels[i]}
								</span>
							)}
						</div>
						{stepNumber < totalSteps && (
							<div
								className={cn(
									'mx-2 h-0.5 w-12 transition-all',
									isCompleted ? 'bg-primary' : 'bg-muted'
								)}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}

