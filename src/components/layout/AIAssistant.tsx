import { useState, useRef, useEffect } from 'react'
import { useAIAssistant } from '@/contexts/AIAssistantContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
	Sparkles,
	Send,
	BarChart3,
	TrendingUp,
	Users,
	ShoppingBag,
	Plus,
	ExternalLink,
	X,
	NotebookPen,
	BookOpen,
	LifeBuoy,
	MessageCircle,
	Stethoscope,
	ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
	role: 'user' | 'assistant'
	content: string
	timestamp: Date
}

const NAV_ITEMS = [
	{ label: 'PostHog AI', icon: Sparkles, isPrimary: true },
	{ label: 'Notebooks', icon: NotebookPen },
	{ label: 'Docs', icon: BookOpen },
	{ label: 'Help', icon: LifeBuoy },
	{ label: 'Discussion', icon: MessageCircle },
	{ label: 'SDK Doctor', icon: Stethoscope },
]

const SUGGESTED_PROMPTS = [
	{ icon: BarChart3, text: 'Analyze performance trends', category: 'Analytics' },
	{ icon: TrendingUp, text: 'Optimize persona mix', category: 'Strategy' },
	{ icon: Users, text: 'Generate creative briefs', category: 'Creative' },
	{ icon: ShoppingBag, text: 'Review product performance', category: 'Insights' },
]

const RECENT_CHATS = [
	{ title: 'Why is CAC trending up?', time: '2h ago' },
	{ title: 'Creative strategy for High-Value Persona', time: '1d ago' },
	{ title: 'Revenue breakdown by persona', time: '3d ago' },
]

export function AIAssistant() {
	const { activePanel, closeAssistant, contextData, contextTitle } = useAIAssistant()
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	// Pre-populate with context when opened
	useEffect(() => {
		if (activePanel === 'assistant' && contextData && messages.length === 0) {
			setInput(`Regarding ${contextTitle || 'this data'}: `)
		}
	}, [activePanel, contextData, contextTitle, messages.length])

	const handleSend = async () => {
		if (!input.trim()) return

		const userMessage: Message = {
			role: 'user',
			content: input,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInput('')
		setIsLoading(true)

		// Simulate AI response (replace with actual API call)
		setTimeout(() => {
			const assistantMessage: Message = {
				role: 'assistant',
				content: generateMockResponse(input, contextData),
				timestamp: new Date(),
			}
			setMessages((prev) => [...prev, assistantMessage])
			setIsLoading(false)
		}, 1500)
	}

	const handlePromptClick = (prompt: string) => {
		setInput(prompt)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const isEmpty = messages.length === 0

	if (activePanel !== 'assistant') return null

	return (
		<div className="fixed right-0 top-0 z-40 flex h-screen w-[420px] border-l border-border/40 bg-background/95 shadow-[0_-24px_60px_rgba(0,0,0,0.45)] backdrop-blur">
			<nav className="flex w-16 flex-col items-center gap-4 border-r border-border/40 bg-background/90 px-2 py-6">
				{NAV_ITEMS.map(({ icon: Icon, label, isPrimary }) => (
					<button
						key={label}
						title={label}
						className={cn(
							'flex h-12 w-12 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition-colors',
							isPrimary ? 'border-border/70 bg-primary/10 text-primary' : 'hover:border-border/60 hover:bg-secondary/70 hover:text-foreground'
						)}
					>
						<Icon className="h-5 w-5" />
					</button>
				))}
			</nav>
			<div className="flex flex-1 flex-col">
				<header className="flex items-center justify-between border-b border-border/40 px-6 py-4">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<h2 className="text-sm font-semibold text-foreground">PostHog AI</h2>
							<Badge variant="secondary" className="rounded-full bg-primary/10 px-2 text-[10px] font-semibold uppercase tracking-wide text-primary">
								Beta
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground/80">How can I help you build?</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="rounded-full border border-border/40">
							<Plus className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full border border-border/40">
							<ExternalLink className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full border border-border/40" onClick={closeAssistant}>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</header>
				<div className="flex flex-1 flex-col">
					<div className="flex-1 overflow-y-auto px-8 py-6">
						<div className="space-y-8">
							{isEmpty ? (
								<section className="space-y-6">
									<div className="space-y-2 text-center">
										<h3 className="text-lg font-semibold text-foreground">How can I help you build?</h3>
										<p className="text-sm text-muted-foreground/80">
											Max is now part of PostHog. Ask a question or try one of these tools.
										</p>
									</div>
									<div className="rounded-2xl border border-border/40 bg-secondary/40 p-4">
										<div className="flex items-center justify-between">
											<Button
												variant="ghost"
												size="sm"
												className="flex items-center gap-2 rounded-full border border-border/40 px-3 text-xs text-muted-foreground"
											>
												<span>Add context</span>
												<ChevronDown className="h-3 w-3" />
											</Button>
											<span className="text-xs text-muted-foreground/70">Tools: <span className="text-foreground">Query data + 4 more</span></span>
										</div>
									</div>
									<div className="space-y-3">
										<h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
											Try PostHog AI for…
										</h4>
										<div className="grid gap-2">
											{SUGGESTED_PROMPTS.map((prompt, i) => (
												<button
													key={i}
													onClick={() => handlePromptClick(prompt.text)}
													className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/80 p-3 text-left transition-colors hover:border-border/60"
												>
													<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
														<prompt.icon className="h-4 w-4 text-primary" />
													</div>
													<div className="flex-1">
														<div className="text-sm font-medium text-foreground">{prompt.text}</div>
														<div className="text-xs text-muted-foreground/80">{prompt.category}</div>
													</div>
												</button>
											))}
										</div>
									</div>
									{RECENT_CHATS.length > 0 && (
										<div className="space-y-3">
											<h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
												Recent chats
											</h4>
											<div className="space-y-2">
												{RECENT_CHATS.map((chat, i) => (
													<button
														key={i}
														className="flex w-full items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-3 py-2 text-left transition-colors hover:border-border/60"
													>
														<span className="text-sm text-foreground/90">{chat.title}</span>
														<span className="text-xs text-muted-foreground/70">{chat.time}</span>
													</button>
												))}
											</div>
										<Button variant="ghost" className="w-full rounded-full text-xs text-muted-foreground">
											View all
										</Button>
										</div>
									)}
								</section>
							) : (
								<section className="space-y-4">
									{contextData && (
										<div className="rounded-2xl border border-border/40 bg-secondary/40 p-3">
											<div className="flex items-start gap-2">
												<Badge variant="outline" className="mt-0.5 rounded-full px-3 text-[10px]">
													Context
												</Badge>
												<div className="flex-1 text-xs text-muted-foreground/80">
													{contextTitle && <div className="mb-1 font-medium text-foreground">{contextTitle}</div>}
													<div className="line-clamp-3">{contextData}</div>
												</div>
											</div>
										</div>
									)}
									{messages.map((message, i) => (
										<div
											key={i}
											className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
										>
											{message.role === 'assistant' && (
												<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-secondary/60">
													<Sparkles className="h-3.5 w-3.5 text-primary" />
												</div>
											)}
											<div
												className={cn(
													'max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm',
													message.role === 'user'
														? 'bg-primary text-primary-foreground'
														: 'border border-border/40 bg-secondary/40 text-foreground'
												)}
											>
												<p className="whitespace-pre-wrap text-sm">{message.content}</p>
												<p className="mt-1 text-[10px] text-muted-foreground/60">
													{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
												</p>
											</div>
											{message.role === 'user' && (
												<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-secondary/60 text-xs font-semibold text-foreground">
													You
												</div>
											)}
										</div>
									))}
									{isLoading && (
										<div className="flex gap-3">
											<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-secondary/60">
												<Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
											</div>
											<div className="rounded-2xl border border-border/40 bg-secondary/40 px-4 py-2.5">
												<div className="flex gap-1">
													<div className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }} />
													<div className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }} />
													<div className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }} />
												</div>
											</div>
										</div>
									)}
									<div ref={messagesEndRef} />
								</section>
							)}
						</div>
					</div>
					<footer className="border-t border-border/40 bg-background/80 px-6 py-4">
						<div className="rounded-2xl border border-border/40 bg-secondary/30 p-3">
							<div className="flex items-center gap-2">
								<Input
									placeholder="Ask away (/ for commands)"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleKeyDown}
									className="flex-1 border-none bg-transparent px-0"
								/>
								<Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon" className="rounded-full">
									<Send className="h-4 w-4" />
								</Button>
							</div>
							<p className="pt-2 text-center text-[10px] text-muted-foreground/70">
								AI can make mistakes — verify critical decisions.
							</p>
						</div>
					</footer>
				</div>
			</div>
		</div>
	)
}

