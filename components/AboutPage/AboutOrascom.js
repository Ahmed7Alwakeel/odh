import SectionHeader from "../common/SectionHeader"
import { forwardRef } from "react"
import ButtonLink from "../common/ButtonLink"
import Expandable from "../common/Expandable"
import { useState } from "react"
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line react/display-name
const AboutOrascom = forwardRef(({ luxuryData }, ref) => {
	const { t } = useTranslation('common');
	return (
		<>
			<div
				className="about-orascom-container about-page"
				id="introduction"
				ref={ref}
			>
				<div className="about-orascom__wrapper">
					<div className="about-orascom__header">
						<SectionHeader
							title={luxuryData?.header2}
							subTitle={luxuryData?.header1}
							customStyle={"header--style-four"}
						/>
					</div>
					<div className="about-orascom__info">
						<Expandable data={luxuryData?.info} inAboutPage />
						{/* <p>{luxuryData?.info}</p> */}
						<ButtonLink
							title={t('about.learn_more')}
							link={`/investor-relations`}
							blue
							customStyle={"learn-more"}
						/>
					</div>
				</div>
			</div>
		</>
	)
})

export default AboutOrascom
