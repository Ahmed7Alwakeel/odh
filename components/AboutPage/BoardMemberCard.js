import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { selectedDestinationsItem } from "../../utils/Animations"
import { BASE_API_URL } from "../../utils/Data"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext, useEffect } from "react"

const BoarderMemberCard = ({
	name,
	id,
	index,
	info,
	jobTitle,
	slug,
	image,
	alt,
	imageMobile,
	altMobile,
	iconImg,
	customStyle,
	iconLink,
	photoCredit,
	managmentId,
}) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	return (
		<>
			<motion.div
				className={`board-directors__data ${customStyle ? customStyle : ""}`}
				variants={selectedDestinationsItem}
				whileInView={{
					opacity: 1,
					transition: { delay: 0.2 + parseInt(index) / 10 },
				}}
				initial={"closed"}
				// viewport={{ once: true, amount: 1 }}
				viewport={{ once: true, amount: 0.2 }}
			>
				{/* <Link href={`/${"board-members"}/${id}`}> */}
				<Link href={`/${"board-members"}/${slug}`}>
					<div className="image-wrapper">
						{!isMobile && image && (
							<Image
								src={image}
								alt={"board-member-img"}
								objectFit="cover"
								objectPosition={"top"}
								layout="fill"
							/>
						)}
						{isMobile && imageMobile && (
							<Image
								src={imageMobile}
								alt={"board-member-img"}
								objectFit="cover"
								objectPosition={"top"}
								layout="fill"
							/>
						)}
					</div>
				</Link>
				<div className="info">
					<div className="info__wrapper">
						{/* <Link href={`/${"board-members"}/${id}`}> */}
						<Link href={`/${"board-members"}/${slug}`}>
							<h3>{name}</h3>
						</Link>
						{iconLink && iconImg &&
						<div className="icon-container">
							<div className="wrapper__icon">
								<a href={iconLink} target="_blank" rel="noopener noreferrer"> 
										<Image
											// src={"/about/Pepole-directors/linkedin.svg"}
											src={iconImg}
											alt={`icon-img`}
											objectFit="cover"
											layout="fill"
										/> 
								</a>
							</div>
						</div>
					}
					</div>
					<span>{jobTitle}</span>
				</div>
			</motion.div>
		</>
	)
}

export default BoarderMemberCard
