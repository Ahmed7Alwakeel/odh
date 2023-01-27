import Image from "next/image"
import SectionHeader from "../common/SectionHeader"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import MediaCenterCard from "./MediaCenterCard"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext, useEffect } from "react"
import { useTranslation } from 'next-i18next';
const MediaCenter = ({ mediaData, isSuccess }) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const mediaArr = [1, 2, 3]
	const { t } = useTranslation('common');
	return (
		<>
			<div className="media-center-container">
				<SectionHeader
					title={t('home.media_center')}
					subTitle={t('home.new_releases')}
					customStyle={"header--style-two"}
				/>
				<div className="img-container">
					<Image src={"/icons/dot.svg"} layout="fill" priority />
				</div>

				<div className="media-swiper-container">
					{!isMobile ? (
						<div className="media-center-new-release">
							<h3 className="bold">{t('home.new_releases')}</h3>
							<div className="media-navigation-container">
								<div className="swiper-button-prev media-prev"></div>
								<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal media-progress-bar"></div>
								<div className="swiper-button-next media-next"></div>
							</div>
						</div>
					) : (
						<div className="media-navigation-container">
							<div className="swiper-button-prev media-prev"></div>
							<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal media-progress-bar"></div>
							<div className="swiper-button-next media-next"></div>
						</div>
					)}
					<Swiper
						breakpoints={{
							1024: {
								slidesPerView: 2,
							},
						}}
						spaceBetween={0}
						slidesPerView={1}
						modules={[Navigation, Pagination]}
						key={isMobile}
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
						{mediaData?.map((mediaInfo, index) => (
							<SwiperSlide key={index}>
								<div className="media-slide-container">
									<MediaCenterCard
										mediaInfo={mediaInfo}
										isSuccess={isSuccess}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	)
}

export default MediaCenter
