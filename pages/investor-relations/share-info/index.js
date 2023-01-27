import React from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import AboutTabsIR from "../../../components/IRPage/AboutTabsIR"
import Banner from "../../../components/IRPage/Banner"
import NewReleases from "../../../components/IRPage/NewReleases"
import ShareInfo from "../../../components/IRPage/ShareInfo"
import { getAllData ,getShareInfoData } from "../../../utils/Data"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

export default function Index({ locale }) {
	const { t } = useTranslation("common")

	const { data: IRCoverData, isSuccess: IRCoverSuccess } = useQuery(
		["IRCover", locale],
		() =>
			getAllData(
				"investor-relation",
				locale,
				"populate%5B7%5D=cover&populate[8]=coverMobile"
			)
	)
	const {
		data: shareInfo,
		isLoading: shareInfoLoading,
		isSuccess: shareInfoSucess,
	} = useQuery(["shareInfo", locale], () =>
		getShareInfoData()
	)
	return (
		<>
			<NextSeo title={t("headers.share_info-page")} />
			<Banner bannerData={IRCoverData?.data?.attributes} />
			<AboutTabsIR />
			<ShareInfo shareInfo={shareInfo} />
		</>
	)
}
export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(["IRCover", locale], () =>
		getAllData(
			"investor-relation",
			locale,
			"populate%5B7%5D=cover&populate[8]=coverMobile"
		)
	)
	await queryClient.prefetchQuery(["ShareInfo"], () =>
	getShareInfoData()
)


	

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			locale,
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}
