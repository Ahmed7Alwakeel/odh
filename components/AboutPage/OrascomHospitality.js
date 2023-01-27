import Image from "next/image"
import ButtonLink from "../common/ButtonLink"
import SectionHeader from "../common/SectionHeader"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { forwardRef, useEffect, useState } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"
import Expandable from "../common/Expandable"
import { useTranslation } from "next-i18next"
// eslint-disable-next-line react/display-name
const OrascomHospitality = forwardRef(({ ohmData, isSuccess }, ref) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile] = isMobileState
	const [ohmDataState, setOhmDataState] = useState()
	const { t } = useTranslation("common")
	const x = t("about.oh_x")
	useEffect(() => {
		if (isSuccess && ohmData) {
			setOhmDataState(ohmData)
		}
	}, [isSuccess, ohmData])

	const y = t("about.oh_y")
	return (
		<>
			<div className="orascom-hospitality-container" ref={ref}>
				{!isMobile ? (
					<div className="orascom-hospitality__wrapper">
						<div className="header-container">
							<SectionHeader
								title={ohmData?.title}
								subTitle={ohmData?.secName}
								customStyle={"orascom-hospitality-header"}
							/>
							{/* <div className="left-container">
								<p>{ohmData?.info1}</p>
									<ButtonLink
										title={ohmData?.buttonTitle}
										link={ohmData?.buttonLink}
										blue
										customStyle={"learn-more"}
										OHMSection
									/>
							</div> */}
						</div>
						<div className="text-container">
							{/* <div className="logo-container">
								<div className="image-container">
									{ohmDataState && (
										<Image
											src={ohmDataState?.image1Desktop.data.attributes.url}
											alt={"alt"}
											// layout={"responsive"}
											width={"300px"}
											height={"103px"}
											objectFit="contain"
										/>
									)}
								</div>
							</div> */}
							<div className="right-container">
								<Expandable data={ohmData?.desc} inAboutPage />
								{/* <p>{ohmData?.desc}</p> */}
								<ButtonLink
									title={ohmData?.buttonTitle}
									link={ohmData?.buttonLink}
									blue
									customStyle={"learn-more"}
									OHMSection
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="orascom-hospitality__wrapper mobile-hospitality">
						<div className="header-container">
							<SectionHeader
								title={ohmData?.title}
								subTitle={ohmData?.secName}
								customStyle={"orascom-hospitality-header"}
							/>
						</div>
						{/* <div className="logo-container">
							<div className="image-container">
								{ohmData?.image1Mobile && (
									<Image
										src={ohmData?.image1Mobile?.data?.attributes?.url}
										alt={ohmData?.alt1Mobile}
										// layout={"responsive"}
										width={"480px"}
										height={"150px"}
										objectFit="contain"
									/>
								)}
							</div>
						</div> */}
						<div className="text-container">
							<Expandable data={t("about.oh_x") + t("about.oh_y")} />
							<ButtonLink
								title={ohmData?.buttonTitle}
								link={ohmData?.buttonLink}
								blue
								customStyle={"learn-more"}
								OHMSection
							/>
						</div>
					</div>
				)}
				<div className="swiper-container">
					{isMobile ? (
						<Swiper
							spaceBetween={17}
							slidesPerView={1}
							modules={[Navigation, Pagination]}
							pagination={{
								el: ".orascom-hospitality-progress-bar",
								type: "progressbar",
							}}
							navigation={{
								nextEl: ".orascom-hospitality-next",
								prevEl: ".orascom-hospitality-prev",
							}}
						>
							{ohmData?.ohmGalleryMobile?.map((item, index) => (
								<SwiperSlide key={index}>
									<div className="image-wrapper">
										<Image
											src={item?.imageMobile1?.data?.attributes?.url}
											alt={item?.altMobile1}
											objectFit="cover"
											layout="fill"
										/>
										{item?.imageIconMobile1?.data && (
											<div className="logo-container">
												<div className="image-container">
													{item?.imageIconMobile1?.data?.attributes?.url && (
														<Image
															src={
																item?.imageIconMobile1?.data?.attributes?.url
															}
															alt={"image"}
															layout="fill"
															objectFit="contain"
														/>
													)}
												</div>
											</div>
										)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<Swiper
							spaceBetween={30}
							slidesPerView={1.5}
							modules={[Navigation, Pagination]}
							pagination={{
								el: ".orascom-hospitality-progress-bar",
								type: "progressbar",
							}}
							navigation={{
								nextEl: ".orascom-hospitality-next",
								prevEl: ".orascom-hospitality-prev",
							}}
						>
							{ohmData?.ohmGalleryDesktop?.map((item, index) => (
								<SwiperSlide key={index}>
									<div className="image-wrapper">
										{item?.imageDesktop1 && (
											<>
												<Image
													src={item?.imageDesktop1?.data?.attributes?.url}
													alt={item?.altDesktop1}
													objectFit="cover"
													layout="fill"
												/>
												{item.photoCreditDesktop1 && (
													<div className="photoCredit">
														<span>
															{/* {t("about.hotel_name")}:{" "} */}
															{item.photoCreditDesktop1}
														</span>
													</div>
												)}
											</>
										)}
										{item?.imageIconDesktop1?.data && (
											<div className="logo-container">
												<div className="image-container">
													<Image
														src={item?.imageIconDesktop1?.data?.attributes?.url}
														alt={"image"}
														layout="fill"
														objectFit="contain"
													/>
												</div>
											</div>
										)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					)}
					<div className="orascom-hospitality-navigation-container">
						<div className="swiper-button-prev orascom-hospitality-prev"></div>
						<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal orascom-hospitality-progress-bar"></div>
						<div className="swiper-button-next orascom-hospitality-next"></div>
					</div>
				</div>
			</div>
		</>
	)
})

export default OrascomHospitality
