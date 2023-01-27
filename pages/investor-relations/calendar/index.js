import React, { useEffect, useState } from "react"
import AboutTabsIR from "../../../components/IRPage/AboutTabsIR"
import Banner from "../../../components/IRPage/Banner"
import Calender from "../../../components/IRPage/Calender"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { getAllData } from "../../../utils/Data"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

export default function Index({ locale }) {
	const { t } = useTranslation("common")
	const [calendarData, setCalendarData] = useState()

	const { data, isSuccess } = useQuery(["calendar", locale], () =>
		getAllData("calendar", locale, "populate=*")
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
		if (isSuccess) {
			setCalendarData(data)
		}
	}, [data, isSuccess])

	return (
		<>
			<NextSeo title={t("headers.calendar-page")} />
			<Banner bannerData={IRCoverData?.data?.attributes} />
			<AboutTabsIR />
			<Calender calendarData={calendarData?.data?.attributes?.calendar} />
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["calendar", locale], () =>
		getAllData("calendar", locale, "populate=*")
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
