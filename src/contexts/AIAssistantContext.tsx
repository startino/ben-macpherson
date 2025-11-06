import { createContext, useContext, useState, type ReactNode } from 'react'

interface AssistantContext {
	isOpen: boolean
	contextData: string | null
	contextTitle: string | null
	openAssistant: (data?: string, title?: string) => void
	closeAssistant: () => void
}

const AIAssistantContext = createContext<AssistantContext | undefined>(undefined)

export function AIAssistantProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)
	const [contextData, setContextData] = useState<string | null>(null)
	const [contextTitle, setContextTitle] = useState<string | null>(null)

	const openAssistant = (data?: string, title?: string) => {
		if (data) setContextData(data)
		if (title) setContextTitle(title)
		setIsOpen(true)
	}

	const closeAssistant = () => {
		setIsOpen(false)
		// Clear context after closing animation
		setTimeout(() => {
			setContextData(null)
			setContextTitle(null)
		}, 300)
	}

	return (
		<AIAssistantContext.Provider
			value={{
				isOpen,
				contextData,
				contextTitle,
				openAssistant,
				closeAssistant,
			}}
		>
			{children}
		</AIAssistantContext.Provider>
	)
}

export function useAIAssistant() {
	const context = useContext(AIAssistantContext)
	if (!context) {
		throw new Error('useAIAssistant must be used within AIAssistantProvider')
	}
	return context
}

