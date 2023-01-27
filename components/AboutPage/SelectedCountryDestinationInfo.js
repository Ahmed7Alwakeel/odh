import ButtonLink from "../common/ButtonLink"
import { AnimatePresence, motion, useCycle } from "framer-motion"
import {
	moreDestinations,
	selectedCountryList,
	selectedDestinationsItem,
} from "../../utils/Animations";
import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
const SelectedCountryDestinationInfo = ({
	selectedDestinationInfo,
	selectedDestinationID,
	selectedDestinationSlug,
	changeCountry,
	activeSelected,
}) => {
	const { t } = useTranslation('common');
	useEffect(() => {
		const x = 1;
	}, [selectedDestinationInfo]);

	return (
		<>
			<AnimatePresence>
				<motion.div
					className="selected-country-destination-info"
					initial="closed"
					animate="open"
					exit="closed"
					variants={selectedCountryList}
					// key={Math.random(0, 100)}
					key={selectedDestinationInfo?.totalLandAreaNumber}
				>
					<motion.ul
						initial="closed"
						animate="open"
						exit="closed"
						variants={selectedCountryList}
					>
						<motion.li variants={selectedDestinationsItem}>
							<span>
								{" "}
								{parseFloat(
									selectedDestinationInfo?.totalLandAreaNumber
								).toFixed(2)}{" "}
								<sub>
									mn m<sub>2</sub>
								</sub>
							</span>
							<h3> {selectedDestinationInfo?.totalLandArea}</h3>
						</motion.li>
						<motion.li variants={selectedDestinationsItem}>
							<span>
								{" "}
								{parseFloat(
									selectedDestinationInfo?.completedAreaNumber
								).toFixed(2)}{" "}
								<sub>
									mn m<sub>2</sub>
								</sub>
							</span>
							<h3> {selectedDestinationInfo?.completedArea}</h3>
						</motion.li>
						<motion.li variants={selectedDestinationsItem}>
							<span>
								{" "}
								{parseFloat(selectedDestinationInfo?.completedNumber).toFixed(
									2
								)}
								{/* <sub>%</sub> */}
								<sub>
									mn m<sub>2</sub>
								</sub>
							</span>
							<h3>{selectedDestinationInfo?.completed}</h3>
						</motion.li>
					</motion.ul>
					{
						<motion.div
							className={`read-more__map ${
								changeCountry != true && activeSelected != -1
									? ""
									: "opacity-none"
							}`}
							variants={moreDestinations}
						>
							<ButtonLink
								link={`/destinations/${selectedDestinationSlug}`}
								title={t('about.explore_dest')}
								customStyle={"read-more__map--dark-color"}
							/>
						</motion.div>
					}
				</motion.div>
			</AnimatePresence>
		</>
	)
}

export default SelectedCountryDestinationInfo
