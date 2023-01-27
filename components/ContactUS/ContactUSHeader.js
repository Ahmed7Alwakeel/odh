import { AnimatePresence, motion } from "framer-motion"; 

function ContactUSHeader({header}) {
	return (
		<AnimatePresence>
			<motion.div 
				className="contact-us-container"
				initial={{ 
					y : -50,
					opacity :0,
				}}
				animate={{
					y : 0,
					opacity :1,
					transition: {
						duration: 0.8,
						delay: 0.8, 
					},
				}}
				> 
				<h3>{header}</h3>
			</motion.div>
		</AnimatePresence>
	)
}

export default ContactUSHeader
