/* eslint-disable react/display-name */
import SectionHeader from "../common/SectionHeader"
import Image from "next/image"
import CountryListItem from "./CountryListItem"
import { forwardRef, useEffect, useState } from "react"
import SelectedCountryDetails from "./SelectedCountryDetails"
import SelectedCountryDestinationInfo from "./SelectedCountryDestinationInfo"
import { AnimatePresence, motion } from "framer-motion"
import { countries } from "../DummyData/Countries"
import ButtonLink from "../common/ButtonLink"
import { BiArrowBack, BiArrowFromRight } from "react-icons/bi"
import Expandable from "../common/Expandable"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { useTranslation } from "next-i18next"
const DestinationsMap = forwardRef(({ portfolioData, countriesData }, ref) => {
	const { t } = useTranslation("common")
	const [mapUrl, setMapUrl] = useState("/about/map/all-earth.svg")
	const [changeCountry, setChangeCountry] = useState(true)
	const [isBack, setIsBack] = useState(true)
	const [activeSelected, setActiveSelected] = useState(-1)

	const [mobileDestMapInView, setMobileDestMapInView] = useState(false)

	const [selectedDestinationInfo, setSelectedDestinationInfo] = useState({
		completedNumber: 0,
		completedAreaNumber: 0,
		totalLandAreaNumber: 0,
		completedArea: "",
		totalLandArea: "",
		completed: "",
	})

	const [selectedDestinationID, setSelectedDestinationID] = useState()
	const [selectedDestinationSlug, setSelectedDestinationSlug] = useState()
	const [selectedCountry, setSelectedCountry] = useState()

	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	//get numbers for overall countries
	useEffect(() => {
		const allCompletedArea = 0
		const allTotalLandArea = 0
		const allComplatedNumber = 0
		const completedArea = ""
		const totalLandArea = ""
		const completed = ""

		if (isBack) {
			allCompletedArea = portfolioData?.completedAreaNumber
			allTotalLandArea = portfolioData?.totalLandAreaNumber
			allComplatedNumber = portfolioData?.completedNumber
			completedArea = portfolioData?.completedArea
			totalLandArea = portfolioData?.totalLandArea
			completed = portfolioData?.completed
		} else {
			allTotalLandArea = selectedCountry?.attributes.totalLandAreaNumber
			allCompletedArea = selectedCountry?.attributes.completedAreaNumber
			allComplatedNumber = selectedCountry?.attributes.completedNumber
			completedArea = selectedCountry?.attributes.completedArea
			totalLandArea = selectedCountry?.attributes.totalLandArea
			completed = selectedCountry?.attributes.completed
		}

		setSelectedDestinationInfo({
			completedNumber: allComplatedNumber,
			completedAreaNumber: allCompletedArea,
			totalLandAreaNumber: allTotalLandArea,
			completedArea: completedArea,
			totalLandArea: totalLandArea,
			completed: completed,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countriesData, isBack])
	useEffect(() => {
		selectedCountry?.attributes?.projects?.data.length == 1 &&
			setActiveSelected(0)
	}, [selectedCountry])

	const handleCountryChangeMobile = (country) => {
		setMapUrl(country?.attributes?.map?.data?.attributes?.url)
		setActiveSelected(-1)
		setChangeCountry(false)
		setSelectedCountry(country)
		setIsBack(false)
		setMobileDestMapInView(false)
	}

	return (
		<>
			<div className="destinaitons-container" ref={ref}>
				{isMobile ? (
					<div className="destinaitons-wrapper">
						<div className="destinaitons__data">
							<SectionHeader
								title={portfolioData?.header2}
								subTitle={portfolioData?.header1}
								customStyle={"header--style-no-pd"}
							/>
							<div className="destinaitions-info">
								<Expandable data={portfolioData?.info} />
							</div>
							<div className="destinations-tabs-maps destinations__tabs">
								<Tabs>
									<TabList>
										<Tab
											onClick={() => {
												setMapUrl("/about/map/all-earth.svg")
												setIsBack(true)
												setChangeCountry(true)
											}}
										>
											{t("about.all")}
										</Tab>
										{countriesData?.slice(1, 7).map((country, i) => (
											<Tab
												key={i}
												onClick={() => {
													handleCountryChangeMobile(country)
												}}
											>
												{country?.attributes?.countryName}
											</Tab>
										))}
									</TabList>
									<TabPanel>
										<div className="destinaitons__map">
											<div className="destinaitons-image-wrapper">
												<Image
													className="img"
													src={mapUrl}
													priority
													alt="earth"
													layout="fill"
													objectFit="contain"
												/>
											</div>
											<AnimatePresence exitBeforeEnter>
												{selectedDestinationInfo && (
													<>
														<SelectedCountryDestinationInfo
															selectedDestinationInfo={selectedDestinationInfo}
															selectedDestinationID={selectedDestinationID}
															selectedDestinationSlug={selectedDestinationSlug}
															changeCountry={changeCountry}
															activeSelected={activeSelected}
														/>
													</>
												)}
											</AnimatePresence>
										</div>
									</TabPanel>
									{countriesData?.slice(0, 7).map((country, index) => (
										<TabPanel key={index}>
											<AnimatePresence>
												{!mobileDestMapInView ? (
													<>
														<SelectedCountryDetails
															setActiveSelected={setActiveSelected}
															activeSelected={activeSelected}
															selectedCountry={selectedCountry}
															setSelectedDestinationInfo={
																setSelectedDestinationInfo
															}
															setSelectedDestinationID={
																setSelectedDestinationID
															}
															setSelectedDestinationSlug={
																setSelectedDestinationSlug
															}
															setMobileDestMapInView={setMobileDestMapInView}
														/>
													</>
												) : (
													<div className="destinaitons__map">
														<div className="destinaitons-image-wrapper">
															<Image
																className="img"
																src={mapUrl}
																priority
																alt="earth"
																layout="fill"
																objectFit="contain"
															/>
														</div>
														<AnimatePresence exitBeforeEnter>
															{selectedDestinationInfo && (
																<>
																	<SelectedCountryDestinationInfo
																		selectedDestinationInfo={
																			selectedDestinationInfo
																		}
																		selectedDestinationID={
																			selectedDestinationID
																		}
																		selectedDestinationSlug={
																			selectedDestinationSlug
																		}
																		changeCountry={changeCountry}
																		activeSelected={activeSelected}
																	/>
																</>
															)}
														</AnimatePresence>
														<motion.div
															onClick={() => {
																setMobileDestMapInView(false)
															}}
															className="read-more__map back-country"
														>
															<BiArrowBack color="black" size={30} />
															<div className="back-word">{t("about.back")}</div>
															{/* <BiArrowBack  style={{rotate: '180deg'}} color="black" size={30} /> */}
														</motion.div>
													</div>
												)}
											</AnimatePresence>
										</TabPanel>
									))}
								</Tabs>
							</div>
						</div>
					</div>
				) : (
					// DESKTOP
					<div className="destinaitons-wrapper">
						<div className="destinaitons__map">
							<div className="destinaitons-image-wrapper">
								<Image
									className="img"
									src={mapUrl}
									priority
									alt="earth"
									layout="fill"
									objectFit="contain"
								/>
							</div>
							<AnimatePresence exitBeforeEnter>
								{selectedDestinationInfo && (
									<>
										<SelectedCountryDestinationInfo
											selectedDestinationInfo={selectedDestinationInfo}
											selectedDestinationID={selectedDestinationID}
											selectedDestinationSlug={selectedDestinationSlug}
											changeCountry={changeCountry}
											activeSelected={activeSelected}
										/>
									</>
								)}
							</AnimatePresence>
						</div>
						<div className="destinaitons__data">
							<SectionHeader
								title={portfolioData?.header2}
								subTitle={portfolioData?.header1}
								customStyle={"header--style-no-pd"}
							/>
							<div className="destinaitions-info">
								<Expandable data={portfolioData?.info} inMapSection />
							</div>
							<div className="destinaitions__city">
								<AnimatePresence exitBeforeEnter>
									{changeCountry ? (
										<motion.ul
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 1 }}
											className="destinaitions__list"
										>
											{countriesData?.slice(0, 7).map(
												(country, index) =>
													country?.attributes.countryIconDesktop.data
														?.attributes.url && (
														<li key={index}>
															<CountryListItem
																setSelectedCountry={setSelectedCountry}
																setIsBack={setIsBack}
																// country={country}
																setActiveSelected={setActiveSelected}
																flagImg={
																	country?.attributes.countryIconDesktop.data
																		.attributes.url
																}
																flagImgMobile={
																	country?.attributes.countryIconMobile.data
																		.attributes.url
																}
																mapImg={
																	country?.attributes.map.data.attributes.url
																}
																country={country}
																setMapUrl={setMapUrl}
																setChangeCountry={setChangeCountry}
															/>
														</li>
													)
											)}
										</motion.ul>
									) : (
										<>
											<SelectedCountryDetails
												setActiveSelected={setActiveSelected}
												activeSelected={activeSelected}
												selectedCountry={selectedCountry}
												setSelectedDestinationInfo={setSelectedDestinationInfo}
												setSelectedDestinationID={setSelectedDestinationID}
												setSelectedDestinationSlug={setSelectedDestinationSlug}
											/>
											<motion.div
												onClick={() => {
													setChangeCountry(true)
													setIsBack(true)
													setMapUrl("/about/map/all-earth.svg")
												}}
												className="read-more__map back-country"
											>
												<BiArrowBack color="black" size={30} />
												<div className="back-word">{t("about.back")}</div>
											</motion.div>
										</>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
})
export default DestinationsMap
