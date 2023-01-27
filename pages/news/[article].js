import ArticleList from "../../components/Article/ArticleList"
import OdhHolding from "../../components/Article/OdhHolding"
import { fetchDataOdhHolding, fetchDataOdhHoldingNewRelease } from "../../utils/Data"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { parseXml, xml2json, xmlToJson } from "../../utils/ConvertXmlToJson"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import LoaderSection from "../../components/common/LoaderSection"
import { NextSeo } from "next-seo"

const Article = () => {
	let { t } = useTranslation("common")
	const router = useRouter()
	const [articleData, setArticleData] = useState()
	const { data, error, isError, isLoading, isSuccess } = useQuery(
		["article",router.locale],
		() => fetchDataOdhHoldingNewRelease(router.locale)
	)
	useEffect(() => {
		if (isSuccess) {
			setArticleData(data.rss.channel)
		}
	}, [data, isSuccess])

	if (isLoading) {
		return <>
		<LoaderSection />
		</>
	}

	return (
		<>
		<NextSeo title={t('headers.news_page')} />
		<div className="article-container">
			<div className="article-details">
				<OdhHolding
					articleData={articleData}
					newsId={router?.query.article}
					isLoading={isLoading}
				/>
			</div>
			<div className="article-listes">
				<ArticleList newsId={router?.query.article}
				title={`${t('article_details_page.article_list_header')}`}/>
			</div>
		</div>
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["article",locale],() => fetchDataOdhHoldingNewRelease(locale))
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			locale,
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}

export default Article