// Mock response generator (replace with actual AI API)
function generateMockResponse(query: string, context: string | null): string {
	const lowerQuery = query.toLowerCase()

	if (lowerQuery.includes('cac') || lowerQuery.includes('customer acquisition')) {
		return `Based on the data, your CAC has increased by 12% over the last 30 days. The primary driver is a decrease in conversion rates on Meta, particularly for mid-value personas. I recommend:\n\n1. Review creative fatigue on existing campaigns\n2. Test persona-specific messaging angles\n3. Consider shifting budget toward high-converting personas\n\nWould you like me to generate a detailed creative brief to address this?`
	}

	if (lowerQuery.includes('persona') || lowerQuery.includes('mix')) {
		return `Your current persona mix shows opportunity for optimization. High-Value personas represent only 18% of acquisitions but deliver 45% of total profit. The mathematically optimal mix would increase their share to 32%.\n\nThis shift could increase monthly contribution margin by approximately $47K. The key is developing creative that resonates with their motivators: quality, exclusivity, and long-term value.`
	}

	if (lowerQuery.includes('creative') || lowerQuery.includes('brief')) {
		return `I can generate persona-specific creative briefs based on your survey data and competitive analysis. Each brief will include:\n\n• Messaging angles tailored to motivators/blockers\n• Hook variations for testing\n• Visual direction and image prompts\n• Channel recommendations\n• Success metrics\n\nWould you like me to create a 3-month creative roadmap for your top personas?`
	}

	if (context) {
		return `Looking at ${context}, I notice several key insights that align with D.LUX's profit-first methodology. The data suggests focusing on metrics that drive contribution margin rather than vanity metrics.\n\nWhat specific aspect would you like me to analyze further?`
	}

	return `That's an interesting question. Based on D.LUX's methodology, I'd recommend focusing on metrics that tie directly to profitability:\n\n• LTV:CAC ratio by persona\n• Contribution margin trends\n• Payback period optimization\n• Persona mix alignment\n\nCan you tell me more about what you're trying to optimize?`
}

