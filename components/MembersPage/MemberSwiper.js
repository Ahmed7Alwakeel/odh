import SectionHeader from "../common/SectionHeader"
import Image from "next/image"
import CardMember from "../AboutPage/CardMember"
import BoarderMemberCard from "../AboutPage/BoardMemberCard"
import { useState, useEffect, useContext } from "react"
import ManagmentMemberCard from "../AboutPage/ManagmentMemberCard"
import { isMobileContext } from "../../contexts/isMobileContext"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"

import "swiper/css/pagination"
import { Navigation, Pagination, FreeMode } from "swiper"
import { useTranslation } from "next-i18next"
const MemberSwiper = ({ membersData, memberId, managmentId }) => {
	let { t } = useTranslation("common")
	const [otherMembersData, setOtherMembersData] = useState()
	useEffect(() => {
		const filterData = membersData?.filter((member) => member.attributes.slug != memberId)
		setOtherMembersData(filterData)
	}, [membersData, memberId])

	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState 

	return (
		<>
			<div className="member-swiper-container">
				<div className="about-orascom__header">
					<SectionHeader
						title={t('about.othe_board')}
						subTitle={t('about.we_are')}
						customStyle={"header--style-five"}
					/>
				</div>
				<div className="member-swiper__wrapper">
					{isMobile ? (
						<> 
							{otherMembersData?.map((item, i) => ( 
								<>
								{managmentId ? ( 
									<>
									<ManagmentMemberCard
										customStyle={"board-directors__data--wd-100"}
										id={item.id}
										name={item.attributes.teamCard.name}
										info={item.attributes.teamCard.info}
										jobTitle={item.attributes.teamCard.jobTitle}
										// quote={item.attributes.teamCard.header}
										slug={item.attributes.slug}
										imageMobile={item.attributes.teamCard?.imageMobile1?.data.attributes.url}
										iconImg={item?.attributes?.teamCard?.iconImage?.data?.attributes?.url}
									/>
									</>
								) : (
									<BoarderMemberCard
										customStyle={"board-directors__data--wd-100"}
										id={item.id}
										name={item.attributes.card.name}
										info={item.attributes.card.info}
										jobTitle={item.attributes.card.jobTitle}
										// quote={item.attributes.card.header}
										slug={item.attributes.slug}
										imageMobile={item.attributes.card.imageMobile1?.data.attributes.url}
										iconImg={item.attributes.card.iconImage?.data?.attributes?.url}
									/> 
								)} 
								</>
							))} 
						</>
					) : (
						<Swiper
							spaceBetween={40}
							slidesPerView={3}
							modules={[Navigation, Pagination]}
							pagination={{
								el: ".orascom-manager-details-progress-bar",
								type: "progressbar",
							}}
							navigation={{
								nextEl: ".orascom-manager-details-next",
								prevEl: ".orascom-manager-details-prev",
							}}
						>
							{otherMembersData?.map((item, i) => (
								<SwiperSlide key={i}>
									{managmentId ? (
										<ManagmentMemberCard
											customStyle={"board-directors__data--wd-100"}
											id={item.id}
											name={item.attributes.teamCard.name}
											info={item.attributes.teamCard.info}
											quote={item.attributes.teamCard.header}
											jobTitle={item.attributes.teamCard.jobTitle}
											slug={item.attributes.slug}
											image={item?.attributes?.teamCard?.imageDesktop1?.data?.attributes.url}
											iconImg={item?.attributes?.teamCard?.iconImage?.data?.attributes?.url}
											alt={item.attributes.teamCard.altDesktop1}
											altMobile={item.attributes.teamCard.altMobile1}
											iconLink={item?.attributes?.teamCard?.iconLink}
											photoCredit={item.attributes.teamCard.photoCreditDesktop1}
										/>
									) : (
										<BoarderMemberCard
											customStyle={"board-directors__data--wd-100"}
											id={item.id}
											name={item.attributes.card.name}
											info={item.attributes.card.info}
											jobTitle={item.attributes.card.jobTitle}
											quote={item.attributes.card.header}
											slug={item.attributes.slug}
											image={item.attributes.card.imageDesktop1.data.attributes.url}
											iconImg={item?.attributes?.card?.iconImage?.data?.attributes?.url}
											alt={item.attributes.card.altDesktop1}
											altMobile={item.attributes.card.altMobile1}
											iconLink={item?.attributes?.card?.iconLink}
											photoCredit={item.attributes.card.photoCreditDesktop1}
										/>
									)}
								</SwiperSlide>
							))}
					<div className="orascom-manager-details-navigation-container">
						<div className="swiper-button-prev orascom-manager-details-prev"></div>
						<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal orascom-manager-details-progress-bar"></div>
						<div className="swiper-button-next orascom-manager-details-next"></div>
					</div>
						</Swiper>
					)}
				</div>
			</div>
		</>
	)
}

