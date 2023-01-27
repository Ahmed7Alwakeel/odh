import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import Image from "next/image"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"
import { useTranslation } from 'next-i18next';

function CareerImage({ galleryData }) {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const { t } = useTranslation('common');

	return (
		<>
			{!isMobile ? (
				<div className="career-orascom-image">
					<Swiper spaceBetween={15} slidesPerView={4}>
						{/* {image.map((image, i) => ( */}
						{galleryData?.careerGalleryDesktop.map((image, i) => (
							<SwiperSlide key={i}>
								<div className="image-wrapper">
									<Image
										src={image.imageDesktop1.data.attributes.url}
										alt={image.alt1Desktop}
										objectFit="cover"
										layout="fill"
									/>
									{image.photoCredit1Desktop && (
										<div className="photoCredit">
											<span>{t('home.photo_credit')}: {image.photoCredit1Desktop}</span>
										</div> 
									)}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			) : (
				<>
					<div className="career-orascom-image">
						<Swiper spaceBetween={10} slidesPerView={1.6}>
							{galleryData?.careerGalleryMobile.map((image, i) => (
								<SwiperSlide key={i}>
									<div className="image-wrapper">
										<Image
											src={image.image1Mobile.data.attributes.url}
											alt={image.alt1Mobile}
											// objectFit="cover"
											layout="fill" />
											{image.photoCredit1Mobile && (
												<div className="photoCredit">
													<span>{t('home.photo_credit')}: {image.photoCredit1Mobile}</span>
												</div> 
											)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					{/* <div className="career-orascom__info">
						<p>
							Orascom Development Holding is a leading developer of integrated
							towns with a strong foothold in Egypt and the Middle East. With
							the alpine Andermatt project in Switzerland we have expanded our
							activity outside this region and into Central Europe.
						</p>
					</div> */}
				</>
			)}
		</>
	)
}

export default CareerImage
