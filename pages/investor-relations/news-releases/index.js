import React, { useEffect, useState } from "react"
import Banner from "../../../components/IRPage/Banner"
import NewReleases from "../../../components/IRPage/NewReleases"
import { fetchDataOdhHoldingNewRelease, getAllData } from "../../../utils/Data"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NewReleasesPage from "../../../components/IRPage/NewReleasesPage"
import AboutTabsIR from "../../../components/IRPage/AboutTabsIR"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

const Index = () => {
	const { t } = useTranslation("common")
	const [mediaData, setMediaData] = useState()
	const { locale } = useRouter()
	const {
		data: newReleaseData,
		isError: newReleaseIsError,
		isLoading: newReleaseIsLoading,
		isSuccess: newReleaseIsSuccess,
	} = useQuery(["odh-holding", locale], () =>
		fetchDataOdhHoldingNewRelease(locale)
	)
	const { data: IRCoverData, isSuccess: IRCoverSuccess } = useQuery(
		["IRCover", locale],
		() =>
			getAllData(
				"investor-relation",
				locale,
				"populate%5B7%5D=cover&populate[8]=coverMobile"
			)
	)
	useEffect(() => {
		if (newReleaseIsSuccess) {
			setMediaData(newReleaseData?.rss?.channel?.item)
		}
	}, [newReleaseData, newReleaseIsSuccess])
	return (
		<>
			<NextSeo title={t("headers.new_releases-page")} />
			<Banner bannerData={IRCoverData?.data?.attributes} />
			<AboutTabsIR />
			<NewReleasesPage
				mediaData={mediaData}
				newReleaseIsLoading={newReleaseIsLoading}
			/>
		</>
	)
}
export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(["odh-holding", locale], () =>
		fetchDataOdhHoldingNewRelease(locale)
	)

	await queryClient.prefetchQuery(["IRCover", locale], () =>
		getAllData(
			"investor-relation",
			locale,
			"populate%5B7%5D=cover&populate[8]=coverMobile"
		)
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			locale,
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}
export default Index
