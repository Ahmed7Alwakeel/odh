import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import { BASE_API_URL } from "../../utils/Data"
const Banner = ({ heroData }) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	return (
		<>
			<div className="about-page-banner-container">
				{/* <img src={heroData?.image?.data?.attributes?.url} alt="" /> */}
				<div className="image-container">
					{heroData?.imageDesktop && !isMobile && (
						<Image
							// src={"/about/about-banner.png"}
							src={heroData?.imageDesktop?.data?.attributes?.url}
							// src='https://admin.odh.beyond-creation.net/uploads/banner_2_0d816b1306.jpg'
							alt="About banner"
							layout="fill"
							objectFit="cover"
							objectPosition={"top"}
						/>
					)}
					{heroData?.imageMobile && isMobile && (
						<Image
							// src={"/about/about-banner.png"}
							src={heroData?.imageMobile?.data?.attributes?.url}
							// src='https://admin.odh.beyond-creation.net/uploads/banner_2_0d816b1306.jpg'
							alt="About banner"
							layout="fill"
							objectFit="cover"
							objectPosition={"top"}
						/>
					)}
					<div className="caption">
						<h1>{heroData?.text}</h1>
					</div>
				</div>
			</div>
		</>
	)
}

export default Banner
