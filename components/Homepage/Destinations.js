import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import SectionHeader from "../common/SectionHeader"
import DestinationCard from "./DestinationCard"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"
import DestinationsSwipper from "./DestinationsSwiper"
import { BASE_API_URL } from "../../utils/Data"
import { useTranslation } from "next-i18next"

function Destinations({ headerData, countriesData, inDestinationsLanding }) {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const { t } = useTranslation("common")
	return (
		<div
			className={`destinations ${
				inDestinationsLanding ? "inDestinationsLanding" : ""
			}`}
			id="ourPortfolio"
		>
			<SectionHeader
				title={headerData?.biggerHeader}
				subTitle={headerData?.smallerHeader}
				customStyle={"header--style-three"}
			/>
			{isMobile && (
				<div className="swipe-to">
					{t("home.swipe_to")}
					<div className="line">
						<div className="dot"></div>
					</div>
				</div>
			)}
			<div className="destinations__tabs">
				<Tabs id={"dest-tabs"}>
					<TabList>
						{/* // <div className="list-wrapper">
						// </div> */}
						{countriesData?.map((country, i) => (
							<Tab key={i}>{country?.attributes?.countryName}</Tab>
						))}
					</TabList>
					{/* //first one key destinations */}
					<TabPanel>
						<div
							className={
								isMobile
									? "destinations-tab__wrapper destinations-tab__wrapper--pb "
									: "destinations-tab__wrapper"
							}
						>
							{isMobile ? (
								<>
									{/* <DestinationsSwipper destData={countriesData[0]} /> */}
									<div className="mobile-home-destinations">
										{countriesData &&
											countriesData[0].attributes?.projects?.data
												?.sort(
													(a, b) => a.attributes.keyDestinationOrder - b.attributes.keyDestinationOrder
												)
												.map((dest, index) => (
													<DestinationCard
														key={index}
														width="25"
														height={index > 2 && "50"}
														// imgSrc={"/home/tab-destinations/Elgouna2.png"}
														imgSrc={
															dest?.attributes?.keyDestinationMobileImage?.data
																?.attributes?.url
														}
														// imgSrc={"/home/tab-destinations/Elgouna2.png"}
														logoSrc={
															dest?.attributes?.projectIcon?.data?.attributes
																?.url
														}
														imgAlt={dest?.attributes?.homeImageDesktopAlt}
														title={dest.attributes.projectName}
														description={
															dest.attributes.homeDesc
																? dest.attributes.homeDesc
																: dest.attributes.projectInfo
														}
														slug={dest.attributes.slug}
													/>
												))}
									</div>
								</>
							) : (
								<>
									{/* {destData.slice(0, 3).map((dest, i) => ( */}
									<div className="desktop-home-destinations">
										{countriesData &&
											countriesData[0]?.attributes?.projects?.data
												.sort((a, b) => a.attributes.keyDestinationOrder - b.attributes.keyDestinationOrder)
												.map(
													(dest, index) =>
														index == 0 && (
															<DestinationCard
																key={index}
																width="50"
																// height={index > 2 && "50col"}
																height="50"
																// imgSrc={"/home/tab-destinations/Elgouna2.png"}
																imgSrc={
																	dest?.attributes?.keyDestinationDesktopImage?.data
																		?.attributes?.url
																}
																photoCredit={
																	dest.attributes.keyDestinationDesktopPhotoCredit
																}
																// logoSrc={"/destinations/El-Gouna.png"}
																title={dest.attributes.projectName}
																description={
																	dest.attributes.homeDesc
																		? dest.attributes.homeDesc
																		: dest.attributes.projectInfo
																}
																// slug={dest.attributes.slug}
																slug={dest.attributes.slug}
															/>
														)
												)}

										<div className="destinations-tab--vertical destinations-tab--first">
											{countriesData &&
												countriesData[0]?.attributes?.projects?.data
													.sort(
														(a, b) => a.attributes.keyDestinationOrder - b.attributes.keyDestinationOrder
													)
													.map(
														(dest, index) =>
															index != 0 &&
															index < 3 && (
																<DestinationCard
																	key={index}
																	height="100"
																	// imgSrc={"/home/tab-destinations/Elgouna2.png"}
																	imgSrc={
																		dest?.attributes?.keyDestinationDesktopImage?.data
																			?.attributes?.url
																	}
																	// logoSrc={"/destinations/El-Gouna.png"}
																	title={dest.attributes.projectName}
																	description={
																		dest.attributes.homeDesc
																			? dest.attributes.homeDesc
																			: dest.attributes.projectInfo
																	}
																	// slug={dest.attributes.slug}
																	slug={dest.attributes.slug}
																/>
															)
													)}
										</div>
									</div>
									<div className="desktop-home-destinations">
										{countriesData &&
											countriesData[0]?.attributes?.projects?.data
												.sort((a, b) => a.attributes.keyDestinationOrder - b.attributes.keyDestinationOrder)
												.map(
													(dest, index) =>
														index == 3 && (
															<DestinationCard
																key={index}
																width="50"
																// height={index > 2 && "50col"}
																height="50"
																// imgSrc={"/home/tab-destinations/Elgouna2.png"}
																imgSrc={
																	dest?.attributes?.keyDestinationDesktopImage?.data
																		?.attributes?.url
																}
																photoCredit={
																	dest.attributes.keyDestinationDesktopPhotoCredit
																}
																// logoSrc={"/destinations/El-Gouna.png"}
																title={dest.attributes.projectName}
																description={
																	dest.attributes.homeDesc
																		? dest.attributes.homeDesc
																		: dest.attributes.projectInfo
																}
																// slug={dest.attributes.slug}
																slug={dest.attributes.slug}
															/>
														)
												)}

										<div className="destinations-tab--vertical">
											{countriesData &&
												countriesData[0]?.attributes?.projects?.data
													?.sort(
														(a, b) => a.attributes.keyDestinationOrder - b.attributes.keyDestinationOrder
													)
													.map(
														(dest, index) =>
															index > 3 &&
															index < 6 && (
																<DestinationCard
																	key={index}
																	height="100"
																	// imgSrc={"/home/tab-destinations/Elgouna2.png"}
																	imgSrc={
																		dest?.attributes?.keyDestinationDesktopImage?.data
																			?.attributes?.url
																	}
																	// logoSrc={"/destinations/El-Gouna.png"}
																	title={dest.attributes.projectName}
																	description={
																		dest.attributes.homeDesc
																			? dest.attributes.homeDesc
																			: dest.attributes.projectInfo
																	}
																	// slug={dest.attributes.slug}
																	slug={dest.attributes.slug}
																/>
															)
													)}
										</div>
									</div>
								</>
							)}
						</div>
					</TabPanel>

					{/* egypt */}
					<TabPanel>
						<div
							className={
								isMobile
									? "destinations-tab__wrapper destinations-tab__wrapper--pb "
									: "destinations-tab__wrapper"
							}
						>
							{isMobile ? (
								<>
									{/* <DestinationsSwipper destData={countriesData[0]} /> */}
									<div className="mobile-home-destinations">
										{countriesData &&
											countriesData[1]?.attributes?.projects?.data
												?.sort(
													(a, b) => a.attributes.order - b.attributes.order
												)
												.map((dest, index) => (
													<DestinationCard
														key={index}
														width="25"
														height={index > 2 && "50"}
														// imgSrc={"/home/tab-destinations/Elgouna2.png"}
														imgSrc={
															dest?.attributes?.homeImageMobile?.data
																?.attributes?.url
														}
														// imgSrc={"/home/tab-destinations/Elgouna2.png"}
														logoSrc={
															dest?.attributes?.projectIcon?.data?.attributes
																?.url
														}
														imgAlt={dest?.attributes?.homeImageDesktopAlt}
														title={dest.attributes.projectName}
														description={
															dest.attributes.homeDesc
																? dest.attributes.homeDesc
																: dest.attributes.projectInfo
														}
														slug={dest.attributes.slug}
													/>
												))}
									</div>
								</>
							) : (
								<>
									{/* {destData.slice(0, 3).map((dest, i) => ( */}
									{countriesData &&
										countriesData[1]?.attributes?.projects?.data
											.sort((a, b) => a.attributes.order - b.attributes.order)
											.map(
												(dest, index) => (
													// index <= 2 && (
													<DestinationCard
														key={index}
														width="25"
														height={"100"}
														// imgSrc={"/home/tab-destinations/Elgouna2.png"}
														imgSrc={
															dest?.attributes?.homeImageDesktop?.data
																?.attributes?.url
														}
														photoCredit={
															dest.attributes.homeImageDesktopPhotoCredit
														}
														// logoSrc={"/destinations/El-Gouna.png"}
														title={dest.attributes.projectName}
														description={
															dest.attributes.homeDesc
																? dest.attributes.homeDesc
																: dest.attributes.projectInfo
														}
														// slug={dest.attributes.slug}
														slug={dest.attributes.slug}
													/>
												)
												// )
											)}
									{/* <div className="destinations-tab--vertical">
										{countriesData &&
											countriesData[1]?.attributes?.projects?.data
												?.sort(
													(a, b) => a.attributes.order - b.attributes.order
												)
												.map(
													(dest, index) =>
														index > 2 && (
															<DestinationCard
																key={index}
																height="50"
																// imgSrc={"/home/tab-destinations/Elgouna2.png"}
																imgSrc={
																	dest?.attributes?.homeImageDesktop?.data
																		?.attributes?.url
																}
																// logoSrc={"/destinations/El-Gouna.png"}
																title={dest.attributes.projectName}
																description={
																	dest.attributes.homeDesc
																		? dest.attributes.homeDesc
																		: dest.attributes.projectInfo
																}
																// slug={dest.attributes.slug}
																slug={dest.attributes.slug}
															/>
														)
												)
												.sort((a, b) => a.order - b.order)}
									</div> */}
								</>
							)}
						</div>
					</TabPanel>
					{countriesData?.map(
						(country, index) =>
							index > 1 && (
								<TabPanel key={index}>
									<div
										className={
											isMobile
												? "destinations-tab__wrapper destinations-tab__wrapper--pb "
												: "destinations-tab__wrapper"
										}
									>
										{isMobile ? (
											<>
												{/* <DestinationsSwipper destData={country} /> */}
												<div className="mobile-home-destinations">
													{country.attributes?.projects?.data
														?.sort(
															(a, b) => a.attributes.order - b.attributes.order
														)
														.map((dest, index) => (
															<DestinationCard
																key={index}
																width="25"
																height={index > 2 && "50"}
																imgSrc={
																	dest?.attributes.homeImageMobile.data
																		.attributes.url
																}
																// imgSrc={"/home/tab-destinations/Elgouna2.png"}
																// logoSrc={"/destinations/El-Gouna.png"}
																title={dest.attributes.projectName}
																description={
																	dest.attributes.homeDesc
																		? dest.attributes.homeDesc
																		: dest.attributes.projectInfo
																}
																// slug={dest.attributes.slug}
																slug={dest.attributes.slug}
															/>
														))}
												</div>
											</>
										) : (
											<>
												{country?.attributes?.projects?.data
													?.sort(
														(a, b) => a.attributes.order - b.attributes.order
													)
													.map((dest, i) => (
														<DestinationCard
															key={i}
															width={
																country.attributes.countryName == "Oman" && "50"
															}
															imgSrc={
																dest?.attributes.homeImageDesktop.data
																	.attributes.url
															}
															// imgSrc={"/home/tab-destinations/Elgouna2.png"}
															// logoSrc={"/destinations/El-Gouna.png"}
															title={dest.attributes.projectName}
															description={
																dest.attributes.homeDesc
																	? dest.attributes.homeDesc
																	: dest.attributes.projectInfo
															}
															// slug={dest.attributes.slug}
															slug={dest.attributes.slug}
														/>
													))}
											</>
										)}
									</div>
								</TabPanel>
							)
					)}
				</Tabs>
			</div>
		</div>
	)
}
export default Destinations
