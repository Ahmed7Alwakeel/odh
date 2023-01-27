import React from "react"
import AboutTabsIR from "../../../components/IRPage/AboutTabsIR"
import Banner from "../../../components/IRPage/Banner"
import CorporateFilings from "../../../components/IRPage/CorporateFilings"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { useState, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getAllData, getCorporateData } from "../../../utils/Data"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

export default function Index({ locale }) {
	const { t } = useTranslation("common")

	const [corpData, setCorpData] = useState()
	const { data, isError, isLoading, isSuccess } = useQuery(
		["corporate-filings", locale],
		() => getCorporateData(locale)
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

	const [IRCover, setIRCover] = useState()

	useEffect(() => {
		if (IRCoverSuccess) {
			setIRCover(IRCoverData)
		}
	}, [IRCoverData, IRCoverSuccess])

	useEffect(() => {
		if (isSuccess) {
			setCorpData(data)
		}
	}, [data, isSuccess])

	return (
		<>
			<NextSeo title={t("headers.corporate_filings-page")} />
			<Banner bannerData={IRCover?.data?.attributes} />
			<AboutTabsIR />
			<CorporateFilings
				corpData={corpData?.data?.attributes}
				inCorporateFilingPage
			/>
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["corporate-filings", locale], () =>
		getCorporateData(locale)
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
