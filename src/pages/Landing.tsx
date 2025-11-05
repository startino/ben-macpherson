import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, TrendingUp, Zap } from 'lucide-react'

export default function Landing() {
	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="mx-auto max-w-4xl text-center">
				<h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
					Identify Your Highest-Value Customers
				</h1>
				<p className="mt-6 text-xl text-muted-foreground md:text-2xl">
					Less time in spreadsheets and reports, more profit from the right buyers
				</p>
				<p className="mt-4 text-base text-muted-foreground md:text-lg">
					Persona intelligence for DTC brands. Stop wasting media on low-value cohorts and start targeting the customers that drive profit.
				</p>
				<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button size="lg" className="text-base" asChild>
						<Link to="/onboarding">
							Get Started
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
					<Button size="lg" variant="outline" className="text-base" asChild>
						<Link to="/dashboard">
							View Demo
						</Link>
					</Button>
				</div>
				<div className="mt-16 grid gap-6 sm:grid-cols-3">
					<div className="flex flex-col items-center gap-3">
						<div className="rounded-full bg-surface p-4">
							<Users className="h-6 w-6 text-primary" />
						</div>
						<h3 className="font-semibold">Persona Intelligence</h3>
						<p className="text-sm text-muted-foreground">
							Cluster customers by value and survey signals to identify actionable personas
						</p>
					</div>
					<div className="flex flex-col items-center gap-3">
						<div className="rounded-full bg-surface p-4">
							<TrendingUp className="h-6 w-6 text-primary" />
						</div>
						<h3 className="font-semibold">Real-Time Tracking</h3>
						<p className="text-sm text-muted-foreground">
							Track persona mix over time, profitability bridge, and CAC payback by persona
						</p>
					</div>
					<div className="flex flex-col items-center gap-3">
						<div className="rounded-full bg-surface p-4">
							<Zap className="h-6 w-6 text-primary" />
						</div>
						<h3 className="font-semibold">Creative System</h3>
						<p className="text-sm text-muted-foreground">
							Generate persona-specific creative briefs and messaging to shift spend toward profitable customers
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
