/* eslint-disable react/display-name */
import { selectedCountryList } from "../../utils/Animations"
import SectionHeader from "../common/SectionHeader"
import { AnimatePresence, motion, useInView } from "framer-motion"
import BoardMemberCard from "./BoardMemberCard"
import { people } from "../DummyData/Pepole"
import ManagmentMemberCard from "./ManagmentMemberCard"
import { forwardRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper"
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext, useEffect } from "react"
const ManagementTeam = forwardRef(({ managmentTeamData, membersData }, ref) => {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState

	return (
		<>
			<div className="board-directors-container" ref={ref}>
				<div className="board-directors__header">
					<SectionHeader
						title={managmentTeamData?.header2}
						subTitle={managmentTeamData?.header1}
						customStyle={"header--style-five"}
					/>
				</div>
				<AnimatePresence>
					<motion.div className="board-directors__content">
						{membersData?.sort((a, b) => a.attributes.order - b.attributes.order).map((item, index) => (
							<ManagmentMemberCard
								key={index}
								id={item.id}
								index={index}
								name={item.attributes.teamCard.name}
								info={item.attributes.teamCard.info}
								jobTitle={item.attributes.teamCard.jobTitle}
								slug={item.attributes.slug}
								image={
									item?.attributes?.teamCard?.imageDesktop1?.data?.attributes
										?.url
								}
								alt={item.attributes.teamCard.altDesktop1}
								imageMobile={
									item?.attributes?.teamCard?.imageMobile1?.data?.attributes
										?.url
								}
								altMobile={item.attributes.teamCard.altMobile1}
								iconImg={item?.attributes?.teamCard?.iconImage?.data?.attributes?.url}
								iconLink={item.attributes.teamCard.iconLink}
								photoCredit={item.attributes.teamCard.photoCredit}
							/>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	)
})

export default ManagementTeam
