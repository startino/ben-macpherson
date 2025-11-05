import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Clock, RefreshCw } from 'lucide-react'

interface DataConnectionsStepProps {
	onNext: () => void
	connections: Record<string, boolean>
	onConnectionsChange: (connections: Record<string, boolean>) => void
}

export function DataConnectionsStep({ onNext, connections, onConnectionsChange }: DataConnectionsStepProps) {
	const [localConnections, setLocalConnections] = useState<Record<string, boolean>>(connections)

	useEffect(() => {
		setLocalConnections(connections)
	}, [connections])

	const syncTimestamps: Record<string, string> = {
		Shopify: '2 minutes ago',
		GA4: '5 minutes ago',
		Meta: '8 minutes ago',
		'Google Ads': '12 minutes ago',
		Klaviyo: '1 hour ago',
	}

	const dataSources = ['Shopify', 'GA4', 'Meta', 'Google Ads', 'Klaviyo']

	function toggleConnection(source: string) {
		const updated = { ...localConnections, [source]: !localConnections[source] }
		setLocalConnections(updated)
		onConnectionsChange(updated)
	}

	const connectedCount = Object.values(localConnections).filter(Boolean).length
	const hasAtLeastOne = connectedCount > 0

	return (
		<div className="mx-auto max-w-2xl">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Connect Your Data Sources</CardTitle>
							<CardDescription>
								Connect your data sources to enable persona intelligence. At least one connection is required.
							</CardDescription>
						</div>
						<Badge variant={connectedCount === dataSources.length ? 'success' : 'outline'}>
							{connectedCount}/{dataSources.length} connected
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-2">
						{dataSources.map((source) => {
							const isConnected = localConnections[source] || false
							const lastSync = syncTimestamps[source]
							return (
								<button
									key={source}
									onClick={() => toggleConnection(source)}
									className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-all duration-200 hover:bg-accent/50 ${
										isConnected ? 'bg-accent/30' : 'bg-surface'
									}`}
								>
									<div className="flex items-center gap-3 flex-1">
										{isConnected ? (
											<CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
										) : (
											<Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
										)}
										<div className="flex-1 text-left">
											<div className="font-medium text-left">{source}</div>
											{isConnected && lastSync && (
												<div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 text-left">
													<Clock className="h-3 w-3" />
													Last sync: {lastSync}
												</div>
											)}
										</div>
									</div>
									<div className="flex items-center gap-2">
										{isConnected && (
											<Badge variant="outline" className="text-xs">
												<RefreshCw className="h-3 w-3 mr-1" />
												Live
											</Badge>
										)}
										<Badge variant={isConnected ? 'success' : 'outline'}>
											{isConnected ? 'Connected' : 'Connect'}
										</Badge>
									</div>
								</button>
							)
						})}
					</div>
					<div className="mt-6 flex justify-end">
						<Button onClick={onNext} disabled={!hasAtLeastOne}>
							Continue
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

