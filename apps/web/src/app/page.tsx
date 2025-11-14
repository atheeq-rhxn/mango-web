import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { Layouts } from "@/components/layouts";

export default function Home() {
	return (
		<main id="main" className="min-h-screen bg-background">
			<Header />
			<Hero />
			<Highlights />
			<Layouts />
			<Footer />
		</main>
	);
}
