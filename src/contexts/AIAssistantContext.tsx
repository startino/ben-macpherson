import { createContext, useContext, useState, type ReactNode } from 'react'

type AssistantPanel = 'assistant' | 'resources' | null

interface AssistantContext {
	activePanel: AssistantPanel
	isOpen: boolean
	isResourcesOpen: boolean
	contextData: string | null
	contextTitle: string | null
	openAssistant: (data?: string, title?: string) => void
	openResources: () => void
	closeAssistant: () => void
}

const AIAssistantContext = createContext<AssistantContext | undefined>(undefined)

export function AIAssistantProvider({ children }: { children: ReactNode }) {
	const [activePanel, setActivePanel] = useState<AssistantPanel>(null)
	const [contextData, setContextData] = useState<string | null>(null)
	const [contextTitle, setContextTitle] = useState<string | null>(null)

	const openAssistant = (data?: string, title?: string) => {
		if (data) setContextData(data)
		if (title) setContextTitle(title)
		setActivePanel('assistant')
	}

	const openResources = () => {
		setActivePanel('resources')
	}

	const closeAssistant = () => {
		setActivePanel(null)
		// Clear context after closing animation
		setTimeout(() => {
			setContextData(null)
			setContextTitle(null)
		}, 300)
	}

	return (
		<AIAssistantContext.Provider
			value={{
				activePanel,
				isOpen: activePanel === 'assistant',
				isResourcesOpen: activePanel === 'resources',
				contextData,
				contextTitle,
				openAssistant,
				openResources,
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

