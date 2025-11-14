import { TileLayout } from "@/components/ui/tile-layout";
import { ScrollerLayout } from "@/components/ui/scroller-layout";

export function Layouts() {
	const layouts = [
		{
			title: "Master-Stack",
			description:
				"Efficient layout with a master window and stacked secondary windows for optimal productivity.",
		},
		{
			title: "Monocle",
			description:
				"Full-screen layout where windows are maximized and cycled through seamlessly.",
		},
		{
			title: "Center-Master",
			description:
				"Centered master window with secondary windows arranged around it for focused work.",
		},
	];

	return (
		<section className="bg-muted/20 px-4 py-20 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-balance font-bold text-4xl text-foreground sm:text-5xl">
						Layouts
					</h2>
				</div>

				<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div className="flex flex-col items-center">
						<h3 className="mb-6 text-xl font-semibold text-foreground">
							Tile Layout
						</h3>
						<div className="w-full max-w-2xl">
							<TileLayout />
						</div>
					</div>
					<div className="flex flex-col items-center">
						<h3 className="mb-6 text-xl font-semibold text-foreground">
							Scroller Layout
						</h3>
						<div className="w-full max-w-2xl">
							<ScrollerLayout />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
