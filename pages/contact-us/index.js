import ContactUsForm from "../../components/ContactUS/ContactUsForm"
import ContactUSHeader from "../../components/ContactUS/ContactUSHeader"
import ContactUsInfo from "../../components/ContactUS/ContactUsInfo"
import ImageBackground from "../../components/ContactUS/ImageBackground"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { getAllData } from "../../utils/Data"
import { useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
function ConactUsPage({ locale }) {
	let { t } = useTranslation("common")
	const [conatctData, setConatactData] = useState()
	const { data, isLoading, isSuccess } = useQuery(["contact-us", locale], () =>
		getAllData(
			"contact",
			locale,
			"populate[0]=countryContactInfo.iconImage&populate[1]=countryContactInfo.phoneIcon&populate[2]=countryContactInfo.urlIcon&populate[3]=countryContactInfo.emailIcon&populate[4]=contactForm.formImageDesktop&populate[5]=contactForm.formImageMobile"
		)
	)
	useEffect(() => {
		isSuccess && setConatactData(data)
	}, [data, isSuccess])
	return (
		<>
			<NextSeo title={t("headers.contact_us_page")} />
			<ContactUSHeader header={conatctData?.data?.attributes?.mainHeader} />
			<ImageBackground formData={conatctData?.data?.attributes?.contactForm} />
			<ContactUsInfo
				contactInfo={conatctData?.data?.attributes?.countryContactInfo}
			/>
			<ContactUsForm formData={conatctData?.data?.attributes?.contactForm} />
		</>
	)
}
export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["contact-us", locale], () =>
		getAllData(
			"contact",
			locale,
			"populate[0]=countryContactInfo.iconImage&populate[1]=countryContactInfo.phoneIcon&populate[2]=countryContactInfo.urlIcon&populate[3]=countryContactInfo.emailIcon&populate[4]=contactForm.formImageDesktop&populate[5]=contactForm.formImageMobile"
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
export default ConactUsPage
