import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTranslation } from 'next-i18next';
const AboutTabs = ({
	introRef,
	missionRef,
	portofolioRef,
	ohmRef,
	boardRef,
	managementRef,
}) => {
	const { t } = useTranslation('common');
	const navlist = [
		{ id: 1, text: `${t('about.intro')}`, path: introRef },
		{ id: 2, text: `${t('about.mission')}`, path: missionRef },
		{ id: 3, text: `${t('about.portfolio')}`, path: portofolioRef },
		{ id: 4, text: `${t('about.ohm')}`, path: ohmRef },
		{ id: 5, text: `${t('about.board')}`, path: boardRef },
		{ id: 6, text: `${t('about.managment')}`, path: managementRef },
	]
	
	const [activeId, setActiveId] = useState(false)
	const executeScroll = (path) => {
		path.current.scrollIntoView({ behavior: "smooth" })
	}
	const [scroll, setScroll] = useState(false)
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window?.scrollY == 0)
		})
	}, [])
	useEffect(() => {
		navlist.map((link) => {
			window.addEventListener("scroll", () => {
				window.scrollY + 50 >= link.path?.current?.offsetTop &&
					setActiveId(link.path)
			})
		})
	}, [])
	useEffect(() => {
		scroll && setActiveId(false)
	}, [scroll])
	return (
		<>
			<div className="about-tabs-container">
				<div className="about-tabs__wrapper">
					<ul className="about-tabs__list">
						{navlist.map((item, index) => (
							<li
								key={index}
								onClick={() => {
									setActiveId(item.path)
									executeScroll(item.path)
								}}
								className={
									activeId == item.path
										? "about-tabs__item active"
										: "about-tabs__item"
								}
							>
								{item.text}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default AboutTabs
