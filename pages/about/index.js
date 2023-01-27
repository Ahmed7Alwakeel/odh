import AboutOrascom from "../../components/AboutPage/AboutOrascom"
import Banner from "../../components/AboutPage/Banner"
import AboutTabs from "../../components/AboutPage/AboutTabs"
import BoardOfDirectors from "../../components/AboutPage/BoardOfDirectors"
import DestinationsMap from "../../components/AboutPage/DestinationsMap"
import ManagementTeam from "../../components/AboutPage/ManagementTeam"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { getAllData } from "../../utils/Data"
import { useEffect, useRef, useState } from "react"
import OrascomHospitality from "../../components/AboutPage/OrascomHospitality"
import MissionAndVision from "../../components/AboutPage/MissionAndVision"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
const AboutPage = ({ locale }) => {
	let { t } = useTranslation("common")
	const [aboutData, setAboutData] = useState()
	const [boardMembers, setBoardMembers] = useState()
	const [managmentMembers, setManagmentMembers] = useState()
	const [countriesData, setCountriesData] = useState()
	const {
		data: dataOfCountries,
		isLoading: loadedCountries,
		isSuccess: successfulCountries,
	} = useQuery(["countriesData", locale], () =>
		getAllData(
			"countries",
			locale,
			"populate%5B0%5D=projects&populate%5B1%5D=projects.projectIcon&populate%5B2%5D=projects.country&populate%5B3%5D=projects.projectMapDesktop&populate%5B4%5D=projects.projectFeatures.projectService.serviceIcon&populate%5B5%5D=projects.homeImageDesktop&populate%5B6%5D=projects.homeImageMobile&populate%5B7%5D=projects.galleryDesktop.imageDesktop1&populate%5B8%5D=projects.galleryDesktop.imageDesktop2&populate%5B9%5D=projects.galleryDesktop.imageDesktop3&populate%5B10%5D=projects.galleryMobile.imageMobile1&populate%5B11%5D=projects.galleryMobile.imageMobile2&populate%5B12%5D=projects.galleryMobile.imageMobile3&populate[13]=countryIconDesktop&populate[14]=countryIconMobile&populate[15]=map&sort=order:asc"
		)
	)

	useEffect(() => {
		successfulCountries && setCountriesData(dataOfCountries)
	}, [dataOfCountries, successfulCountries])
	const { data, isLoading, isSuccess } = useQuery(["about-page", locale], () =>
		getAllData(
			"about",
			locale,
			"populate[0]=AboutHeroSection.imageDesktop&populate[1]=AboutHeroSection.AboutHeroMenu&populate[2]=AboutHeroSection.imageMobile&populate[3]=luxuryLifeSection&populate[4]=AbouPortfolioSection.imageDesktop&populate[5]=AbouPortfolioSection.imageMobile&populate[6]=BoardofDirectorsSection&populate[7]=BoardofDirectorsSection.AboutCards.imageDesktop1&populate[8]=BoardofDirectorsSection.AboutCards.iconImage&populate[9]=BoardofDirectorsSection.AboutCards.imageMobile1&populate[10]=ManageTeamsSection.AboutCards.imageDesktop1&populate[11]=ManageTeamsSection.AboutCards.iconImage&populate[12]=ManageTeamsSection.AboutCards.imageMobile1&populate[13]=mission&populate[14]=ohm.image1Desktop&populate[15]=ohm.image1Mobile&populate[16]=ohm.ohmGalleryDesktop.imageDesktop1&populate[17]=ohm.ohmGalleryDesktop.imageIconDesktop1&populate[18]=ohm.ohmGalleryMobile.imageMobile1&populate[19]=ohm.ohmGalleryMobile.imageIconMobile1"
		)
	)
	const {
		data: boardMemberData,
		isLoading: boardMemberLoading,
		isSuccess: boardMemberSucess,
	} = useQuery(["board-members", locale], () =>
		getAllData(
			"abot-board-directors-cards",
			locale,
			"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
		)
	)
	const {
		data: managmentMemberData,
		isLoading: managmentLoading,
		isSuccess: managmentSucess,
	} = useQuery(["managment-members", locale], () =>
		getAllData(
			"management-team-cards",
			locale,
			"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
		)
	)
	useEffect(() => {
		isSuccess && setAboutData(data)
	}, [data, isSuccess])
	useEffect(() => {
		boardMemberSucess && setBoardMembers(boardMemberData)
	}, [boardMemberData, boardMemberSucess])
	useEffect(() => {
		managmentSucess && setManagmentMembers(managmentMemberData)
	}, [managmentMemberData, managmentSucess])
	const intro = useRef(null)
	const mission = useRef()
	const portofolio = useRef()
	const ohm = useRef()
	const board = useRef()
	const management = useRef()

	return (
		<>
			<NextSeo title={t("headers.about_us_page")} />
			<Banner heroData={aboutData?.data?.attributes?.AboutHeroSection} />
			<AboutTabs
				introRef={intro}
				missionRef={mission}
				portofolioRef={portofolio}
				ohmRef={ohm}
				boardRef={board}
				managementRef={management}
				// tabData={aboutData?.data?.attributes?.AboutHeroSection?.AboutHeroMenu}
			/>
			<AboutOrascom
				ref={intro}
				luxuryData={aboutData?.data?.attributes?.luxuryLifeSection}
			/>
			<MissionAndVision
				isSuccess={isSuccess}
				ref={mission}
				missionData={aboutData?.data?.attributes?.mission}
			/>
			<DestinationsMap
				ref={portofolio}
				portfolioData={aboutData?.data?.attributes?.AbouPortfolioSection}
				countriesData={countriesData?.data}
			/>
			<OrascomHospitality
				ref={ohm}
				ohmData={aboutData?.data?.attributes.ohm}
				isSuccess={isSuccess}
			/>
			<BoardOfDirectors
				ref={board}
				boardData={aboutData?.data?.attributes?.BoardofDirectorsSection}
				membersData={boardMembers?.data}
			/>
			<ManagementTeam
				ref={management}
				managmentTeamData={aboutData?.data?.attributes?.ManageTeamsSection}
				membersData={managmentMembers?.data}
			/>
		</>
	)
}

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["about-page", locale], () =>
		// getAllData("about", "*")
		getAllData(
			"about",
			locale,
			"populate[0]=AboutHeroSection.imageDesktop&populate[1]=AboutHeroSection.AboutHeroMenu&populate[2]=AboutHeroSection.imageMobile&populate[3]=luxuryLifeSection&populate[4]=AbouPortfolioSection.imageDesktop&populate[5]=AbouPortfolioSection.imageMobile&populate[6]=BoardofDirectorsSection&populate[7]=BoardofDirectorsSection.AboutCards.imageDesktop1&populate[8]=BoardofDirectorsSection.AboutCards.iconImage&populate[9]=BoardofDirectorsSection.AboutCards.imageMobile1&populate[10]=ManageTeamsSection.AboutCards.imageDesktop1&populate[11]=ManageTeamsSection.AboutCards.iconImage&populate[12]=ManageTeamsSection.AboutCards.imageMobile1&populate[13]=mission&populate[14]=ohm.image1Desktop&populate[15]=ohm.image1Mobile&populate[16]=ohm.ohmGalleryDesktop.imageDesktop1&populate[17]=ohm.ohmGalleryDesktop.imageIconDesktop1&populate[18]=ohm.ohmGalleryMobile.imageMobile1&populate[19]=ohm.ohmGalleryMobile.imageIconMobile1"
		)
	)
	await queryClient.prefetchQuery(["board-members", locale], () =>
		getAllData(
			"abot-board-directors-cards",
			locale,
			"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
		)
	)
	await queryClient.prefetchQuery(["managment-members", locale], () =>
		getAllData(
			"management-team-cards",
			locale,
			"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
		)
	)
	// await queryClient.prefetchQuery(["share-info"], () => fetchShareInfo(locale))
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			locale,
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}

export default AboutPage
