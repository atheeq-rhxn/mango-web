export const basePath =
	process.env.GITHUB_PAGES === "true"
		? "/mangowc-web"
		: process.env.VERCEL
			? ""
			: "";
