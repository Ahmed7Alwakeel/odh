import Image from "next/image";
import { isMobileContext } from "../../contexts/isMobileContext";
import { useContext } from "react";
import { useTranslation } from "next-i18next";

function DestinationContact({ destData, isSuccess, destSlug }) {
	const { t } = useTranslation("common");
	const { isMobileState } = useContext(isMobileContext);
	const [isMobile, setMobile] = isMobileState;

	const othersLearnMore = [
		{
			dest: "Chbika",
			mobileIcon: "/icons/mobile.png",
			mobileNumber: "+ 212 5 22 543 543",
			emailIcon: "/icons/email.svg",
			email: "info@others.com",
			socialMedia: [
				{
					icon: "/icons/facebook.svg",
					url: "https://www.facebook.com/chbika/?fref=ts",
				},
				{
					icon: "/icons/youtube.png",
					url: "https://www.youtube.com/channel/UCNQBIn3pBjIhilfzBB-tCgg",
				},
			]
		},
		{
			dest: "As Sodah Islad",
			mobileIcon: "/icons/mobile.png",
			mobileNumber: "+968 2464 5555",
			emailIcon: "/icons/mobile.png",
			email: "+968 2464 6911",
			// socialMedia: [
			// 	{
			// 		icon: "/icons/facebook.svg",
			// 		url: "www.google.com",
			// 	},
			// 	{
			// 		icon: "/icons/youtube.png",
			// 		url: "www.google.com",
			// 	},
			// ],
			websiteLink: "http://www.muriya.om/our-developments",
		},
		{
			dest: "City Walk",
			mobileIcon: "/icons/mobile.png",
			mobileNumber: "+968 2464 5555",
			emailIcon: "/icons/mobile.png",
			email: "+968 2464 6911",
			// socialMedia: [
			// 	{
			// 		icon: "/icons/facebook.svg",
			// 		url: "www.google.com",
			// 	},
			// 	{
			// 		icon: "/icons/youtube.png",
			// 		url: "www.google.com",
			// 	},
			// ],
			websiteLink: "http://www.muriya.om/our-developments",
		},
	];

	return (
		<>
			{destSlug !== "others" && (
				<div className="destination-contact-card">
					<div className="destination-container">
						<h2 className="destination-contact-title">
							{t("about.learn_more_about_this")} {destData?.projectName}
						</h2>
						<div className="destination-data-wrapper">
							<div className="destination-data-team">
								<h3 className="destination-data-name">
									{t("about.connect_with_sales_team")}
								</h3>
								<div className="destination-info-wrapper">
									<div className="destination-info">
										<div className={`icon-container first`}>
											<div className="image-wrapper">
												{destData?.learnmore?.phoneIcon && (
													<Image
														src={
															destData?.learnmore?.phoneIcon.data.attributes.url
														}
														alt="Pepole"
														width={20}
														height={20}
													/>
												)}
											</div>
										</div>
										<h2 className="name">
											<a href={`tel:${destData?.learnmore?.phone}`}>
												{destData?.learnmore?.phone}
											</a>
										</h2>
									</div>
									<div className="destination-info">
										<div className={`icon-container`}>
											<div className="image-wrapper">
												{destData?.learnmore?.emailIcon && (
													<Image
														src={
															destData?.learnmore?.emailIcon.data.attributes.url
														}
														alt="Pepole"
														width={20}
														height={17}
													/>
												)}
											</div>
										</div>
										<h2 className="name">
											<a href={`mailto:${destData?.learnmore?.email}`}>
												{destData?.learnmore?.email}
											</a>
										</h2>
									</div>
								</div>
							</div>
							<div className="destination-data-social">
								<div className="destination-social-wrapper">
									<h3 className="destination-data-name">
										{t("about.connect_with_social_team")}
									</h3>
									<div className="destination-social-icons">
										{destData?.learnmore?.socialMedia.map((item, id) => (
											<div className="icon-container" key={id}>
												<div className="image-wrapper">
													<a
														href={item.link}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Image
															src={item.icon.data.attributes.url}
															alt={item.icon.data.attributes.name}
															width={20}
															height={20}
														/>
													</a>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="destination-card-button">
									<div className="button-wrapper">
										<a
											href={destData?.learnmore?.ButtonLink}
											target="_blank"
											rel="noopener noreferrer"
										>
											{destData?.learnmore?.ButtonTitle}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{destSlug == "others" && (
				<div className="others-destinations-cards">
					{othersLearnMore.map((dest, index) => (
						<div key={index} className="destination-contact-card">
							<div className="destination-container">
								<h2 className="destination-contact-title">
									{t("about.learn_more_about_this")} {dest.dest}
								</h2>
								<div className="destination-data-wrapper">
									<div className={`destination-data-team ${index != 0 ? 'not-bordered' : ''}`}>
										<h3 className="destination-data-name">
											{index == 0 ? 
											t("about.connect_with_morroco_team")
											:
											t("about.connect_with_oman_team")
											}

										</h3>
										<div className="destination-info-wrapper">
											<div className="destination-info">
												<div className={`icon-container first`}>
													<div className="image-wrapper">
														<Image
															src={dest.mobileIcon}
															alt="mobile_logo"
															width={20}
															height={20}
														/>
													</div>
												</div>
												<h2 className="name">
													<a href={`tel:${dest.mobileNumber}`}>
														{dest.mobileNumber}
													</a>
												</h2>
											</div>
											<div className="destination-info">
												<div className={`icon-container`}>
													<div className="image-wrapper">
														{dest.emailIcon && (
															<Image
																src={dest.emailIcon}
																alt="Pepole"
																width={20}
																height={17}
															/>
														)}
													</div>
												</div>
												<h2 className="name">
													<a href={`mailto:${dest.email}`}>{dest.email}</a>
												</h2>
											</div>
										</div>
									</div>
									<div className={`destination-data-social ${index != 0 ? 'not-first' : ''}`}>
											{dest.socialMedia && (
										<div className="destination-social-wrapper">
												<h3 className="destination-data-name">	
													{t("about.connect_with_social_team")}
												</h3>
											<div className="destination-social-icons">
												{dest?.socialMedia?.map((item, id) => (
													<div className="icon-container" key={id}>
														<div className="image-wrapper">
															<a
																href={item.url}
																target="_blank"
																rel="noopener noreferrer"
															>
																{item.icon && (
																	<Image
																		src={item.icon}
																		alt="social_icon"
																		width={20}
																		height={20}
																	/>
																)}
															</a>
														</div>
													</div>
												))}
											</div>
										</div>
																					)}

										{dest.websiteLink && 
											<div className="destination-card-button">
												<div className="button-wrapper">
													<a
														href={dest.websiteLink}
														target="_blank"
														rel="noopener noreferrer"
													>
														Visit Website
													</a>
												</div>
											</div>
										}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default DestinationContact;
