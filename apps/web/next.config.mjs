import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig = {
	reactCompiler: true,
	compress: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "opeheybxdg2xe4zd.public.blob.vercel-storage.com",
			},
		],
		formats: ["image/webp", "image/avif"],
	},
};

export default withMDX(nextConfig);
