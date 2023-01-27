import Image from "next/image"
import { useContext, useState } from "react"
import SelectedCountryDestinations from "./SelectedCountryDestinations"
import { AnimatePresence, motion } from "framer-motion"
import {
	selectedCountryList,
	selectedDestinationsItem,
} from "../../utils/Animations"
import { isMobileContext } from "../../contexts/isMobileContext"

const SelectedCountryDetails = ({
	selectedCountry,
	setSelectedDestinationInfo,
	setSelectedDestinationID,
	setSelectedDestinationSlug,
	activeSelected,
	setActiveSelected,
	setMobileDestMapInView,
}) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState

	return (
		<>
			<motion.div
				className="SelectedCountryDetails"
				initial="closed"
				animate="open"
				exit="closed"
				variants={selectedCountryList}
			>
				{!isMobile && (
					<div className="SelectedCountryDetails__wrapper">
						<div className="image-wrapper">
							{!isMobile && selectedCountry?.attributes.countryIconDesktop && (
								<Image
									src={
										selectedCountry?.attributes.countryIconDesktop.data
											.attributes.url
									}
									alt={`${selectedCountry.attributes.countryName}-flag`}
									layout={"fill"}
									objectFit={"cover"}
								/>
							)}
							{isMobile && selectedCountry?.attributes.countryIconMobile && (
								<Image
									src={
										selectedCountry?.attributes.countryIconMobile.data
											.attributes.url
									}
									alt={`${selectedCountry.attributes.countryName}-flag`}
									layout={"fill"}
									objectFit={"cover"}
								/>
							)}
						</div>
						<span>{selectedCountry?.attributes?.countryName}</span>
					</div>
				)}
				<motion.ul
					className="SelectedCountryDetails__list"
					initial="closed"
					animate="open"
					exit="closed"
					variants={selectedCountryList}
				>
					{selectedCountry?.attributes?.projects?.data
						?.sort((a, b) => a.attributes.order - b.attributes.order)
						.map((destination, index) => (
							<motion.li
								key={index}
								onClick={() => {
									setActiveSelected(index)
									if (isMobile) {
										setMobileDestMapInView(true)
									}
								}}
								variants={selectedDestinationsItem}
								whileHover={{
									scale: 1.1,
								}}
							>
								<SelectedCountryDestinations
									setSelectedDestinationInfo={setSelectedDestinationInfo}
									setSelectedDestinationID={setSelectedDestinationID}
									setSelectedDestinationSlug={setSelectedDestinationSlug}
									destination={destination}
									index={index}
									activeSelected={activeSelected}
								/>
							</motion.li>
						))}
				</motion.ul>
			</motion.div>
		</>
	)
}

export default SelectedCountryDetails
