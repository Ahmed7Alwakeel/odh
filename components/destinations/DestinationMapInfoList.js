import { AnimatePresence, motion } from "framer-motion"
import { useContext } from "react";
import { isMobileContext } from "../../contexts/isMobileContext";
import { selectedDestinationsItem } from "../../utils/Animations"
import DestinationMapInfoItem from "./DestinationMapInfoItem"

const DestinationMapInfoList = ({ info, title }) => {
	const { isMobileState } = useContext(isMobileContext);
	const [isMobile, setMobile] = isMobileState;

	return (
		<>
			<motion.div
				className="destination-map-info-list-container"
				variants={selectedDestinationsItem}
				whileInView={{
					opacity: 1,
					transition: { delay: 0.2 + parseInt(info?.id) / 10 },
				}}
				initial={"closed"}
				viewport={{ once: true, amount: 0.2 }}
			>
				{!isMobile && 
				<div className="title">{title}</div>
				}
				<AnimatePresence>
					<motion.div className="icons-container">
							{info?.map((item, index) => (
								<DestinationMapInfoItem item={item} key={index} />
							))}
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</>
	)
}

export default DestinationMapInfoList
