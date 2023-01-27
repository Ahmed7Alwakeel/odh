import { useQuery } from "react-query"
import { fetchDataOdhHolding } from "../../utils/Data"
import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

function OdhHolding({ articleData, newsId }) {
	const {locale}=useRouter()
	const [articleContent, setArticleContent] = useState()
	const parse = require("html-react-parser")
	useEffect(() => {
		const content = articleData?.item.find(
			// (article) => article.newsID == newsId 
			(article) => article.newsID == newsId || article.newsID == parseInt(newsId)+2 || article.newsID == parseInt(newsId)-2
		)
		setArticleContent(content)
	}, [articleData, newsId])
	return (
		<>
			<h2 style={{ fontSize: "2rem", color: "#26477e" }}>
				{articleContent?.title["#cdata"]}
			</h2>
			<div className="odhHolding" style={{ color: "#000", fontSize: "1.5rem" }}>
				{parse(`${articleContent?.content["#cdata"]}`)}
			</div>
		</>
	)
}

export default OdhHolding
