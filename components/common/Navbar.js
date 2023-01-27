import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import LangSwitcher from "./LangSwitcher"
import { AnimatePresence, motion, useCycle } from "framer-motion"
import { subMenuAnimate } from "../../utils/Animations"
import { isMobileContext } from "../../contexts/isMobileContext"
import NavbarDestinationsLink from "./NavbarDestinationsLink"
import MobileMenu from "./MobileMenu"
import NavbarDestinationImage from "./NavbarDestinationImage"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { useEffect } from "react"
import { getAllData } from "../../utils/Data"
import { useTranslation } from "next-i18next"
const Navbar = () => {
	const { t } = useTranslation("common")
	const { locale, locales, defaultLocale, asPath, pathname } = useRouter()
	const [isHover, toggleHover] = useState(false)
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const [isMobileMenu, toggleMobileMenu] = useCycle(false, true)

	const {
		isDestMenuOpened,
		setIsDestMenuOpened,
		isMobileMenuOpened,
		setIsMobileMenuOpened,
	} = useContext(isMobileContext)

	const toggleHoverMenu = (state, destMenuState) => {
		toggleHover(state)
		setIsDestMenuOpened(destMenuState)
	}

	const toggleMobileMenuOpen = () => {
		document.body.classList.toggle("no-scroll")
		toggleMobileMenu(!isMobileMenu)
		setIsMobileMenuOpened(!isMobileMenuOpened)
	}

	const { data, isSuccess } = useQuery(["allCountries", locale], () =>
		getAllData(
			"countries",
			locale,
			"populate%5B0%5D=projects&populate%5B1%5D=projects.projectIcon&populate%5B2%5D=projects.country&populate%5B3%5D=projects.projectMapDesktop&populate%5B4%5D=projects.projectFeatures.projectService.serviceIcon&populate%5B5%5D=projects.homeImageDesktop&populate%5B6%5D=projects.homeImageMobile&populate%5B7%5D=projects.galleryDesktop.imageDesktop1&populate%5B8%5D=projects.galleryDesktop.imageDesktop2&populate%5B9%5D=projects.galleryDesktop.imageDesktop3&populate%5B10%5D=projects.galleryMobile.imageMobile1&populate%5B11%5D=projects.galleryMobile.imageMobile2&populate%5B12%5D=projects.galleryMobile.imageMobile3&populate[16]=projects.dropdownimage&sort=order:asc"
		)
	)

	const [allCountriesData, setAllCountriesData] = useState()

	const shiftedArr = allCountriesData?.data?.slice(1)

	useEffect(() => {
		isSuccess && setAllCountriesData(data)
	}, [isSuccess, data])

	return (
		<>
			{/* <div className={`navbar-container ${isMobileMenu ? "fixedNav" : ""}`}> */}
			<div
				className={`navbar-container ${isMobileMenuOpened ? "fixedNav" : ""}`}
			>
				<div className="logo-container">
					<Link href={"/"}>
						<a>
							<Image
								src={"/logo.png"}
								alt="Orascom Logo"
								layout="fill"
								objectFit="contain"
							/>
						</a>
					</Link>
				</div>
				{!isMobile && (
					<>
						<div className="links-container">
							<ul className="links-list">
								<li className="link-container">
									<Link href={"/"}>
										<a className={asPath === "/" ? "active-link" : ""}>
											{t("headers.home")}
										</a>
									</Link>
								</li>
								<li className="link-container">
									<Link href={"/about"}>
										<a className={asPath === "/about" ? "active-link" : ""}>
											{t("headers.about_us")}
										</a>
									</Link>
								</li>
								<li className="link-container">
									<motion.div
										className="menu-item"
										onHoverStart={() => toggleHoverMenu(true, true)}
										onHoverEnd={() => toggleHoverMenu(false, false)}
									>
										<Link href={"/destinations"}>
											<a
												className={`${isHover ? "active" : ""} ${
													asPath.includes("/destinations") ? "active-link" : ""
												} main-link`}
											>
												{t("headers.destinations")}
											</a>
										</Link>
										<motion.div
											className="sub-menu"
											initial="exit"
											animate={isHover && isDestMenuOpened ? "enter" : "exit"}
											variants={subMenuAnimate}
										>
											<div className="sub-menu-background" />
											<div className="sub-menu-container">
												<div className="sub-menu__info">
													<div
														className="info__name"
														style={{ textTransform: "uppercase" }}
													>
														{t("headers.destinations")}
													</div>
													<div className="info__details">
														{t("headers.destinations_p")}
													</div>
												</div>
												<div className="sub-menu-items">
													{allCountriesData?.data
														?.slice(1)
														.map((country, index) => (
															<NavbarDestinationsLink
																key={index}
																country={country?.attributes?.countryName}
																destinations={
																	country?.attributes?.projects?.data
																}
																toggleHoverMenu={toggleHoverMenu}
															/>
														))}
												</div>
											</div>
										</motion.div>
									</motion.div>
								</li>
								<li className="link-container">
									<Link href={"/investor-relations"}>
										<a
											className={
												asPath.includes("/investor-relations")
													? "active-link"
													: ""
											}
										>
											{t("headers.investor_relations")}
										</a>
									</Link>
								</li>
								<li className="link-container">
									<Link href={"/contact-us"}>
										<a
											className={asPath === "/contact-us" ? "active-link" : ""}
										>
											{t("headers.contact_us")}
										</a>
									</Link>
								</li>
								<li className="link-container">
									<Link href={"/careers"}>
										<a className={asPath === "/careers" ? "active-link" : ""}>
											{t("headers.careers")}
										</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className="lang-switcher-nav-container">
							<LangSwitcher>
								<div className="lang-container">
									<div className="flag-container">
										<Image
											src={`${
												locale == "en"
													? "/icons/Flag_of_Germany.svg"
													: "/icons/Flag_of_the_United_Kingdom.svg"
											}`}
											alt="Flag"
											layout="fill"
											objectFit="cover"
										/>
									</div>
									<div className="lang-text-container">
										{locale == "en" ? "DE" : "EN"}
									</div>
								</div>
							</LangSwitcher>
						</div>
					</>
				)}
				<div className="nav-mobile">
					<div
						className="burger-menu-container"
						onClick={() => toggleMobileMenuOpen()}
					>
						<div className={`burger-menu ${isMobileMenu ? "open" : ""}`}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{isMobileMenu ? (
					<MobileMenu
						isMobileMenu={isMobileMenu}
						toggleMobileMenu={toggleMobileMenu}
						allCountriesData={allCountriesData}
					/>
				) : (
					""
				)}
			</AnimatePresence>
		</>
	)
}

export default Navbar
