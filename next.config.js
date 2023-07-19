/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: '**.googleusercontent.com',
			port: '',
			pathname: '/**',
		  },
		  {
			protocol: 'https',
			hostname: 'ui-avatars.com',
			port: '',
			pathname: '/**',
		  },
		],
	},
};
