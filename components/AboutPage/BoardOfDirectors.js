import { AnimatePresence } from "framer-motion"
import { selectedCountryList } from "../../utils/Animations"
import SectionHeader from "../common/SectionHeader"
import { motion } from "framer-motion"
import BoardMemberCard from "./BoardMemberCard"
// import { people } from "../DummyData/Pepole"
import { forwardRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext, useEffect } from "react"
import { Navigation, Pagination } from "swiper"

// eslint-disable-next-line react/display-name
const BoardOfDirectors = forwardRef(({ boardData, membersData }, ref) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState

	return (
		<>
			<div className="board-directors-container" ref={ref}>
				<div className="board-directors__header">
					<SectionHeader
						title={boardData?.header2}
						subTitle={boardData?.header1}
						customStyle={"header--style-five"}
					/>
				</div>
				<AnimatePresence>
					<motion.div className="board-directors__content">
						{ membersData?.sort((a,b)=> a.attributes.order - b.attributes.order).map((item, index) => (
							<BoardMemberCard
								key={index}
								id={item.id}
								index={index}
								name={item.attributes.card.name}
								info={item.attributes.card.info}
								jobTitle={item.attributes.card.jobTitle}
								slug={item.attributes.slug}
								image={
									item?.attributes?.card?.imageDesktop1?.data?.attributes?.url
								}
								imageMobile={
									item?.attributes?.card?.imageMobile1?.data?.attributes?.url
								}
								alt={item.attributes.card.altDesktop1}
								altMobile={item.attributes.card.altMobile1}
								iconImg={item?.attributes?.card?.iconImage?.data?.attributes?.url}
								iconLink={item.attributes.card.iconLink}
								photoCredit={item.attributes.card.photoCreditDesktop1}
								// image={"/about/Pepole-directors/Rectangle1.png"}
							/>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	)
})

export default BoardOfDirectors
