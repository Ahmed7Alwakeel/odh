import Banner from "../../components/destinations/Banner"
import DestinationContact from "../../components/destinations/DestinationContact"
import DestinationMapInfo from "../../components/destinations/DestinationMapInfo"
import { getDynamicData } from "../../utils/Data"
// import DestinationSights from "../../components/destinations/DestinationSights"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
const DestinationsDetails = ({ slug, locale }) => {
	const [destinationDetails, setDestinationDetails] = useState()

	const { data, isSuccess } = useQuery(["destinationQuery", locale], () =>
		getDynamicData(
			"projects",
			slug,
			locale,
			"populate[0]=projectIcon&populate[1]=country&populate[2]=projectMapDesktop&populate[3]=projectFeatures.projectService.serviceIcon&populate[4]=homeImageDesktop&populate[5]=homeImageMobile&populate[6]=galleryDesktop.imageDesktop1&populate[7]=galleryDesktop.imageDesktop2&populate[8]=galleryDesktop.imageDesktop3&populate[9]=galleryMobile.imageMobile1&populate[10]=galleryMobile.imageMobile2&populate[11]=galleryMobile.imageMobile3&populate[12]=dropdownimage&populate[13]=learnmore.phoneIcon&populate[14]=learnmore.emailIcon&populate[15]=learnmore.socialMedia&populate[16]=learnmore.socialMedia.icon"
		)
	)

	useEffect(() => {
		isSuccess & setDestinationDetails(data)
	}, [isSuccess, data])
	let { t } = useTranslation("common")
	return (
		<>
			<NextSeo title={t("headers.destinations_page")} />
			<Banner
				bannerData={destinationDetails?.data[0]?.attributes}
				isSuccess
				destSlug={destinationDetails?.data[0]?.attributes.slug}
			/>
			{destinationDetails?.data[0]?.attributes.slug !== "others" && (
				<DestinationMapInfo
					destinationFeatures={destinationDetails?.data[0]?.attributes}
					isSuccess={isSuccess}
				/>
			)}
			<DestinationContact
				destData={destinationDetails?.data[0]?.attributes}
				destSlug={destinationDetails?.data[0]?.attributes.slug}
			/>
			{/* <DestinationSights /> */}
		</>
	)
}

export default DestinationsDetails

export async function getServerSideProps(ctx) {
	const queryClient = new QueryClient()
	const { slug } = ctx.params
	const locale = ctx.locale

	await queryClient.prefetchQuery(["destinationQuery", locale], () =>
		getDynamicData(
			"projects",
			slug,
			locale,
			"populate%5B0%5D=projectIcon&populate%5B1%5D=country&populate%5B2%5D=projectMapDesktop&populate%5B3%5D=projectFeatures.projectService.serviceIcon&populate%5B4%5D=homeImageDesktop&populate%5B5%5D=homeImageMobile&populate%5B6%5D=galleryDesktop.imageDesktop1&populate%5B7%5D=galleryDesktop.imageDesktop2&populate%5B8%5D=galleryDesktop.imageDesktop3&populate%5B9%5D=galleryMobile.imageMobile1&populate%5B10%5D=galleryMobile.imageMobile2&populate%5B11%5D=galleryMobile.imageMobile3&populate%5B12%5D=dropdownimage&populate%5B13%5D=learnmore.phoneIcon&populate%5B14%5D=learnmore.emailIcon&populate%5B15%5D=learnmore.socialMedia&populate%5B16%5D=learnmore.socialMedia.icon"
		)
	)

	const response = await getDynamicData(
		"projects",
		slug,
		locale,
		"populate%5B0%5D=projectIcon&populate%5B1%5D=country&populate%5B2%5D=projectMapDesktop&populate%5B3%5D=projectFeatures.projectService.serviceIcon&populate%5B4%5D=homeImageDesktop&populate%5B5%5D=homeImageMobile&populate%5B6%5D=galleryDesktop.imageDesktop1&populate%5B7%5D=galleryDesktop.imageDesktop2&populate%5B8%5D=galleryDesktop.imageDesktop3&populate%5B9%5D=galleryMobile.imageMobile1&populate%5B10%5D=galleryMobile.imageMobile2&populate%5B11%5D=galleryMobile.imageMobile3&populate%5B12%5D=dropdownimage&populate%5B13%5D=learnmore.phoneIcon&populate%5B14%5D=learnmore.emailIcon&populate%5B15%5D=learnmore.socialMedia&populate%5B16%5D=learnmore.socialMedia.icon"
	)
	if (response.data == null || response.data.length == 0) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			slug: slug,
			locale: locale,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}
