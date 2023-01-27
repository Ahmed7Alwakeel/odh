/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")
const nextConfig = {
	reactStrictMode: false,
	env: {
		NEXT_PUBLIC_BLUR:
			"data:image/png;base64,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",
		NEXT_PUBLIC_SHARE_PRICE:
			"http://charts3.equitystory.com/api/orascom/English/",
		NEXT_PUBLIC_SHARE_INFO: "https://charts3.equitystory.com/chart/orascom/",
	},
	images: {
		domains: [
			"admin.odh.beyond-creation.net",
			"odh-strapi-r3xyr.ondigitalocean.app",
			"odh-space.fra1.digitaloceanspaces.com",
			"localhost",
			"127.0.0.1",
		],
	},
	i18n,
	async headers() {
		return [
		  {
			source: '/(.*)',
			headers: [
			  {
				key: 'Strict-Transport-Security',
				value: 'on',
			  }, 
			  {
				key: 'X-DNS-Prefetch-Control',
				value: 'max-age=63072000; includeSubDomains; preload',
			  },
			  {
				key: 'X-Content-Type-Options',
				value: 'nosniff',
			  },
			  {
				key: 'X-Frame-Options',
				value: 'SAMEORIGI',
			  },
			  {
				key: 'X-XSS-Protection',
				value: '1; mode=block',
			  },
			  {
				key: 'Referrer-Policy',
				value: 'origin-when-cross-origin',
			},
			{
				key: 'Permissions-Policy',
				value: 'camera=(), microphone=(), geolocation=(),fullscreen=()'
			}
			]
		  }
		]
	  }
}

module.exports = nextConfig