export default MemberSwiper

// import SectionHeader from "../common/SectionHeader"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Navigation, Pagination } from "swiper"
// import { isMobileContext } from "../../contexts/isMobileContext"
// import BoarderMemberCard from "../AboutPage/BoardMemberCard"
// import { useState,useEffect , useContext  } from "react"
// import ManagmentMemberCard from "../AboutPage/ManagmentMemberCard"
// import Image from "next/image"
// import CardMember from "../AboutPage/CardMember"

// const MemberSwiper = ({ membersData,memberId,managmentId }) => {
// 	const [otherMembersData,setOtherMembersData]=useState()
// 	useEffect(() => {
// 	  const filterData=membersData?.filter(member=>member.id!=memberId)
// 	  setOtherMembersData(filterData)

// 	}, [membersData,memberId])

// 	const { isMobileState } = useContext(isMobileContext)
// 	const [isMobile, setMobile] = isMobileState
// 	return (
// 		<>
// 			<div className="member-swiper-container">
// 				<div className="about-orascom__header">
// 					<SectionHeader
// 						title={"Other team members"}
// 						subTitle={"We Are ORASCOM"}
// 						customStyle={"header--style-five"}
// 					/>
// 				</div>
// 				<div className="member-swiper__wrapper">
// 				{isMobile ? (
// 					<>
// 					<Swiper
// 					spaceBetween={40}
// 					slidesPerView={1}
// 				>
// 					{otherMembersData?.map((item, i) => (
// 						<SwiperSlide key={i}>
// 							{managmentId?
// 							<ManagmentMemberCard
// 							customStyle={"board-directors__data--wd-100"}
// 							id={item.id}
// 							name={item.attributes.teamCard.name}
// 							info={item.attributes.teamCard.info}
// 							jobTitle={item.attributes.teamCard.jobTitle}
// 							slug={item.attributes.teamCard.slug}
// 							image={"/about/Pepole-directors/Rectangle1.png"}
// 						/>
// 							:
// 							<BoarderMemberCard
// 								customStyle={"board-directors__data--wd-100"}
// 								id={item.id}
// 								name={item.attributes.card.name}
// 								info={item.attributes.card.info}
// 								jobTitle={item.attributes.card.jobTitle}
// 								slug={item.attributes.card.slug}
// 								image={"/about/Pepole-directors/Rectangle1.png"}
// 							/>
// 							}
// 						</SwiperSlide>
// 					))}
// 					</Swiper>

// 				 </>
// 					) : (
// 					<Swiper
// 						spaceBetween={40}
// 						slidesPerView={3}
// 						modules={[Navigation, Pagination]}
// 					>
// 						{otherMembersData?.map((item, i) => (
// 							<SwiperSlide key={i}>
// 								{managmentId?
// 								<ManagmentMemberCard
// 								customStyle={"board-directors__data--wd-100"}
// 								id={item.id}
// 								name={item.attributes.teamCard.name}
// 								info={item.attributes.teamCard.info}
// 								jobTitle={item.attributes.teamCard.jobTitle}
// 								slug={item.attributes.teamCard.slug}
// 								image={"/about/Pepole-directors/Rectangle1.png"}
// 							/>
// 								:
// 								<BoarderMemberCard
// 									customStyle={"board-directors__data--wd-100"}
// 									id={item.id}
// 									name={item.attributes.card.name}
// 									info={item.attributes.card.info}
// 									jobTitle={item.attributes.card.jobTitle}
// 									slug={item.attributes.card.slug}
// 									image={"/about/Pepole-directors/Rectangle1.png"}
// 								/>
// 								}
// 							</SwiperSlide>
// 						))}
// 					</Swiper>
// 					)}
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default MemberSwiper
