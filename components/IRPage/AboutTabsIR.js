import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from 'next-i18next';
const AboutTabsIR = () => {
	const { t } = useTranslation('common');
	const router = useRouter()
	const navlist = [
		{ text: `${t('investor.new_releases')}`, path: "/investor-relations/news-releases" },
		{ text: `${t('investor.financial_info')}`, path: "/investor-relations/financial-info" },
		{
			text: `${t('investor.corporate_filings')}`,
			path: "/investor-relations/corporate-filings",
		},
		{ text: `${t('investor.share_info')}`, path: "/investor-relations/share-info" },
		{ text: `${t('investor.calendar')}`, path: "/investor-relations/calendar" },
		{ text: `${t('investor.contact_ir')}`, path: "/investor-relations/contact-ir" },
	]

	return (
		<>
			<div className="about-tabs-container">
				<div className="about-tabs__wrapper">
					<ul className="about-tabs__list">
						{navlist.map((item, index) => (
							<Link href={`${item.path}`} key={index}>
								<li
									className={
										router.asPath == item.path
											? "about-tabs__item active"
											: "about-tabs__item"
									}
								>
									{item.text}
								</li>
							</Link>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default AboutTabsIR
