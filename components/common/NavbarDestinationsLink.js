import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import NavbarDestinationImage from "./NavbarDestinationImage"

const NavbarDestinationsLink = ({ country, destinations }) => {
	const [isHover, toggleHover] = useState(false)


	const toggleHoverMenu = (state) => {
		toggleHover(state)
	}

	const [isHoverCity, toggleHoverCity] = useState(false)
	const toggleHoverMenuCity = (state) => {
		toggleHoverCity(state)
	}

	return (
		<>
			<motion.div
				onHoverStart={() => toggleHoverMenu(true)}
				onHoverEnd={() => toggleHoverMenu(false)}
				className="navbar-destination-link-container"
			>
				<div className={`sub-menu-item country ${isHover ? "active" : ""}`}>
					{country}
				</div>
				<AnimatePresence>
					{isHover && destinations && (
						<motion.div
							key={country}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="menu-selected-destination-container"
							onClick={() => toggleHoverMenuCity(true)}
							// onHoverEnd={() => toggleHoverMenuCity(false)}
						>
							{destinations.sort((a,b)=> a.attributes.order - b.attributes.order).map((destination, index) => (
								<div
									key={destination.id}
									className={`menu-selected-destination  ${
										isHoverCity ? "active" : ""
									}`}
								>
									{/* <NavbarDestinationImage  name={destination.name} image={destination.img} slug={destination.slug}/> */}
									<NavbarDestinationImage
										name={destination?.attributes?.projectName}
										// image={"/home/Rectangle.png"}
										// image={destination?.attributes?.galleryDesktop[0]?.imageDesktop3?.data.attributes.url}
										image={destination?.attributes?.dropdownimage?.data?.attributes?.url}
										alt={destination?.attributes?.altDesktop3}
										slug={destination?.attributes?.slug}
										id={destination?.id}
									/>
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	)
}

export default NavbarDestinationsLink
