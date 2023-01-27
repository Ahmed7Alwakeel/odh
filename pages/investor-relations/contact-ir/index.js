import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useEffect, useState } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import AboutTabsIR from "../../../components/IRPage/AboutTabsIR"
import Banner from "../../../components/IRPage/Banner"
import ContactIR from "../../../components/IRPage/ContactIR"
import NewReleases from "../../../components/IRPage/NewReleases"
import { getAllData } from "../../../utils/Data"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"

export default function Index({ locale }) {
	const { t } = useTranslation("common")
	const [contactIRData, setContactIRData] = useState()
	const { data, isSuccess } = useQuery(["contactIR", locale], () =>
		getAllData(
			"contact-ir",
			locale,
			"populate[0]=coverDesktop&populate[1]=contactir.phoneIcon1&populate[2]=contactir.phoneIcon2&populate[3]=contactir.profileIcon&populate[4]=contactir.emailIcon&populate[5]=coverMobile"
		)
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
			setContactIRData(data?.data?.attributes)
		}
	}, [data, isSuccess])

	return (
		<>
			<NextSeo title={t("headers.contact_ir-page")} />
			<Banner bannerData={IRCoverData?.data?.attributes} />
			<AboutTabsIR />
			<ContactIR contactData={contactIRData} />
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["contactIR", locale], () =>
		getAllData(
			"contact-ir",
			locale,
			"populate[0]=coverDesktop&populate[1]=contactir.phoneIcon1&populate[2]=contactir.phoneIcon2&populate[3]=contactir.profileIcon&populate[4]=contactir.emailIcon&populate[5]=coverMobile"
		)
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
