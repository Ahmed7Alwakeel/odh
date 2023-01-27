import Image from "next/image"
import ButtonLink from "../common/ButtonLink"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import Link from "next/link"
import { useTranslation } from 'next-i18next';
const DestinationCard = ({
	width,
	height,
	imgSrc,
	logoSrc,
	imgAlt,
	title,
	description,
	slug,
	photoCredit
}) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const { t } = useTranslation('common');

	return (
		<>
			<div
				className={`destination--card__container ${width ? "w-" + width : ""} ${height ? "h-" + height : ""
					}`}
			>
				<div className="destination--card__img--container">
					{imgSrc &&
						<Image
							src={imgSrc}
							alt={imgAlt ? imgAlt : `${title}-img`}
							layout="fill"
							objectFit="cover"
						/>
					}
				</div>
				<div
					className={
						isMobile
							? "destination--card__overlay overlay--no-bg"
							: "destination--card__overlay"
					}
				>
					{!isMobile && (
						<div className="destination--card__text--container">
							<div className="destination--card_header">
								{/* <img src={logoSrc} alt="destination-img" /> */}
								<h4>{title}</h4> 
							</div>
							<div className="destination--card-details">
								<p>{description}</p>
								<ButtonLink
									title={t('home.explore_more')}
									link={`/destinations/${slug}`}
								/>
							</div>
							{photoCredit && (
								<div className="photoCredit">
									<span>{t('home.photo_credit')}: {photoCredit}</span>
								</div> 
							)}
						</div>
					)}
					{isMobile && (
						<div className="destination--card__text--container">
							<div className="destination--card_header">
								<h4>{title}</h4>
							</div>
							<div className="destination--card-details">
								<p>{description}</p>
								<ButtonLink
									title={t('home.explore_more')}
									customStyle={"read-more__map--dark-color"}
									link={`/destinations/${slug}`}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default DestinationCard
