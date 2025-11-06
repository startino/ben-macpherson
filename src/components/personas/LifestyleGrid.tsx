import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingBag, Users, Star } from 'lucide-react'

interface LifestyleGridProps {
	likes: string[]
	dislikes: string[]
	competitiveBrands: string[]
	firstPurchase: string[]
	influencers: string[]
}

export function LifestyleGrid({
	likes,
	dislikes,
	competitiveBrands,
	firstPurchase,
	influencers,
}: LifestyleGridProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Lifestyle & Preferences</CardTitle>
				<CardDescription>Visual representation of persona interests and behaviors</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 md:grid-cols-2">
				{/* Likes */}
				<div className="space-y-3 rounded-lg border bg-emerald-50 dark:bg-emerald-950/20 p-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
							<Heart className="h-4 w-4 text-white" />
						</div>
						<h4 className="font-semibold">Loves</h4>
					</div>
					<div className="flex flex-wrap gap-2">
						{likes.map((like, i) => (
							<Badge key={i} variant="success">
								{like}
							</Badge>
						))}
					</div>
				</div>

				{/* Dislikes */}
				<div className="space-y-3 rounded-lg border bg-red-50 dark:bg-red-950/20 p-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
							<Heart className="h-4 w-4 text-white fill-current" />
						</div>
						<h4 className="font-semibold">Avoids</h4>
					</div>
					<div className="flex flex-wrap gap-2">
						{dislikes.map((dislike, i) => (
							<Badge key={i} variant="warning">
								{dislike}
							</Badge>
						))}
					</div>
				</div>

				{/* Competitive Brands */}
				<div className="space-y-3 rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
							<ShoppingBag className="h-4 w-4 text-white" />
						</div>
						<h4 className="font-semibold">Also Shops</h4>
					</div>
					<div className="flex flex-wrap gap-2">
						{competitiveBrands.map((brand, i) => (
							<Badge key={i} variant="secondary">
								{brand}
							</Badge>
						))}
					</div>
				</div>

				{/* First Purchase */}
				<div className="space-y-3 rounded-lg border bg-purple-50 dark:bg-purple-950/20 p-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
							<Star className="h-4 w-4 text-white" />
						</div>
						<h4 className="font-semibold">Entry Products</h4>
					</div>
					<div className="flex flex-wrap gap-2">
						{firstPurchase.map((item, i) => (
							<Badge key={i} variant="outline">
								{item}
							</Badge>
						))}
					</div>
				</div>

				{/* Influencers - Full Width */}
				<div className="md:col-span-2 space-y-3 rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
							<Users className="h-4 w-4 text-white" />
						</div>
						<h4 className="font-semibold">Influenced By</h4>
					</div>
					<div className="flex flex-wrap gap-2">
						{influencers.map((influencer, i) => (
							<Badge key={i} variant="outline">
								{influencer}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

