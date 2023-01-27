import Image from "next/image"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useTranslation } from "next-i18next"

const Banner = ({ heroData, bannerData }) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const { t } = useTranslation("common")

	return (
		<>
			<div className="about-page-banner-container">
				<div className="image-container">
					{!isMobile && bannerData?.cover && (
						<Image
							src={bannerData?.cover?.data?.attributes?.url}
							alt={bannerData?.altCover}
							layout="fill"
							objectFit="cover"
							objectPosition={"center 50%"}
						/>
					)}
					{isMobile && bannerData?.coverMobile && (
						<Image
							src={bannerData?.coverMobile?.data?.attributes?.url}
							alt={bannerData?.altCoverMobile}
							layout="fill"
							objectFit="cover"
							objectPosition={"top"}
						/>
					)}
					<div className="caption">
						<h1>{bannerData?.coverCapption}</h1>
					</div>
					{bannerData?.coverPhotoCredit && (
						<div className="overlay-container">
							<div className="photoCredit">
								<span>{bannerData?.coverPhotoCredit}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Banner
