import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"

function ImageBackground({ formData }) {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState

	return (
		<>
			{isMobile ? (
				<div className="contact-wrapper-mobile">
					<div className="contact-image">
						<AnimatePresence>
							{formData?.formImageMobile && (
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
										// src="/contact-us/image-contactus.svg"
										src={formData?.formImageMobile?.data?.attributes?.url}
										alt={formData?.altMobile}
										objectFit="cover"
										layout="fill"
										objectPosition={"center 25%"}
									/>
								</motion.div>
							)}
						</AnimatePresence>
						<motion.div className="place-name">
							{formData?.photoCreditMobile}
						</motion.div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	)
}

export default ImageBackground
