import { useState, useMemo } from 'react'
import ltvWaterfallData from '@/data/mock/ltvWaterfall.json'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ReferenceLine } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FilterBar } from '@/components/layout/FilterBar'

export default function LTVWaterfall() {
	const { cohorts } = ltvWaterfallData as any
	const [selectedMonth, setSelectedMonth] = useState(19)

	// Transform data for chart - merge all cohorts into single array format
	const chartData = useMemo(() => {
		const maxMonth = Math.max(
			...Object.values(cohorts).flatMap((cohort: any) => cohort.map((item: any) => item.month))
		)
		const data = []
		for (let month = 0; month <= maxMonth; month++) {
			const point: any = { month }
			Object.keys(cohorts).forEach((year) => {
				const cohortData = cohorts[year].find((item: any) => item.month === month)
				if (cohortData) {
					point[year] = cohortData.ltv
				}
			})
			data.push(point)
		}
		return data
	}, [cohorts])

	// Get values at selected month for tooltip
	const selectedMonthData = useMemo(() => {
		const data: Record<string, number> = {}
		Object.keys(cohorts).forEach((year) => {
			const cohortData = cohorts[year].find((item: any) => item.month === selectedMonth)
			if (cohortData) {
				data[year] = cohortData.ltv
			}
		})
		return data
	}, [cohorts, selectedMonth])

	return (
		<section className="grid gap-6">
			<FilterBar />

			<div className="bg-foreground text-background px-4 py-3 rounded-lg">
				<h2 className="text-xl font-bold">LTV Waterfall</h2>
			</div>

			{/* Slider Control */}
			<Card>
				<CardHeader>
					<CardTitle>Months since acquisition</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<input
							type="range"
							min="0"
							max="30"
							value={selectedMonth}
							onChange={(e) => setSelectedMonth(Number(e.target.value))}
							className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>0</span>
							<span className="font-semibold text-foreground">{selectedMonth}</span>
							<span>30</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Cumulative Net Sales LTV of Annual Cohorts by Customer Tenure Month</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-96 w-full">
						<ResponsiveContainer>
							<LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
								<XAxis
									dataKey="month"
									label={{ value: 'Customer Tenure Month', position: 'insideBottom', offset: -5 }}
									stroke="hsl(var(--muted-foreground))"
									tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
									domain={[0, 30]}
								/>
								<YAxis
									label={{ value: 'Cumulative LTV', angle: -90, position: 'insideLeft' }}
									stroke="hsl(var(--muted-foreground))"
									tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
									domain={[0, 500]}
								/>
								<Tooltip
									contentStyle={{
										background: 'hsl(var(--card))',
										border: 'none',
										color: 'hsl(var(--foreground))',
										borderRadius: '0.5rem',
										boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
									}}
								/>
								<Legend />
								<ReferenceLine x={selectedMonth} stroke="#666" strokeDasharray="3 3" />
								{Object.keys(cohorts).map((year, idx) => {
									const colors = ['#a0a0a0', '#404040', '#d0d0d0']
									return (
										<Line
											key={year}
											type="monotone"
											dataKey={year}
											name={year}
											stroke={colors[idx % colors.length]}
											strokeWidth={2}
											dot={{ fill: colors[idx % colors.length], r: 3 }}
											connectNulls
										/>
									)
								})}
							</LineChart>
						</ResponsiveContainer>
					</div>
					{/* Tooltip showing values at selected month */}
					{Object.keys(selectedMonthData).length > 0 && (
						<div className="mt-4 p-3 bg-surface rounded-lg text-sm">
							<div className="font-semibold mb-2">Month {selectedMonth}:</div>
							<div className="space-y-1">
								{Object.entries(selectedMonthData).map(([year, ltv]) => (
									<div key={year} className="flex justify-between">
										<span>{year}:</span>
										<span className="font-medium">{ltv.toFixed(1)}</span>
									</div>
								))}
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Footer */}
			<div className="mt-6 pt-4 border-t border-muted/30 flex items-center justify-between text-xs text-muted-foreground">
				<div>
					<span className="font-semibold">CUSTOMER HEALTH - LTV WATERFALL</span>
					<span className="ml-2">Data Last Updated: 10/30/2023 03:31 PM | DigitalRx Data</span>
				</div>
				<div>Ben Macpherson</div>
			</div>
		</section>
	)
}

