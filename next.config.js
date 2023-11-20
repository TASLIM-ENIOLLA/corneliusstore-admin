/** @type {import('next').NextConfig} */

module.exports = {
	basePath: "",
	assetPrefix: "http://localhost:3000",
	experimental: {
    serverActions: true,
  },
	env: {
		SECRET: "bc9e98d35548180d4470115a5e027ad66b05030847f9d1979370ea387b535e05",
		DOMAIN: process.env.NODE_ENV === "production" ? "https://corneliusstore.com/" : "http://localhost:3000/",
	},
	typescript: {
		ignoreBuildErrors: true
	}
}