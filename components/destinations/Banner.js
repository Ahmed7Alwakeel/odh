import Image from "next/image"
import { AnimatePresence, motion, useCycle } from "framer-motion"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext, useState, useEffect } from "react"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Expandable from "../common/Expandable"
import { useTranslation } from "next-i18next"
const Banner = ({ bannerData, isSuccess, destSlug }) => {
	const { t } = useTranslation("common")
	const mappedArr = bannerData?.galleryMobile.map(
		({ imageMobile1, imageMobile2, imageMobile3 }) => [
			imageMobile1.data.attributes.url,
			imageMobile2.data.attributes.url,
			imageMobile3.data.attributes.url,
		]
	)
	const spreaded = mappedArr?.reduce((a, b) => a.concat(b), [])

	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	return (
		<>
			{destSlug !== "others" && (
				<>
					{!isMobile ? (
						<div className="destination-details-banner-container">
							<div className="brush-container">
								<Image src={"/brush.svg"} alt="brush" layout="fill" />
							</div>
							<div className="destination-text-container">
								<div className={`destination-logo-container ${(destSlug == "elgouna" || destSlug == "owest") ? 'smaller-logo' : ''}`}>
									{bannerData?.projectIcon.data.attributes.url && (
										<Image
											src={bannerData?.projectIcon.data.attributes.url}
											alt="logo"
											layout="fill"
											objectFit="contain"
										/>
									)}
								</div>
								<div className="text-container">
									<h1 className="title-container">{bannerData?.projectName}</h1>
									<p className="sub-title">{bannerData?.location}</p>
									<p className="paragraph-container">
										{bannerData?.projectInfo}
									</p>
								</div>
								{/* <div className="destination-gallery-navigation-container">
									<div className="swiper-button-prev destination-gallery-prev"></div>
									<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal destination-gallery-progress-bar"></div>
									<div className="swiper-button-next destination-gallery-next"></div>
								</div> */}
							</div>
							<div className="destinations-images-container">
								<Swiper
									spaceBetween={15}
									slidesPerView={1}
									modules={[Navigation, Pagination]}
									pagination={{
										el: ".destination-gallery-progress-bar",
										type: "progressbar",
									}}
									navigation={{
										nextEl: ".destination-gallery-next",
										prevEl: ".destination-gallery-prev",
									}}
									key={bannerData?.projectName}
								>
									{bannerData?.galleryDesktop?.map((slide, index) => (
										<SwiperSlide key={index + "desktop"}>
											<AnimatePresence>
												<div className="images-container">
													<div className="left-container">
														<motion.div
															className="img-container"
															initial={{
																// x: -50,
																opacity: 0,
															}}
															animate={{
																// x: 0,
																opacity: 1,
															}}
															exit={{ opacity: 1 }}
															transition={{
																duration: 0.6,
																delay: 0.6,
															}}
															key={index + "left-one"}
														>
															<Image
																src={slide.imageDesktop1.data.attributes.url}
																alt={slide.altDesktop1}
																layout="fill"
																objectFit="cover"
																objectPosition={"center 30%"}
															/>
															{slide.photoCreditDesktop1 && (
																<div className="photoCredit">
																	<span>
																		{t("home.photo_credit")}:{" "}
																		{slide.photoCreditDesktop1}
																	</span>
																</div>
															)}
														</motion.div>
														<motion.div
															className="img-container"
															initial={{
																// x: -50,
																opacity: 0,
															}}
															animate={{
																// x: 0,
																opacity: 1,
															}}
															exit={{ opacity: 1 }}
															transition={{
																duration: 0.9,
																delay: 0.9,
															}}
															key={index + "left-two"}
														>
															<Image
																src={slide.imageDesktop2.data.attributes.url}
																alt={slide.altDesktop2}
																layout="fill"
																objectFit="cover"
																objectPosition={"center 30%"}
															/>
															{slide.photoCreditDesktop2 && (
																<div className="photoCredit">
																	<span>
																		{t("home.photo_credit")}:{" "}
																		{slide.photoCreditDesktop2}
																	</span>
																</div>
															)}
														</motion.div>
													</div>
													<div className="right-container">
														<motion.div
															className="img-container"
															initial={{
																// x: 50,
																opacity: 0,
															}}
															animate={{
																// x: 0,
																opacity: 1,
															}}
															exit={{ opacity: 1 }}
															transition={{
																duration: 1.2,
																delay: 1.2,
															}}
															key={index + "right"}
														>
															<Image
																src={slide.imageDesktop3.data.attributes.url}
																alt={slide.altDesktop3}
																layout="fill"
																objectFit="cover"
																objectPosition={"center 70%"}
															/>
															{slide.photoCreditDesktop3 && (
																<div className="photoCredit">
																	<span>
																		{t("home.photo_credit")}:{" "}
																		{slide.photoCreditDesktop3}
																	</span>
																</div>
															)}
														</motion.div>
													</div>
												</div>
											</AnimatePresence>
										</SwiperSlide>
									))}
								</Swiper>
								<div className="destination-gallery-navigation-container">
									<div className="swiper-button-prev destination-gallery-prev"></div>
									<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal destination-gallery-progress-bar"></div>
									<div className="swiper-button-next destination-gallery-next"></div>
								</div>
							</div>
						</div>
					) : (
						<div className="destination-details-banner-container">
							<div className="destination-text-container">
								<div className={`destination-logo-container ${(destSlug == "elgouna" || destSlug == "owest") ? 'smaller-logo' : ''}`}>
									{bannerData?.projectIcon?.data?.attributes?.url && (
										<Image
											// src={"/Gouna-logo.svg"}
											src={bannerData?.projectIcon.data.attributes.url}
											alt="logo"
											// layout="responsive"
											// width="7rem"
											// height="7rem"
											// objectFit="contain"
											layout="fill"
											objectFit="contain"
										/>
									)}
								</div>
								<div className="destination-swiper-mobile">
									<div className="media-navigation-container">
										<div className="swiper-button-prev media-prev"></div>
										<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal media-progress-bar"></div>
										<div className="swiper-button-next media-next"></div>
									</div>
									<Swiper
										breakpoints={{
											767: {
												slidesPerView: 1.5,
											},
										}}
										spaceBetween={15}
										slidesPerView={1}
										modules={[Navigation, Pagination]}
										pagination={{
											el: ".media-progress-bar",
											type: "progressbar",
										}}
										navigation={{
											nextEl: ".media-next",
											prevEl: ".media-prev",
										}}
										className="media-swiper"
									>
										{/* {bannerData?.galleryMobile?.slice(0, 1).map((item, index) => ( */}
										{spreaded?.slice(0, 6).map((item, index) => (
											<SwiperSlide key={index + "mobile"}>
												<div className="Swiper-img">
													<div className="img-container">
														<Image
															src={item}
															alt="destination"
															layout="fill"
															objectFit="cover"
														/>
													</div>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
								<div className="text-container">
									<h1 className="title-container">{bannerData?.projectName}</h1>
									<p className="sub-title">{bannerData?.location}</p>
									<div className="info-container">
										<Expandable data={bannerData?.projectInfo} />
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}

			{destSlug === "others" && (
				<>
					{!isMobile ? (
						<div className="destination-details-banner-container othersPage">
							<div className="brush-container">
								<Image src={"/brush.svg"} alt="brush" layout="fill" />
							</div>
							<div className="destination-text-container ">
								<div className="title">
									<h1>{t("destinations.others")}</h1>
								</div>
								<div className="text-container">
									<p className="paragraph-container">
										{t("destinations.others-desc")}
									</p>
								</div>
							</div>
							<div className="destinations-images-container others-img-container">
								<motion.div
									className="img-container"
									initial={{
										// x: 50,
										opacity: 0,
									}}
									animate={{
										// x: 0,
										opacity: 1,
									}}
									exit={{ opacity: 1 }}
									transition={{
										duration: 1.2,
										delay: 1.2,
									}}
								>
									<Image
										src={"/destinations/Chibika-ODH.jpg"}
										alt={"chbika_odh"}
										layout="fill"
										objectFit="cover"
									/>
								</motion.div>
							</div>
						</div>
					) : (
						<div className="destination-details-banner-container othersPage">
							<div className="brush-container">
								<Image src={"/brush.svg"} alt="brush" layout="fill" />
							</div>
							<div className="destination-text-container ">
								<div className="title">
									<h1>{t("destinations.others")}</h1>
								</div>
								<div className="destinations-images-container others-img-container">
									<motion.div
										className="img-container"
										initial={{
											// x: 50,
											opacity: 0,
										}}
										animate={{
											// x: 0,
											opacity: 1,
										}}
										exit={{ opacity: 1 }}
										transition={{
											duration: 1.2,
											delay: 1.2,
										}}
									>
										<Image
											src={"/destinations/Chibika-ODH.jpg"}
											alt={"chbika_odh"}
											layout="fill"
											objectFit="cover"
											objectPosition={"center 70%"}
										/>
									</motion.div>
								</div>
								<div className="text-container">
									<p className="paragraph-container">
										{t("destinations.others-desc")}
									</p>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	)
}

export default Banner
