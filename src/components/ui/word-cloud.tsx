import { cn } from '@/lib/utils'

interface Word {
	text: string
	value: number // Represents emotional trigger strength, will map to font size
}

interface WordCloudProps {
	words: Word[]
	minFontSize?: number
	maxFontSize?: number
}

export function WordCloud({ words, minFontSize = 14, maxFontSize = 36 }: WordCloudProps) {
	if (!words || words.length === 0) {
		return <p className="text-muted-foreground text-sm">No words available for this persona.</p>
	}

	// Normalize values to a 0-1 range
	const maxVal = Math.max(...words.map(w => w.value))
	const minVal = Math.min(...words.map(w => w.value))
	const range = maxVal - minVal || 1 // Avoid division by zero

	return (
		<div className="flex flex-wrap gap-3 justify-center items-center p-4 min-h-[120px]">
			{words.map((word, index) => {
				// Calculate font size based on normalized value
				const normalizedValue = (word.value - minVal) / range
				const fontSize = minFontSize + (normalizedValue * (maxFontSize - minFontSize))
				
				// Calculate opacity based on value (higher value = more opaque)
				const opacity = 0.6 + (normalizedValue * 0.4) // Range from 0.6 to 1.0

				return (
					<span
						key={index}
						className={cn(
							"font-semibold text-foreground transition-all duration-200 ease-in-out inline-block",
							"hover:text-primary hover:scale-110 cursor-default"
						)}
						style={{ 
							fontSize: `${fontSize}px`, 
							lineHeight: 1.2,
							opacity: opacity
						}}
						title={`Strength: ${word.value}`}
					>
						{word.text}
					</span>
				)
			})}
		</div>
	)
}
