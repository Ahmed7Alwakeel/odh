import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, Pagination, Navigation } from "swiper"
import { BASE_API_URL } from "../../utils/Data"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"
import { useTranslation } from 'next-i18next';

const Banner = ({bannerData}) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const { t } = useTranslation('common');
	return (
		<div className="banner">
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{
					delay: 4500,
					disableOnInteraction: false,
				}}
				loop
				pagination={{
					clickable: true,
				}}
				initialSlide={0}
				modules={[Autoplay, Pagination, Navigation]}
			>
				{bannerData?.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="home-page-banner-container">
							<div className="image-container">
								<Image
									// src={"/home/hp-b-3.jpeg"}
									src={isMobile ? slide.imageMobile.data[0].attributes.url : slide.imageDesktop.data[0].attributes.url}
									alt={isMobile ? slide.altMobile : slide.altDesktop}
									layout="fill"
									objectFit="cover"
									objectPosition={"top"}
								/>
								<div className="caption">
									<div className="img-container">
										<Image
											src={"/icons/location.svg"}
											alt="pin"
											layout="fill"
											objectFit="contain"
										/>
									</div>
									<span>{slide.location}</span>
								</div> 
								{slide?.photoCreditDesktop && (
									<div className="photoCredit">
										<span>{t('home.photo_credit')}: {slide.photoCreditDesktop}</span>
									</div> 
								)}
								<div className="image-overlay"></div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Banner
