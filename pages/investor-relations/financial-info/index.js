import React from "react"
import AboutTabsIR from "../../../components/IRPage/AboutTabsIR"
import Banner from "../../../components/IRPage/Banner"
import CorporateFilings from "../../../components/IRPage/CorporateFilings"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { useState, useEffect } from "react"
import { getAllData, getFinancialData } from "../../../utils/Data"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

export default function Index({ locale }) {
	const { t } = useTranslation("common")
	const [finData, setFinData] = useState()
	const { data, isError, isLoading, isSuccess } = useQuery(
		["financial-data", locale],
		() => getFinancialData(locale)
	)
	useEffect(() => {
		if (isSuccess) {
			setFinData(data)
		}
	}, [data, isSuccess])

	const { data: IRCoverData, isSuccess: IRCoverSuccess } = useQuery(
		["IRCover", locale],
		() =>
			getAllData(
				"investor-relation",
				locale,
				"populate%5B7%5D=cover&populate[8]=coverMobile"
			)
	)

	const [IRCover, setIRCover] = useState()

	useEffect(() => {
		if (IRCoverSuccess) {
			setIRCover(IRCoverData)
		}
	}, [IRCoverData, IRCoverSuccess])

	return (
		<>
			<NextSeo title={t("headers.financial_info-page")} />
			<Banner bannerData={IRCoverData?.data?.attributes} />
			<AboutTabsIR />
			<CorporateFilings
				corpData={finData?.data?.attributes}
				inFinancialInfoPage
			/>
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["financial-data", locale], () =>
		getFinancialData(locale)
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
