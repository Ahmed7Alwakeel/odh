import Image from "next/image"
import { Formik, useField } from "formik"
import * as Yup from "yup"
import { useContext, useState } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"
import { FormTextInput } from "../common/FormInputs"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ButtonLink from "./ButtonLink"
import { API_URL } from "../../utils/Data"
import { useTranslation } from "next-i18next"
// import { useRouter } from "next/router"
const Footer = () => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)
	const { t } = useTranslation("common")
	// const router = useRouter()
	return (
		<>
			<div className="footer">
				<div className="footer__logo">
					<Link href={"/about"} passHref>
						<div className="image-wrapper">
							<Image
								src={"/logo.png"}
								width="166"
								height="51"
								priority
								alt="odh-logo"
							/>
						</div>
					</Link>
				</div>
				<div className="footer__wrapper">
					<div className="footer__list">
						<ul className="list">
							<li className="list__item">
								<Link href="/">{t("headers.home")}</Link>
							</li>
							<li className="list__item">
								<Link href="/about">{t("headers.about_us")}</Link>
							</li>
							<li className="list__item">
								<Link href="/careers">{t("headers.careers")}</Link>
							</li>
							<li className="list__item">
								<Link href="/contact-us">{t("headers.contact_us")}</Link>
							</li>
							<li className="list__item">
								<Link href="/destinations">{t("headers.destinations")}</Link>
							</li>
						</ul>
					</div>
					<div className="footer__list">
						<ul className="list">
							<li className="list__item list-item--header">
								<Link href="/investor-relations">
									{t("headers.investor_relations")}
								</Link>
							</li>
							<li className="list__item">
								<Link href="/investor-relations/news-releases">
									{t("headers.new_releases")}
								</Link>
							</li>
							<li className="list__item">
								<Link href="/investor-relations/financial-info">
									{t("headers.financial_info")}
								</Link>
							</li>
							<li className="list__item">
								<Link href="/investor-relations/corporate-filings">
									{t("headers.corporate_filings")}
								</Link>
							</li>
							<li className="list__item">
								<Link href="/investor-relations/share-info">
									{t("headers.share_info")}
								</Link>
							</li>
							<li className="list__item">
								<Link href="/investor-relations/calendar">
									{t("headers.calendar")}
								</Link>
							</li>
							<li className="list__item">
								<Link href="/investor-relations/contact-ir">
									{t("headers.contact_ir")}
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer__subscribe">
					<div className="footer__list">
						<ul className="list">
							<li className="list__item">
								<h3>{t("headers.subscribe_to_newsletter")}</h3>
							</li>
							<li className="list__item">
								<Formik
									initialValues={{
										email: "",
									}}
									validationSchema={Yup.object({
										email: Yup.string()
											.email(`${t("headers.valid_email")}`)
											.required(`${t("headers.required")}`),
									})}
									onSubmit={(values, { setSubmitting, resetForm }) => {
										setSubmitting(false)
										// setTimeout(() => {}, 180000)
										const data = { data: values }
										fetch(`${API_URL}/news-letters`, {
											method: "POST",
											body: JSON.stringify(data),
											headers: {
												"Content-type": "application/json; charset=UTF-8",
											},
										}).then((response) => {
											if (response.status == 200) {
												resetForm()
												setSubmittedSuccessfully(true)
												setTimeout(() => {
													setSubmittedSuccessfully(false)
												}, 10000)
												// router.push("/investor-relations")
											}
										})
									}}
									validateOnBlur={!isMobile}
								>
									{(formik) => (
										<form onSubmit={formik.handleSubmit}>
											{!submittedSuccessfully ? (
												<div className="field-wrapper">
													<div className="input-wrapper">
														<FormTextInput
															name="email"
															type="email"
															placeholder={t("headers.enter_your_email")}
														/>
													</div>
													<button className="icon" type="submit">
														<span>{t("headers.send")}</span>
														<Image
															src={"/icons/send.svg"}
															width="24"
															height="24"
															className="icon__image"
															priority
															alt="send_icon"
														/>
													</button>
												</div>
											) : (
												<ButtonLink
													title={t("headers.thank_you")}
													blue
													customStyle="newletter-form-btn"
													formBtn
													submittedSuccessfully={submittedSuccessfully}
												/>
											)}
										</form>
									)}
								</Formik>
								{/* {successfullSubscription && 
									<div className="successFullMsg">
										<span>Subscribed Successfully!!</span>
									</div>
								} */}
							</li>
							<li className="list__item">
								<p>{t("headers.follow_us")}</p>
							</li>
							<li className="list__item">
								<ul className="social-media">
									<li>
										<a
											href="https://www.linkedin.com/company/orascom-development-holding"
											target="_blank"
											rel="noreferrer"
										>
											<div className="image-container">
												<Image
													src={"/icons/linkedin.svg"}
													width="25"
													height="25"
													priority
													alt="linkedin-logo"
												/>
											</div>
										</a>
									</li>
									<li>
										<a
											href="https://twitter.com/orascomdevelop"
											target="_blank"
											rel="noreferrer"
										>
											<div className="image-container">
												<Image
													src={"/icons/twitter.svg"}
													width="25"
													height="25"
													priority
													alt="twitter-logo"
												/>
											</div>
										</a>
									</li>
									<li>
										<a
											href="https://www.facebook.com/OrascomDevelopment"
											target="_blank"
											rel="noreferrer"
										>
											<div className="image-container">
												<Image
													src={"/icons/facebook.svg"}
													width="25"
													height="25"
													priority
													alt="facebook-logo"
												/>
											</div>
										</a>
									</li>
									<li>
										<a
											href="https://www.instagram.com/orascomdevelopment/?hl=en"
											target="_blank"
											rel="noreferrer"
										>
											<div className="image-container">
												<Image
													src={"/icons/IG.png"}
													width="25"
													height="25"
													priority
													alt="ig-logo"
												/>
											</div>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="copyright-footer">
				<div className="copyright">
					<p>{t("headers.all_rights")}</p>
				</div>
				{/* <div className="Privacy">
					<p>
					{t('headers.terms')} {" "}
					</p>
				</div> */}
			</div>
		</>
	)
}

export default Footer
