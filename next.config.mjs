/** @type {import('next').NextConfig} */

const nextConfig = {
	env: {
		ENVIRONMENT: "Staging",
		BASE_API_URL: "https://v6.exchangerate-api.com/v6/",
		EXCHANGERATE_API_KEY: "a93cfebd0ad93d1f1d3d771d"
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
