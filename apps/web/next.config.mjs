import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
	...(isGitHubPages && {
		output: "export",
		basePath: "/mangowc-web",
		assetPrefix: "https://atheeq-rhxn.github.io/mangowc-web",
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
