import Image from "next/image";
import React from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
export default function ContactIR({contactData}) {
	const { t } = useTranslation('common');
	const { locale } = useRouter()

	return (
		<div className="contact-ir-section">
			<div className="section-header">
				<h2>{contactData?.header}</h2>
			</div>
			<div className="contacts-info">
				<h4 className="title">{contactData?.contactir.title}</h4>
				<div className="contacts-items">
					<div className="item">
						<div className="icon-container">
							{contactData?.contactir.phoneIcon1 && (
								<Image
									src={contactData?.contactir.phoneIcon1.data.attributes.url}
									alt="alt"
									width={16}
									height={16}
									objectFit="fill"
								/>
							)}
							{/* <svg
								width="24"
								height="24"
								xmlns="http://www.w3.org/2000/svg"
								fillRule="evenodd"
								clipRule="evenodd"
							>
								<path d="M16 22.621l-3.521-6.795c-.007.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.082-1.026-3.492-6.817-2.106 1.039c-1.639.855-2.313 2.666-2.289 4.916.075 6.948 6.809 18.071 12.309 18.045.541-.003 1.07-.113 1.58-.346.121-.055 2.102-1.029 2.11-1.033zm-2.5-13.621c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
							</svg> */}
						</div>
						<a href={`tel://${contactData?.contactir.phone1}`}>
							{contactData?.contactir.phone1}
						</a>
					</div>
					<div className="item">
						<div className="icon-container">
							{contactData?.contactir.profileIcon && (
								<Image
									src={contactData?.contactir.profileIcon.data.attributes.url}
									alt="alt"
									width={16}
									height={16}
									objectFit="fill"
								/>
							)}
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
							</svg> */}
						</div>
						<a className="CFO">
							{contactData?.contactir.name} <br />{" "}
							{contactData?.contactir.jobTitle}
						</a>
					</div>
					<div className="item">
						<div className="icon-container">
							{contactData?.contactir.phoneIcon2 && (
								<Image
									src={contactData?.contactir.phoneIcon2.data.attributes.url}
									alt="alt"
									width={16}
									height={16}
									objectFit="fill"
								/>
							)}
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm1.5 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-14.024h10v14.024z" />
							</svg> */}
						</div>
						<a href={`tel://${contactData?.contactir.phone2}`}>
							{contactData?.contactir.phone2}
						</a>
					</div>
					<div className="item">
						<div className="icon-container">
							{contactData?.contactir.emailIcon && (
								<Image
									src={contactData?.contactir.emailIcon.data.attributes.url}
									alt="alt"
									width={16}
									height={16}
									objectFit="fill"
								/>
							)}
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
							</svg> */}
						</div>
						<a
							href={`mailto:${contactData?.contactir.email}`}
							target="_blank"
							rel="noreferrer"
						>
							{" "}
							{contactData?.contactir.email}
						</a>
					</div>
				</div>
			</div>
			<div className="contact-form">
				<div className="header">
					<h3>{t('investor.email_sub')}</h3>
				</div>
				<iframe
					src={`https://irpages2.eqs.com/websites/orascomdevelopment/${
						locale == "de" ? "German" : "English"
					}/9010/contact-manager.html?iframe=true`}
				></iframe>
			</div>
		</div>
	)
}
