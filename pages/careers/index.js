import CareerForm from "../../components/Career/CareerForm"
import CareerHeader from "../../components/Career/CareerHeader"
import CareerImage from "../../components/Career/CareerImage"

import { dehydrate, QueryClient, useQuery } from "react-query"
import { getAllData } from "../../utils/Data"
import { useState } from "react"
import { useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
const Career = ({ locale }) => {
	let { t } = useTranslation("common")
	const [careersData, setCareersData] = useState()

	const { data, isSuccess } = useQuery(["careersQuery", locale], () =>
		getAllData(
			"career",
			locale,
			"populate[0]=careerInfo&populate[1]=joinOrascom.logoDesktop&populate[2]=joinOrascom.logoMobile&populate[3]=careerGalleryDesktop.imageDesktop1&populate[4]=careerGalleryMobile.image1Mobile&populate[5]=location"
		)
	)

	useEffect(() => {
		isSuccess && setCareersData(data)
	}, [isSuccess, data])

	return (
		<>
			<NextSeo title={t("headers.career_page")} />
			<CareerHeader headerData={careersData?.data?.attributes?.careerInfo} />
			<CareerImage galleryData={careersData?.data?.attributes} />
			<CareerForm
				headerData={careersData?.data?.attributes?.joinOrascom}
				locationOptions={careersData?.data?.attributes?.location.data}
			/>
		</>
	)
}

export default Career

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["careersQuery", locale], () =>
		getAllData(
			"career",
			locale,
			"populate[0]=careerInfo&populate[1]=joinOrascom.logoDesktop&populate[2]=joinOrascom.logoMobile&populate[3]=careerGalleryDesktop.imageDesktop1&populate[4]=careerGalleryMobile.image1Mobile&populate[5]=location"
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
