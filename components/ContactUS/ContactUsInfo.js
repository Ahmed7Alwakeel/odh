import ContactUsInfoDetails from "./ContactUsInfoDetails"
import { ContactUS } from "../DummyData/ContactUS"
import { AnimatePresence, motion } from "framer-motion"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react"
import AccordionInfo from "./AccordionInfo"

function ContactUsInfo({ contactInfo }) {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	return (
		<div className="contact-us-info-container">
			{!isMobile ? (
				<motion.div className="contact-us-wrapper">
					<AnimatePresence>
						{contactInfo?.map((item, index) => (
							<ContactUsInfoDetails
								key={index}
								data={item}
								id={item.id}
								index={index}
							/>
						))}
					</AnimatePresence>
				</motion.div>
			) : (
				<>
					{contactInfo?.map((item, index) => (
						<AccordionInfo key={index} data={item} id={item.id} index={index} />
					))}
				</>
				//accordion
			)}
		</div>
	)
}

export default ContactUsInfo
