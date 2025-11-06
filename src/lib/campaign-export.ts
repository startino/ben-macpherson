interface CreativeBrief {
	id: string
	personaId: string
	personaLabel: string
	quarter: string
	month: number
	title: string
	objective: string
	targetAudience: string
	keyMessage: string
	hooks: string[]
	copyVariations: {
		headlines: string[]
		descriptions: string[]
		cta: string[]
	}
	imagePrompts: string[]
	estimatedBudget: number
	successMetrics: {
		primaryKPI: string
		targetCAC: number
		targetLTV: number
		targetPayback: number
	}
}

export function exportMetaAdsCSV(briefs: CreativeBrief[]): string {
	const headers = [
		'Campaign Name',
		'Ad Set Name',
		'Ad Name',
		'Persona',
		'Objective',
		'Daily Budget',
		'Headline',
		'Primary Text',
		'Description',
		'Call to Action',
		'Image Prompt',
		'Target CAC',
		'Target LTV',
	]

	const rows: string[][] = [headers]

	briefs.forEach((brief) => {
		const campaignName = `${brief.quarter} - ${brief.title}`
		const adSetName = `${brief.personaLabel} - ${brief.month}/${new Date().getFullYear()}`
		const dailyBudget = Math.round(brief.estimatedBudget / 30)

		// Create variations by combining different headlines, descriptions, and CTAs
		const maxVariations = Math.min(
			brief.copyVariations.headlines.length,
			brief.copyVariations.descriptions.length,
			brief.hooks.length
		)

		for (let i = 0; i < maxVariations; i++) {
			const adName = `${brief.title} - Var ${i + 1}`
			const headline = brief.copyVariations.headlines[i % brief.copyVariations.headlines.length]
			const primaryText = brief.hooks[i % brief.hooks.length]
			const description = brief.copyVariations.descriptions[i % brief.copyVariations.descriptions.length]
			const cta = brief.copyVariations.cta[i % brief.copyVariations.cta.length]
			const imagePrompt = brief.imagePrompts[i % brief.imagePrompts.length]

			rows.push([
				campaignName,
				adSetName,
				adName,
				brief.personaLabel,
				brief.objective,
				dailyBudget.toString(),
				headline,
				primaryText,
				description,
				cta,
				imagePrompt,
				`$${brief.successMetrics.targetCAC}`,
				`$${brief.successMetrics.targetLTV}`,
			])
		}
	})

	return rows.map((row) => row.map(escapeCSVField).join(',')).join('\n')
}

export function exportGoogleAdsCSV(briefs: CreativeBrief[]): string {
	const headers = [
		'Campaign',
		'Ad Group',
		'Ad Type',
		'Persona',
		'Daily Budget',
		'Headline 1',
		'Headline 2',
		'Headline 3',
		'Description 1',
		'Description 2',
		'Final URL',
		'Path 1',
		'Path 2',
		'Target CAC',
		'Target LTV',
	]

	const rows: string[][] = [headers]

	briefs.forEach((brief) => {
		const campaignName = `${brief.quarter} - ${brief.title}`
		const adGroupName = `${brief.personaLabel} - ${brief.month}/${new Date().getFullYear()}`
		const dailyBudget = Math.round(brief.estimatedBudget / 30)

		// Create responsive search ads with multiple headline and description combinations
		const maxAds = 3 // Create 3 ad variations per brief

		for (let i = 0; i < maxAds; i++) {
			const headlines = brief.copyVariations.headlines.slice(i * 3, i * 3 + 3)
			const descriptions = brief.copyVariations.descriptions.slice(i * 2, i * 2 + 2)

			// Pad if needed
			while (headlines.length < 3) {
				headlines.push(brief.copyVariations.headlines[0])
			}
			while (descriptions.length < 2) {
				descriptions.push(brief.copyVariations.descriptions[0])
			}

			rows.push([
				campaignName,
				adGroupName,
				'Responsive Search Ad',
				brief.personaLabel,
				dailyBudget.toString(),
				headlines[0],
				headlines[1],
				headlines[2],
				descriptions[0],
				descriptions[1],
				'https://yourbrand.com',
				brief.personaId,
				brief.quarter.toLowerCase(),
				`$${brief.successMetrics.targetCAC}`,
				`$${brief.successMetrics.targetLTV}`,
			])
		}
	})

	return rows.map((row) => row.map(escapeCSVField).join(',')).join('\n')
}

export function exportCreativeBriefsPDF(briefs: CreativeBrief[]): string {
	// For MVP, return formatted text that can be copied
	// In production, this would generate actual PDF using a library like jsPDF or PDFKit
	
	let content = '# Creative Briefs - Export\n\n'
	content += `Generated: ${new Date().toLocaleDateString()}\n\n`
	content += '---\n\n'

	briefs.forEach((brief, index) => {
		content += `## ${index + 1}. ${brief.title}\n\n`
		content += `**Persona:** ${brief.personaLabel}\n`
		content += `**Quarter:** ${brief.quarter} - Month ${brief.month}\n`
		content += `**Budget:** $${brief.estimatedBudget.toLocaleString()}\n\n`
		
		content += `### Objective\n${brief.objective}\n\n`
		
		content += `### Target Audience\n${brief.targetAudience}\n\n`
		
		content += `### Key Message\n${brief.keyMessage}\n\n`
		
		content += `### Hooks\n`
		brief.hooks.forEach((hook) => {
			content += `- ${hook}\n`
		})
		content += '\n'
		
		content += `### Messaging Angles\n`
		if ('messagingAngles' in brief && Array.isArray(brief.messagingAngles)) {
			brief.messagingAngles.forEach((angle) => {
				content += `**${angle.angle}**\n`
				content += `- ${angle.description}\n`
				content += `- Rationale: ${angle.rationale}\n\n`
			})
		}
		
		content += `### Copy Variations\n`
		content += `**Headlines:**\n`
		brief.copyVariations.headlines.forEach((h) => {
			content += `- ${h}\n`
		})
		content += `\n**Descriptions:**\n`
		brief.copyVariations.descriptions.forEach((d) => {
			content += `- ${d}\n`
		})
		content += `\n**CTAs:**\n`
		brief.copyVariations.cta.forEach((c) => {
			content += `- ${c}\n`
		})
		content += '\n'
		
		content += `### Image Prompts\n`
		brief.imagePrompts.forEach((prompt, i) => {
			content += `${i + 1}. ${prompt}\n`
		})
		content += '\n'
		
		content += `### Success Metrics\n`
		content += `- Primary KPI: ${brief.successMetrics.primaryKPI}\n`
		content += `- Target CAC: $${brief.successMetrics.targetCAC}\n`
		content += `- Target LTV: $${brief.successMetrics.targetLTV}\n`
		content += `- Target Payback: ${brief.successMetrics.targetPayback} days\n\n`
		
		content += '---\n\n'
	})

	return content
}

export function downloadFile(content: string, filename: string, mimeType: string) {
	const blob = new Blob([content], { type: mimeType })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

function escapeCSVField(field: string): string {
	if (field.includes(',') || field.includes('"') || field.includes('\n')) {
		return `"${field.replace(/"/g, '""')}"`
	}
	return field
}

