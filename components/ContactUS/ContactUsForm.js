import Image from "next/image"
import ContactUsInput from "./ContactUsInput"
import { AnimatePresence, motion } from "framer-motion"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"

function ContactUsForm({ formData }) {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	return (
		<div className="contact-form-container">
			<div className="contact-wrapper">
				<div className="contact-form">
					<ContactUsInput formData={formData} />
				</div>
				{!isMobile ? (
					<div className="contact-image">
						<AnimatePresence>
							{formData?.formImageDesktop && (
								<motion.div
									className="image-wrapper"
									initial={{
										scale: 1.1,
									}}
									whileInView={{
										scale: 1,
										transition: {
											duration: 1.5,
											delay: 0.4,
											ease: [0.6, -0.05, 0.01, 0.99],
										},
									}}
									exit={{ scale: 1 }}
									viewport={{ once: true }}
								>
									<Image
										src={formData?.formImageDesktop?.data?.attributes?.url}
										alt={formData?.altDesktop}
										objectFit="cover"
										layout="fill"
									/>
								</motion.div>
							)}
						</AnimatePresence>
							<motion.div className="place-name">{formData?.photoCreditDesktop}</motion.div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	)
}

export default ContactUsForm
