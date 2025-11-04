import { Select } from '@/components/ui/select'

export function FilterBar() {
	return (
		<div className="bg-surface px-4 py-3 rounded-lg mb-6">
			<div className="flex flex-wrap items-center gap-4 text-sm">
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Timeframe:</span>
					<Select defaultValue="lastWeek" className="h-8 min-w-[120px]">
						<option value="lastWeek">Last Week</option>
						<option value="lastMonth">Last Month</option>
						<option value="lastYear">Last Year</option>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Date Range:</span>
					<span className="px-3 py-1.5 bg-muted/50 rounded text-foreground">Oct 29, 2025 - Oct 28, 2025</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Grouped by:</span>
					<Select defaultValue="day" className="h-8 min-w-[100px]">
						<option value="day">Day</option>
						<option value="week">Week</option>
						<option value="month">Month</option>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Date Type:</span>
					<Select defaultValue="calendar" className="h-8 min-w-[120px]">
						<option value="calendar">Calendar</option>
						<option value="orderDate">Order Date</option>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Comparison:</span>
					<Select defaultValue="ly" className="h-8 min-w-[80px]">
						<option value="ly">LY</option>
						<option value="previous">Previous</option>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Brand:</span>
					<Select defaultValue="laroude" className="h-8 min-w-[100px]">
						<option value="laroude">Laroude</option>
						<option value="other">Other</option>
					</Select>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground">Country:</span>
					<Select defaultValue="us" className="h-8 min-w-[80px]">
						<option value="us">US</option>
						<option value="ca">CA</option>
					</Select>
				</div>
			</div>
		</div>
	)
}

