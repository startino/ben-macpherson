import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PersonaAvatarProps {
	personaId: string
	personaLabel: string
	size?: 'sm' | 'md' | 'lg' | 'xl'
	className?: string
}

// Generate consistent avatar colors based on persona ID
const getAvatarGradient = (personaId: string) => {
	const gradients = {
		'high-value': 'from-emerald-400 to-teal-600',
		'mid-value': 'from-blue-400 to-indigo-600',
		'low-value': 'from-amber-400 to-orange-600',
		'premium': 'from-purple-400 to-pink-600',
		'budget': 'from-rose-400 to-red-600',
	}

	return gradients[personaId as keyof typeof gradients] || 'from-gray-400 to-gray-600'
}

// Generate avatar initials from persona label
const getInitials = (label: string) => {
	const words = label.split(' ')
	if (words.length >= 2) {
		return (words[0][0] + words[1][0]).toUpperCase()
	}
	return label.slice(0, 2).toUpperCase()
}

const sizeClasses = {
	sm: 'h-10 w-10 text-sm',
	md: 'h-16 w-16 text-lg',
	lg: 'h-24 w-24 text-2xl',
	xl: 'h-32 w-32 text-3xl',
}

export function PersonaAvatar({ personaId, personaLabel, size = 'md', className }: PersonaAvatarProps) {
	const gradient = getAvatarGradient(personaId)
	const initials = getInitials(personaLabel)

	return (
		<div
			className={cn(
				'relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-lg ring-4 ring-background',
				gradient,
				sizeClasses[size],
				className
			)}
		>
			{initials}
			{/* Optional: Add status indicator */}
			<div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
		</div>
	)
}

// Alternative version with icon-based avatars
export function PersonaAvatarIcon({ personaId, size = 'md', className }: PersonaAvatarProps) {
	const gradient = getAvatarGradient(personaId)

	return (
		<div
			className={cn(
				'relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4 ring-background',
				gradient,
				sizeClasses[size],
				className
			)}
		>
			<User className="h-1/2 w-1/2 text-white" />
			<div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
		</div>
	)
}

