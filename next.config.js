/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
	experimental: {
		serverActions: true,
	},
	// modularizeImports: {
	// 	'@mui/icons-material/?(((\\w*)?/?)*)': {
	// 		  transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
	// 	}
	// }
};
