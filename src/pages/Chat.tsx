import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
	id: string
	role: 'user' | 'assistant'
	content: string
	timestamp: Date
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			role: 'assistant',
			content: "Hi! I'm your AI persona intelligence assistant. I have access to all your connected data sources, survey results, and analytics. How can I help you today?",
			timestamp: new Date(),
		},
	])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	function handleSend() {
		if (!input.trim() || isLoading) return

		const userMessage: Message = {
			id: Date.now().toString(),
			role: 'user',
			content: input.trim(),
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInput('')
		setIsLoading(true)

		// Simulate AI response (in production, this would call an API)
		setTimeout(() => {
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: generateMockResponse(userMessage.content),
				timestamp: new Date(),
			}
			setMessages((prev) => [...prev, assistantMessage])
			setIsLoading(false)
		}, 1000 + Math.random() * 1000)
	}

	function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	function generateMockResponse(userInput: string): string {
		const lowerInput = userInput.toLowerCase()

		// Context-aware responses based on keywords
		if (lowerInput.includes('persona') || lowerInput.includes('segment')) {
			return "Based on your connected data sources, I can see you have 4 distinct customer personas identified:\n\n1. **Aspirational Aesthete** - 32% of customers, highest LTV ($520), 28-day payback\n2. **Value Seeker** - 28% of customers, moderate LTV ($380), 35-day payback\n3. **Trend Follower** - 25% of customers, lower LTV ($290), 42-day payback\n4. **Quality Loyalist** - 15% of customers, high LTV ($450), 30-day payback\n\nWould you like me to analyze which persona mix would optimize your profitability?"
		}

		if (lowerInput.includes('profit') || lowerInput.includes('profitability') || lowerInput.includes('revenue')) {
			return "Looking at your revenue health data:\n\n- **Current Sales**: $125K (up 12% vs last week)\n- **Contribution Margin**: $88K (up 8%)\n- **CAC**: $45 (down 25% - excellent efficiency!)\n- **New Customers**: 1,240 (up 15%)\n\nYour profit trend is positive. The Aspirational Aesthete persona is driving the most profit per customer. I'd recommend shifting 5-10% more budget toward this segment to maximize ROI."
		}

		if (lowerInput.includes('survey') || lowerInput.includes('response')) {
			return "Your survey automation is performing well:\n\n- **Response Rate**: 32% (above industry average of 25%)\n- **Total Responses**: 1,847\n- **Active Workflows**: 3\n\nSurvey responses are showing strong psychographic signals that align with your persona clustering. The qualitative data (product preferences, values, discovery channels) is reinforcing the quantitative segments we identified from purchase behavior."
		}

		if (lowerInput.includes('cac') || lowerInput.includes('acquisition') || lowerInput.includes('spend')) {
			return "Your acquisition efficiency is improving:\n\n- **CAC**: $45 (down 25% this week)\n- **CAC Payback**: Averaging 32 days across personas\n- **Best Performing**: Aspirational Aesthete at 28 days\n- **Recommendation**: Shift budget from Trend Follower (42-day payback) to Aspirational Aesthete to improve overall payback period."
		}

		if (lowerInput.includes('ltv') || lowerInput.includes('lifetime value')) {
			return "LTV Analysis by Persona:\n\n- **Aspirational Aesthete**: $520 (highest)\n- **Quality Loyalist**: $450\n- **Value Seeker**: $380\n- **Trend Follower**: $290 (lowest)\n\nYour average LTV is $410. The Aspirational Aesthete persona shows the best LTV:CAC ratio (11.5:1). Consider creating persona-specific retention campaigns to maximize lifetime value."
		}

		if (lowerInput.includes('creative') || lowerInput.includes('messaging') || lowerInput.includes('ad')) {
			return "Based on your persona data, here are creative recommendations:\n\n**Aspirational Aesthete**: Focus on premium aesthetics, craftsmanship, and aspirational lifestyle. Use high-quality visuals and emphasize exclusivity.\n\n**Value Seeker**: Highlight value proposition, quality-to-price ratio, and practical benefits.\n\n**Trend Follower**: Emphasize trendiness, social proof, and what's currently popular.\n\n**Quality Loyalist**: Focus on durability, quality, and brand heritage.\n\nWould you like me to generate specific creative briefs for any persona?"
		}

		if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
			return "I can help you with:\n\n🔍 **Data Analysis**: Analyze your connected data sources (Shopify, GA4, Meta, Google Ads, Klaviyo)\n\n👥 **Persona Intelligence**: Insights on customer segments, LTV, CAC, and persona mix optimization\n\n📊 **Performance Metrics**: Revenue health, profitability trends, acquisition efficiency\n\n📝 **Survey Insights**: Analyze survey responses and psychographic data\n\n💡 **Strategic Recommendations**: Budget allocation, creative briefs, targeting strategies\n\n📈 **Forecasting**: Projected impact of persona mix changes\n\nJust ask me anything about your data!"
		}

		// Default response
		return "I understand you're asking about: \"" + userInput + "\". Let me analyze your connected data sources to provide you with specific insights. I can help you with persona analysis, profitability optimization, survey insights, CAC/LTV analysis, creative recommendations, or strategic planning. What would you like to dive deeper into?"
	}

	return (
		<section className="flex h-[calc(100vh-8rem)] flex-col">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Your persona intelligence expert with access to all your data
				</p>
			</div>

			<Card className="flex flex-1 flex-col overflow-hidden">
				<CardContent className="flex flex-1 flex-col p-0">
					{/* Messages Area */}
					<div className="flex-1 overflow-y-auto p-6 space-y-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex gap-3 ${
									message.role === 'user' ? 'justify-end' : 'justify-start'
								}`}
							>
								{message.role === 'assistant' && (
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
										<Bot className="h-4 w-4 text-primary-foreground" />
									</div>
								)}
								<div
									className={`flex max-w-[80%] flex-col gap-1 ${
										message.role === 'user' ? 'items-end' : 'items-start'
									}`}
								>
									<div
										className={`rounded-lg px-4 py-2.5 ${
											message.role === 'user'
												? 'bg-primary text-primary-foreground'
												: 'bg-muted text-foreground'
										}`}
									>
										<div className="whitespace-pre-wrap text-sm leading-relaxed">
											{message.content}
										</div>
									</div>
									<div className="text-xs text-muted-foreground">
										{message.timestamp.toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</div>
								</div>
								{message.role === 'user' && (
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
										<User className="h-4 w-4 text-muted-foreground" />
									</div>
								)}
							</div>
						))}
						{isLoading && (
							<div className="flex gap-3 justify-start">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
									<Bot className="h-4 w-4 text-primary-foreground" />
								</div>
								<div className="flex max-w-[80%] flex-col gap-1 items-start">
									<div className="rounded-lg bg-muted px-4 py-2.5">
										<div className="flex items-center gap-2">
											<Sparkles className="h-4 w-4 animate-pulse text-primary" />
											<span className="text-sm text-muted-foreground">Thinking...</span>
										</div>
									</div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input Area */}
					<div className="border-t border-muted bg-surface p-4">
						<div className="flex gap-2">
							<Input
								ref={inputRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Ask me anything about your data, personas, or performance..."
								disabled={isLoading}
								className="flex-1"
							/>
							<Button
								onClick={handleSend}
								disabled={!input.trim() || isLoading}
								size="icon"
							>
								<Send className="h-4 w-4" />
							</Button>
						</div>
						<p className="mt-2 text-xs text-muted-foreground">
							AI has access to all your connected data sources and can provide insights on personas, profitability, surveys, and more.
						</p>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}

