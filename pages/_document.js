import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
	render() {
		const { locale } = this.props.__NEXT_DATA__
		return (
			<Html>
				<Head>
					<meta charSet="UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<link rel="icon" href="/favicon.png" />
					<meta name="title" content="Orascom Development Holding" />
					<link rel="shortlink" href="http://www.orascomdh.com/" />
					<meta name="robots" content="index, follow" />
					<link rel="canonical" href="https://www.orascomdh.com/" />
					<meta
						name="description"
						content="Orascom Development Holding (ODH) is a leading developer of fully integrated destinations, including hotels, residential units and leisure facilities such as golf courses"
					/>

					<link
						rel="prefetch"
						href="/fonts/Arquitecta.ttf"
						as="font"
						type="font/ttf"
						crossOrigin="anonymous"
					/>
					<link
						rel="prefetch"
						href="/fonts/ArquitectaBold.ttf"
						as="font"
						type="font/ttf"
						crossOrigin="anonymous"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
