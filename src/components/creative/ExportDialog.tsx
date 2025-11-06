import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, Table, Check } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { exportMetaAdsCSV, exportGoogleAdsCSV, exportCreativeBriefsPDF, downloadFile } from '@/lib/campaign-export'

interface CreativeBrief {
	id: string
	title: string
	personaId: string
	personaLabel: string
	quarter: string
	month: number
	objective: string
	targetAudience: string
	keyMessage: string
	hooks: string[]
	messagingAngles?: Array<{
		angle: string
		description: string
		rationale: string
	}>
	motivators: string[]
	blockers: string[]
	channels: string[]
	imagePrompts: string[]
	copyVariations: {
		headlines: string[]
		descriptions: string[]
		cta: string[]
	}
	successMetrics: {
		primaryKPI: string
		targetCAC: number
		targetLTV: number
		targetPayback: number
	}
	estimatedBudget: number
	status: string
}

interface ExportDialogProps {
	isOpen: boolean
	onClose: () => void
	briefs: CreativeBrief[]
}

export function ExportDialog({ isOpen, onClose, briefs }: ExportDialogProps) {
	const [exportedFormats, setExportedFormats] = useState<Set<string>>(new Set())

	const handleExport = (format: 'meta' | 'google' | 'pdf') => {
		let content: string
		let filename: string
		let mimeType: string

		switch (format) {
			case 'meta':
				content = exportMetaAdsCSV(briefs)
				filename = `meta-ads-campaign-${Date.now()}.csv`
				mimeType = 'text/csv'
				break
			case 'google':
				content = exportGoogleAdsCSV(briefs)
				filename = `google-ads-campaign-${Date.now()}.csv`
				mimeType = 'text/csv'
				break
			case 'pdf':
				content = exportCreativeBriefsPDF(briefs)
				filename = `creative-briefs-${Date.now()}.txt`
				mimeType = 'text/plain'
				break
		}

		downloadFile(content, filename, mimeType)
		setExportedFormats((prev) => new Set(prev).add(format))
	}

	const handleExportAll = () => {
		handleExport('meta')
		handleExport('google')
		handleExport('pdf')
	}

	const exportOptions = [
		{
			id: 'meta',
			title: 'Meta Ads Campaign',
			description: 'CSV format ready for Meta Ads Manager import',
			icon: Table,
			includes: ['Campaign structure', 'Ad sets by persona', 'Ad variations', 'Budget allocation'],
		},
		{
			id: 'google',
			title: 'Google Ads Campaign',
			description: 'CSV format for Google Ads responsive search ads',
			icon: Table,
			includes: ['Campaign structure', 'Ad groups by persona', 'RSA variations', 'Budget settings'],
		},
		{
			id: 'pdf',
			title: 'Creative Briefs Document',
			description: 'Formatted text document with all brief details',
			icon: FileText,
			includes: ['Complete briefs', 'Messaging angles', 'Image prompts', 'Success metrics'],
		},
	]

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
				<SheetHeader className="mb-6">
					<SheetTitle>Export Creative Roadmap</SheetTitle>
					<SheetDescription>
						Download campaign files ready for Meta Ads, Google Ads, or share briefs with your team
					</SheetDescription>
				</SheetHeader>

				<div className="space-y-4">
					<div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
						<div>
							<div className="font-medium">Ready to export</div>
							<div className="text-sm text-muted-foreground">
								{briefs.length} creative {briefs.length === 1 ? 'brief' : 'briefs'} selected
							</div>
						</div>
						<Button onClick={handleExportAll}>
							<Download className="mr-2 h-4 w-4" />
							Export All
						</Button>
					</div>

					<div className="space-y-3">
						{exportOptions.map((option) => {
							const Icon = option.icon
							const isExported = exportedFormats.has(option.id)

							return (
								<Card key={option.id}>
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between">
											<div className="flex gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
													<Icon className="h-5 w-5 text-primary" />
												</div>
												<div>
													<CardTitle className="text-base">{option.title}</CardTitle>
													<CardDescription className="text-xs">{option.description}</CardDescription>
												</div>
											</div>
											{isExported && (
												<Badge variant="success" className="ml-2">
													<Check className="mr-1 h-3 w-3" />
													Exported
												</Badge>
											)}
										</div>
									</CardHeader>
									<CardContent className="space-y-3">
										<div>
											<div className="mb-2 text-xs font-medium text-muted-foreground">
												Includes:
											</div>
											<div className="flex flex-wrap gap-1.5">
												{option.includes.map((item, i) => (
													<Badge key={i} variant="outline" className="text-xs">
														{item}
													</Badge>
												))}
											</div>
										</div>
										<Button
											variant={isExported ? 'outline' : 'default'}
											size="sm"
											onClick={() => handleExport(option.id as 'meta' | 'google' | 'pdf')}
											className="w-full"
										>
											<Download className="mr-2 h-4 w-4" />
											{isExported ? 'Export Again' : 'Export'}
										</Button>
									</CardContent>
								</Card>
							)
						})}
					</div>

					<div className="rounded-lg border bg-muted/30 p-4">
						<h4 className="mb-2 text-sm font-medium">Next Steps</h4>
						<ol className="space-y-2 text-sm text-muted-foreground">
							<li className="flex gap-2">
								<span className="font-medium">1.</span>
								<span>Import CSV files directly into Meta Ads Manager or Google Ads</span>
							</li>
							<li className="flex gap-2">
								<span className="font-medium">2.</span>
								<span>Review and adjust budgets based on your account limits</span>
							</li>
							<li className="flex gap-2">
								<span className="font-medium">3.</span>
								<span>Upload creative assets matching the image prompts provided</span>
							</li>
							<li className="flex gap-2">
								<span className="font-medium">4.</span>
								<span>Launch campaigns and monitor against target metrics</span>
							</li>
						</ol>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

