import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { selectedDestinationsItem } from "../../utils/Animations"

function ContactUsInfoDetails({ data, id, index }) {
	return (
		<>
			<AnimatePresence>
				<motion.div
					className="contact-us-data"
					variants={selectedDestinationsItem}
					whileInView={{
						opacity: 1,
						transition: {
							delay: 0.5 + parseInt(index) / 3,
						},
					}}
					initial={"closed"}
					viewport={{ once: true, amount: 0.2 }}
				>
					<div className="contact-us-info-wrapper">
						<div className="contact-us-info">
							<div className="icon-container">
								<div className="image-wrapper">
									<Image
										src={data.iconImage.data.attributes.url}
										alt="Pepole"
										objectFit="cover"
										layout="fill"
									/>
								</div>
							</div>
							<h2 className="name">{data.countryName}</h2>
						</div> 
						<p className="office">{data.office}</p>
						<p className="address">{data.address}</p>
						<ul className="contact-us-list">
							<li>
								<a className="list-item-link" href="tel:5551234567">
									<div className="icon-container">
										<div className="image-wrapper">
											<Image
												src={data.phoneIcon.data.attributes.url}
												alt="Pepole"
												objectFit="cover"
												layout="fill"
											/>
										</div>
									</div>
									<h2 className="name">
										<a href="tel:5551234567">{data.phoneNumber}</a>
									</h2>
								</a>
							</li>
							{data.phoneNumber2 && (
								<li>
									<a className="list-item-link" href="tel:5551234567">
										<div className="icon-container">
											<div className="image-wrapper">
												<Image
													src={data.phoneIcon.data.attributes.url}
													alt="Pepole"
													objectFit="cover"
													layout="fill"
												/>
											</div>
										</div>
										<h2 className="name">
											<a href="tel:5551234567">{data.phoneNumber2}</a>
										</h2>
									</a>
								</li>
							)}
							<li>
								<a className="list-item-link" href="mailto:sales@orascomdh.com">
									<div className="icon-container">
										<div className="image-wrapper">
											<Image
												src={data.emailIcon.data.attributes.url}
												alt="Pepole"
												objectFit="cover"
												layout="fill"
											/>
										</div>
									</div>
									<h2 className="name">
										<a href="mailto:sales@orascomdh.com">{data.email}</a>
									</h2>
								</a>
							</li>
							<li>
								<div className="icon-container">
									<div className="image-wrapper">
										<Image
											src={data.urlIcon.data.attributes.url}
											alt="Pepole"
											objectFit="cover"
											layout="fill"
										/>
									</div>
								</div>
								<h2 className="name">
									<a href={data.url} target="_blank" rel="noreferrer">
										{data.url}
									</a>
								</h2>
							</li>
						</ul>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	)
}

export default ContactUsInfoDetails
