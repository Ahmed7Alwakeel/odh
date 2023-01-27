import Parser from "rss-parser"

export async function getFeed(feedUrl) {
	let parser = new Parser()

	const { items } = await parser.parseURL(feedUrl)
	return items
}
export async function getArticles(feedUrl) {
	const items = await getFeed(feedUrl)
	const articles = items.map((item) => {
		const content = item.content
		return {
			item,
			content,
		}
	})
	return articles
}
