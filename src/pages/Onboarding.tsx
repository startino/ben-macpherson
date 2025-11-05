import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepIndicator } from '@/components/onboarding/StepIndicator'
import { DataConnectionsStep } from '@/components/onboarding/DataConnectionsStep'
import { SurveyUploadStep } from '@/components/onboarding/SurveyUploadStep'
import { AISurveyGenerationStep } from '@/components/onboarding/AISurveyGenerationStep'
import { SurveyPreviewStep } from '@/components/onboarding/SurveyPreviewStep'

const STEPS = {
	DATA_CONNECTIONS: 1,
	SURVEY_UPLOAD: 2,
	AI_SURVEY_GENERATION: 3,
	SURVEY_PREVIEW: 4,
}

const STEP_LABELS = ['Data', 'Upload', 'Generate', 'Preview']

export default function Onboarding() {
	const navigate = useNavigate()
	const [currentStep, setCurrentStep] = useState(STEPS.DATA_CONNECTIONS)
	const [connections, setConnections] = useState<Record<string, boolean>>({
		Shopify: false,
		GA4: false,
		Meta: false,
		'Google Ads': false,
		Klaviyo: false,
	})
	const [uploadedFile, setUploadedFile] = useState<File | null>(null)

	// Load saved state
	useEffect(() => {
		try {
			const savedConnections = localStorage.getItem('onboardingConnections')
			if (savedConnections) {
				setConnections(JSON.parse(savedConnections))
			}
		} catch {
			// Ignore parse errors
		}
	}, [])

	// Save connections to localStorage
	useEffect(() => {
		localStorage.setItem('onboardingConnections', JSON.stringify(connections))
	}, [connections])

	function handleNext() {
		if (currentStep === STEPS.SURVEY_UPLOAD && uploadedFile) {
			// If file uploaded, skip generation and go to preview
			setCurrentStep(STEPS.SURVEY_PREVIEW)
		} else if (currentStep < Object.keys(STEPS).length) {
			setCurrentStep((prev) => prev + 1)
		}
	}

	function handleBack() {
		if (currentStep === STEPS.SURVEY_PREVIEW && uploadedFile) {
			// If we came from upload, go back to upload step
			setCurrentStep(STEPS.SURVEY_UPLOAD)
		} else if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1)
		}
	}

	function handleCompleteOnboarding() {
		// Save onboarding completion and merge connections
		localStorage.setItem('onboardingCompleted', 'true')
		try {
			const onboardingConnections = localStorage.getItem('onboardingConnections')
			if (onboardingConnections) {
				localStorage.setItem('connections', onboardingConnections)
			}
		} catch {
			// Ignore
		}
		navigate('/dashboard')
	}

	function handleSkipUpload() {
		// Skip to AI survey generation
		setCurrentStep(STEPS.AI_SURVEY_GENERATION)
	}

	function handleSurveyGenerationComplete() {
		setCurrentStep(STEPS.SURVEY_PREVIEW)
	}

	function handleConnectionsChange(newConnections: Record<string, boolean>) {
		setConnections(newConnections)
	}

	function handleFileChange(file: File | null) {
		setUploadedFile(file)
	}

	function renderStep() {
		switch (currentStep) {
			case STEPS.DATA_CONNECTIONS:
				return (
					<DataConnectionsStep
						onNext={handleNext}
						connections={connections}
						onConnectionsChange={handleConnectionsChange}
					/>
				)
			case STEPS.SURVEY_UPLOAD:
				return (
					<SurveyUploadStep
						onNext={handleNext}
						onSkip={handleSkipUpload}
						uploadedFile={uploadedFile}
						onFileChange={handleFileChange}
					/>
				)
			case STEPS.AI_SURVEY_GENERATION:
				return <AISurveyGenerationStep onComplete={handleSurveyGenerationComplete} />
			case STEPS.SURVEY_PREVIEW:
				return <SurveyPreviewStep onNext={handleCompleteOnboarding} onBack={handleBack} />
			default:
				return null
		}
	}

	// Determine total steps and adjust step indicator based on whether file was uploaded
	const hasFileUploaded = uploadedFile !== null
	const totalSteps = hasFileUploaded ? 3 : 4
	
	// Adjust step for indicator display
	let displayStep = currentStep
	if (hasFileUploaded && currentStep >= STEPS.AI_SURVEY_GENERATION) {
		// If file uploaded, we skip AI generation, so adjust step numbers
		displayStep = currentStep === STEPS.AI_SURVEY_GENERATION ? STEPS.SURVEY_PREVIEW : currentStep - 1
	}
	
	const stepLabels = hasFileUploaded 
		? ['Data', 'Upload', 'Preview']
		: STEP_LABELS

	return (
		<div className="min-h-screen bg-background py-12 px-4">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight">Get Started</h1>
					<p className="mt-2 text-muted-foreground">
						Set up your persona intelligence system in just a few steps
					</p>
				</div>
				<StepIndicator
					currentStep={displayStep}
					totalSteps={totalSteps}
					stepLabels={stepLabels}
				/>
				{renderStep()}
			</div>
		</div>
	)
}

