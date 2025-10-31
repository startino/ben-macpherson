import Papa from 'papaparse'

export function downloadJSON(filename: string, data: unknown) {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	triggerDownload(filename, url)
}

export function downloadCSV<T extends Record<string, unknown>>(filename: string, rows: T[]) {
	const csv = Papa.unparse(rows)
	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)
	triggerDownload(filename, url)
}

function triggerDownload(filename: string, url: string) {
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}
