import personas from '@/data/mock/personas.json'
import { downloadCSV, downloadJSON } from '@/lib/export'

export default function Exports() {
	function exportTargetMix() {
		try {
			const saved = localStorage.getItem('targetMix')
			if (!saved) return
			const obj = JSON.parse(saved)
			const rows = Object.entries(obj).map(([personaId, share]) => ({ personaId, targetShare: share }))
			downloadCSV('target_mix.csv', rows as any)
		} catch {}
	}
	return (
		<section className="grid gap-6">
			<h2 className="text-xl font-semibold">Exports</h2>
			<div className="flex flex-wrap gap-3">
				<button className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent/30" onClick={() => downloadJSON('personas.json', personas)}>Personas (JSON)</button>
				<button className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent/30" onClick={() => downloadCSV('personas.csv', personas as any)}>Personas (CSV)</button>
				<button className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent/30" onClick={exportTargetMix}>Target Mix (CSV)</button>
			</div>
		</section>
	)
}
