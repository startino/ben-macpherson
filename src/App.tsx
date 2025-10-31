import { Outlet, Link } from 'react-router-dom'

function App() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="sticky top-0 z-40 border-b border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
					<Link to="/" className="text-lg font-semibold tracking-tight">Persona Intelligence</Link>
					<nav className="flex items-center gap-4 text-sm text-muted-foreground">
						<Link to="/inputs" className="hover:text-foreground">Inputs</Link>
						<Link to="/personas" className="hover:text-foreground">Personas</Link>
						<Link to="/creative" className="hover:text-foreground">Creative</Link>
						<Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
						<Link to="/exports" className="hover:text-foreground">Exports</Link>
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-7xl px-4 py-6">
				<Outlet />
			</main>
		</div>
	)
}

export default App
