import { AnimatePresence, motion, useCycle } from "framer-motion"
import { itemVariants, sideVariants } from "../../utils/Animations"
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react"
import LangSwitcher from "./LangSwitcher"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"
import { useTranslation } from "next-i18next"
const MobileMenu = ({ isMobileMenu, toggleMobileMenu, allCountriesData }) => {
	const { locale, locales, defaultLocale, asPath, pathname } = useRouter()
	const { setHamburgerOpened } = useContext(isMobileContext)
	const router = useRouter()
	const [mobileMenuOpened, setMobileMenuOpened] = useState(isMobileMenu)
	const toggleMobileMenuOpen = () => {
		document.body.classList.remove("no-scroll")
		setMobileMenuOpened(false)
		setHamburgerOpened(false)
	}
	const { t } = useTranslation("common")
	const IRSections = [
		{ title: `${t("headers.new_releases")}`, link: "news-releases" },
		{ title: `${t("headers.financial_info")}`, link: "financial-info" },
		{ title: `${t("headers.corporate_filings")}`, link: "corporate-filings" },
		{ title: `${t("headers.share_info")}`, link: "share-info" },
		{ title: `${t("headers.calendar")}`, link: "calendar" },
		{ title: `${t("headers.contact_ir")}`, link: "contact-ir" },
	]

	return (
		<>
			{isMobileMenu && (
				<motion.aside
					initial={{ width: 0 }}
					animate={{
						width: "100vw",
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 40,
						},
					}}
					exit={{
						width: 0,
						transition: {
							delay: 0.5,
							type: "spring",
							stiffness: 400,
							damping: 40,
						},
					}}
					className="mobile-menu__aside"
				>
					<motion.div
						className="mobile-menu__container"
						initial="closed"
						animate="open"
						exit="closed"
						variants={sideVariants}
					>
						<div className="mobile-menu__wrapper">
							<motion.div
								variants={itemVariants}
								className={`mobile-menu__link ${
									asPath === "/" ? "active-link" : ""
								}`}
							>
								<div
									onClick={() =>
										router.push("/").then(() => {
											document.body.classList.remove("no-scroll")
											toggleMobileMenu(false)
										})
									}
								>
									{t("headers.home")}
								</div>
							</motion.div>
							<motion.div
								variants={itemVariants}
								className={`mobile-menu__link ${
									asPath === "/about" ? "active-link" : ""
								}`}
							>
								<div
									onClick={() =>
										router.push("/about").then(() => {
											document.body.classList.remove("no-scroll")
											toggleMobileMenu(false)
										})
									}
								>
									{t("headers.about_us")}
								</div>
							</motion.div>
							<motion.div
								variants={itemVariants}
								className={`mobile-menu__link`}
							>
								<Accordion allowMultiple>
									<AccordionItem>
										<h2
											className={`mobile-menu__link ${
												asPath.includes("/destinations") ? "active-link" : ""
											}`}
										>
											<AccordionButton>
												{t("headers.destinations")}
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4} className="destinations-list">
											<Accordion allowMultiple>
												<AccordionItem>
													<div
														onClick={() =>
															router.push(`/destinations`).then(() => {
																document.body.classList.remove("no-scroll")
																toggleMobileMenu(false)
															})
														}
														className={`${
															asPath === "/destinations" ? "active-link" : ""
														}`}
													>
														{t("headers.overview")}
													</div>
												</AccordionItem>
												{allCountriesData?.data
													?.slice(1)
													.map((country, index) => (
														<AccordionItem key={index}>
															<h2>
																<AccordionButton className="nestedButton">
																	{country?.attributes?.countryName}
																	<AccordionIcon />
																</AccordionButton>
															</h2>
															<AccordionPanel pb={4}>
																<ul>
																	{country?.attributes?.projects?.data
																		.sort(
																			(a, b) =>
																				a.attributes.order - b.attributes.order
																		)
																		.map((dest, index) => (
																			<div
																				key={index}
																				onClick={() =>
																					router
																						.push(
																							`/destinations/${dest.attributes.slug}`
																						)
																						.then(() => {
																							document.body.classList.remove(
																								"no-scroll"
																							)
																							toggleMobileMenu(false)
																						})
																				}
																				className={`mobile-menu__link ${
																					asPath.includes(dest.attributes.slug)
																						? "active-link"
																						: ""
																				}`}
																			>
																				{dest.attributes.projectName}
																			</div>
																		))}
																</ul>
															</AccordionPanel>
														</AccordionItem>
													))}
											</Accordion>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</motion.div>
							<motion.div
								variants={itemVariants}
								className={`mobile-menu__link`}
							>
								<Accordion allowMultiple>
									<AccordionItem>
										<h2
											className={`mobile-menu__link ${
												asPath.includes("/investor-relations")
													? "active-link"
													: ""
											}`}
										>
											<AccordionButton>
												{t("headers.investor_relations")}
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel className="destinations-list">
											<Accordion allowMultiple>
												{IRSections.map((section, index) => (
													<AccordionItem key={index}>
														<div
															onClick={() =>
																router
																	.push(`/investor-relations/${section.link}`)
																	.then(() => {
																		document.body.classList.remove("no-scroll")
																		toggleMobileMenu(false)
																	})
															}
															className={`mobile-menu__link ${
																asPath.includes(section.link)
																	? "active-link"
																	: ""
															}`}
														>
															{section.title}
														</div>
													</AccordionItem>
												))}
											</Accordion>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</motion.div>
							<motion.div
								variants={itemVariants}
								className={`mobile-menu__link ${
									asPath === "/contact-us	" ? "active-link" : ""
								}`}
							>
								<div
									onClick={() =>
										router.push("/contact-us").then(() => {
											document.body.classList.remove("no-scroll")
											toggleMobileMenu(false)
										})
									}
								>
									{t("headers.contact_us")}
								</div>
							</motion.div>
							<motion.div
								variants={itemVariants}
								className={`mobile-menu__link ${
									asPath === "/careers" ? "active-link" : ""
								}`}
							>
								<div
									onClick={() =>
										router.push("/careers").then(() => {
											document.body.classList.remove("no-scroll")
											toggleMobileMenu(false)
										})
									}
								>
									{t("headers.careers")}
								</div>
							</motion.div>
						</div>
						<div className="mobile-menu__footer-wrapper">
							<motion.div
								variants={itemVariants}
								className="mobile-menu__link langOptionsContainer"
							>
								<span>{t("headers.change_language")}</span>
								<div className="lang-switcher-nav-container">
									<LangSwitcher>
										<div className="lang-container">
											<div className="lang-text-container">
												{locale == "en" ? "DE" : "EN"}
											</div>
										</div>
									</LangSwitcher>
								</div>
							</motion.div>
							<motion.div className="copyrights" variants={itemVariants}>
								<div className="copyright">
									<p>{t("headers.all_rights")}</p>
								</div>
								<div className="Privacy">
									<span>{t("headers.terms")}</span>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</motion.aside>
			)}
		</>
	)
}

export default MobileMenu
