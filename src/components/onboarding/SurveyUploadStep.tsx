import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, X } from 'lucide-react'

interface SurveyUploadStepProps {
	onNext: () => void
	onSkip: () => void
	uploadedFile: File | null
	onFileChange: (file: File | null) => void
}

export function SurveyUploadStep({ onNext, onSkip, uploadedFile, onFileChange }: SurveyUploadStepProps) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0] || null
		onFileChange(file)
	}

	function handleRemoveFile() {
		onFileChange(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	function handleUploadClick() {
		fileInputRef.current?.click()
	}

	return (
		<div className="mx-auto max-w-2xl">
			<Card>
				<CardHeader>
					<CardTitle>Upload Previous Survey Results</CardTitle>
					<CardDescription>
						If you have existing survey results, upload them here. This step is optional - you can skip to generate a new survey.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<input
						ref={fileInputRef}
						type="file"
						accept=".csv,.json,.xlsx"
						onChange={handleFileSelect}
						className="hidden"
					/>
					{!uploadedFile ? (
						<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center">
							<Upload className="mb-4 h-12 w-12 text-muted-foreground" />
							<h3 className="mb-2 text-lg font-semibold">Upload survey results</h3>
							<p className="mb-4 text-sm text-muted-foreground">
								Supported formats: CSV, JSON, XLSX
							</p>
							<Button variant="outline" onClick={handleUploadClick}>
								Select File
							</Button>
						</div>
					) : (
						<div className="rounded-lg border border-muted bg-surface p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<FileText className="h-5 w-5 text-primary" />
									<div>
										<div className="font-medium">{uploadedFile.name}</div>
										<div className="text-xs text-muted-foreground">
											{(uploadedFile.size / 1024).toFixed(2)} KB
										</div>
									</div>
								</div>
								<Button variant="ghost" size="icon" onClick={handleRemoveFile}>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
					<div className="flex justify-between">
						<Button variant="outline" onClick={onSkip}>
							Skip
						</Button>
						<Button onClick={onNext} disabled={!uploadedFile}>
							Continue
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

