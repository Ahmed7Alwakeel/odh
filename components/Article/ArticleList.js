import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { fetchDataOdhHolding } from "../../utils/Data"

const ArticleList = ({ newsId,title }) => {
	const { locale } = useRouter()
	const { data, error, isError, isLoading, isSuccess } = useQuery(
		["odh-holding", locale],
		() => fetchDataOdhHolding(locale)
	)
	const [filterData, setFilterData] = useState()
	const [allData, setAllData] = useState()
	useEffect(() => {
			setAllData(data?.rss.channel.item)
	}, [data, isSuccess])
	useEffect(() => {
		const latestData = allData?.find(item => item.newsID == newsId || item.newsID == parseInt(newsId) + 2 || item.newsID == parseInt(newsId) - 2)
		const newData=allData?.filter(data=>data!=latestData)
		setFilterData(newData)
	}, [allData])
	return (
		<>
		<div className="list-header">
		{title}
		</div>
			{filterData?.slice(0, 4).map((article, i) => (
				<Link href={`/news/${article?.newsID}`} passHref key={i} >
					<div className="article-list-wrapper" style={{ cursor: 'pointer' }}>
						<div href="#" className="article-list__title">
							{/* {mediaInfo.pubDate.slice(0,mediaInfo.pubDate.indexOf('2022')+4)} */}
							{article.title["#cdata"]}
						</div>
						<span>
							{" "}
							{article.pubDate.slice(0, article.pubDate.indexOf("2022") + 4)}
						</span>
					</div>
				</Link>
			))}
		</>
	)
}

export default ArticleList
