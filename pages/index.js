import Banner from "../components/Homepage/Banner"
import Destinations from "../components/Homepage/Destinations"
import LifeAsSection from "../components/Homepage/LifeAsSection"
import MediaCenter from "../components/Homepage/MediaCenter"
import Price from "../components/Homepage/Price"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { fetchDataOdhHolding, fetchSharePrice, getAllData } from "../utils/Data"
import { useEffect, useState } from "react"
import Head from "next/head"
import { NextSeo } from "next-seo"

const HomePage = ({ locale }) => {
	const [mediaData, setMediaData] = useState()
	const { data, isError, isLoading, isSuccess } = useQuery(
		["odh-holding", locale],
		() => fetchDataOdhHolding(locale) 
	)
	const lifeAsQuery = useQuery(["lifeAsQuery", locale], () =>
		getAllData(
			"home-page",
			locale,
			"populate%5B1%5D=HomeSlider.imageDesktop&populate%5B2%5D=HomeSlider.imageMobile&populate%5B3%5D=HomeDestination.countries&populate%5B4%5D=HomeDestination.projects&populate%5B5%5D=HomeDestination.DestinationButton&populate%5B6%5D=HomeLifeSection"
		)
	)
	const { data: countriesData, isSuccess: countriesDataSucess } = useQuery(
		["allCountriesQuery", locale],
		() =>
			getAllData(
				"countries",
				locale,
				"populate%5B0%5D=projects&populate%5B1%5D=projects.projectIcon&populate%5B2%5D=projects.country&populate%5B3%5D=projects.projectMapDesktop&populate%5B4%5D=projects.projectFeatures.projectService.serviceIcon&populate%5B5%5D=projects.homeImageDesktop&populate%5B6%5D=projects.homeImageMobile&populate%5B7%5D=projects.galleryDesktop.imageDesktop1&populate%5B8%5D=projects.galleryDesktop.imageDesktop2&populate%5B9%5D=projects.galleryDesktop.imageDesktop3&populate%5B10%5D=projects.galleryMobile.imageMobile1&populate%5B11%5D=projects.galleryMobile.imageMobile2&populate%5B12%5D=projects.galleryMobile.imageMobile3&populate[13]=countryIconDesktop&populate[14]=countryIconMobile&populate[15]=map&populate[16]=projects.keyDestinationDesktopImage&populate[17]=projects.keyDestinationMobileImage&sort=order:asc"
			)
	)
	const [lifeAsData, setLifeAsData] = useState()
	const [allCountriesData, setAllCountriesData] = useState()
	useEffect(() => {
		if (isSuccess) {
			setMediaData(data?.rss?.channel?.item)
		}
	}, [data, isSuccess])
	useEffect(() => {
		lifeAsQuery.isSuccess && setLifeAsData(lifeAsQuery.data)
	}, [lifeAsQuery.isSuccess, lifeAsQuery.data])

	useEffect(() => {
		countriesDataSucess && setAllCountriesData(countriesData)
	}, [countriesDataSucess, countriesData])

	return (
		<>
			<NextSeo title="Orascom Development Holding" />
			<div className="homepage-container">
				<Banner bannerData={lifeAsData?.data?.attributes?.HomeSlider} />
				<Price />
				<LifeAsSection
					lifeData={lifeAsData?.data?.attributes?.HomeLifeSection}
					buttonsData={
						lifeAsData?.data?.attributes?.HomeDestination.DestinationButton
					}
				/>
				<Destinations
					headerData={lifeAsData?.data?.attributes?.HomeDestination}
					countriesData={allCountriesData?.data}
				/>
				<MediaCenter mediaData={mediaData} isSuccess={isSuccess} />
			</div>
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["share-price"], () => fetchSharePrice())
	await queryClient.prefetchQuery(["odh-holding", locale], () =>
		fetchDataOdhHolding(locale)
	)
	await queryClient.prefetchQuery(["lifeAsQuery", locale], () =>
		getAllData(
			"home-page",
			locale,
			"populate%5B1%5D=HomeSlider.imageDesktop&populate%5B2%5D=HomeSlider.imageMobile&populate%5B3%5D=HomeDestination.countries&populate%5B4%5D=HomeDestination.projects&populate%5B5%5D=HomeDestination.DestinationButton&populate%5B6%5D=HomeLifeSection"
		)
	)
	await queryClient.prefetchQuery(["allCountriesQuery", locale], () =>
		getAllData(
			"countries",
			locale,
			"populate%5B0%5D=projects&populate%5B1%5D=projects.projectIcon&populate%5B2%5D=projects.country&populate%5B3%5D=projects.projectMapDesktop&populate%5B4%5D=projects.projectFeatures.projectService.serviceIcon&populate%5B5%5D=projects.homeImageDesktop&populate%5B6%5D=projects.homeImageMobile&populate%5B7%5D=projects.galleryDesktop.imageDesktop1&populate%5B8%5D=projects.galleryDesktop.imageDesktop2&populate%5B9%5D=projects.galleryDesktop.imageDesktop3&populate%5B10%5D=projects.galleryMobile.imageMobile1&populate%5B11%5D=projects.galleryMobile.imageMobile2&populate%5B12%5D=projects.galleryMobile.imageMobile3&populate[13]=countryIconDesktop&populate[14]=countryIconMobile&populate[15]=map&populate[16]=projects.keyDestinationDesktopImage&populate[17]=projects.keyDestinationMobileImage&sort=order:asc"
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

export default HomePage
