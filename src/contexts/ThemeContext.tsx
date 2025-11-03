import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggle: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('theme') as Theme | null
			if (saved) return saved
			// Default to dark mode if no preference
			return 'dark'
		}
		return 'dark'
	})

	useEffect(() => {
		const root = document.documentElement
		if (theme === 'dark') {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme)
	}

	const toggle = () => {
		setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggle }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

