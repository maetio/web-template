/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
	experimental: {
		serverActions: true,
	},
	api: {
		bodyParser: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.dicebear.com",
				port: "",
				pathname: "/**",
			},
		],
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
	},
};
