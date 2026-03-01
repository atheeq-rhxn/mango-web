import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
	...(isGitHubPages && {
		output: "export",
		basePath: "/mango-web",
		assetPrefix: "https://mangowm.github.io/mango-web",
	}),
	trailingSlash: true,
	reactCompiler: false,
	compress: true,
	serverExternalPackages: ["@takumi-rs/image-response"],
	images: {
		unoptimized: true,
	},
};

export default withMDX(nextConfig);
