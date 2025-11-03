import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from './button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
	const { toggle } = useTheme()

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggle}
			className={cn('relative transition-all duration-300', className)}
			aria-label="Toggle theme"
		>
			<Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	)
}

