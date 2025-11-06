import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getBasePath(): string {
	const base = import.meta.env.BASE_URL || '/'
	if (base === '/' || base === './') {
		return ''
	}
	const trimmed = base.endsWith('/') ? base.slice(0, -1) : base
	return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function getPublicUrl(path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	const basePath = getBasePath()
	if (typeof window === 'undefined') {
		return `${basePath}${normalizedPath}` || normalizedPath
	}
	return `${window.location.origin}${basePath}${normalizedPath}`
}
