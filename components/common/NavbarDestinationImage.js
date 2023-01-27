import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link'
import { isMobileContext } from "../../contexts/isMobileContext";
import { useContext } from "react";

function NavbarDestinationImage({ name,image , slug, id, alt }) {
	const [isHoverCity, toggleHoverCity] = useState(false);
	const toggleHoverMenuCity = () => {
		toggleHoverCity(!isHoverCity)
	}

	const { setIsDestMenuOpened } = useContext(isMobileContext)

	return (
		<div>
			<motion.div
				onHoverStart={toggleHoverMenuCity}
				onHoverEnd={toggleHoverMenuCity}
				className="navbar-destination-link-container destination-link"
			>
					<div className={`sub-menu-item ${isHoverCity ? "active" : ""}`} onClick={() => {setIsDestMenuOpened(false)}}>
					{/* <Link href={`/destinations/${slug}`}> */}
					{/* <Link href={`/destinations/${id}`}> */}
					<Link href={`/destinations/${slug}`}>
					{name}
					</Link>
				</div>
				<AnimatePresence>
					{isHoverCity && (
						<motion.div
							// key={imgSrc}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							// className="menu-selected-destination-container"
						>
							<div className="destination-image-container">
								{image && 
									<Image
										priority={true}
										objectFit="cover"
										layout="fill"
										src={image}
										alt={alt}
									/>
								}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}

export default NavbarDestinationImage
