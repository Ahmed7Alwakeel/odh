import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import DestinationMapInfoList from "./DestinationMapInfoList";
import { isMobileContext } from "../../contexts/isMobileContext";
import { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DestinationMapInfoItem from "./DestinationMapInfoItem";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BASE_API_URL } from "../../utils/Data";

const DestinationMapInfo = ({ destinationFeatures, isSuccess }) => {
	const { isMobileState } = useContext(isMobileContext);
	const [isMobile, setMobile] = isMobileState;
	const [modifiedSwiperArr, setModifiedSwiperArr] = useState();

	const array_chunks = (array, chunk_size) =>
		Array(Math.ceil(array.length / chunk_size))
			.fill()
			.map((_, index) => index * chunk_size)
			.map((begin) => array.slice(begin, begin + chunk_size));

	useEffect(() => {
		if (isSuccess && destinationFeatures) {
			const array = array_chunks(
				destinationFeatures?.projectFeatures.projectService,
				4
			);
			setModifiedSwiperArr(array);
		}
	}, [isSuccess, destinationFeatures]);

	return (
		<>
			<div className="destination-map-info-container">
				<div className="left-container">
					{isSuccess && destinationFeatures?.projectMapDesktop.data && (
						<div className="img-container">
							<Image
								src={
									destinationFeatures?.projectMapDesktop?.data?.attributes?.url
								}
								// src={"/about/map/details-egypt-earth.svg"}
								alt="map-img"
								layout="fill"
								objectFit="cover"
							/>
						</div>
					)}
				</div>
				{!isMobile ? (
					<AnimatePresence>
						<div className="right-container">
							<DestinationMapInfoList
								title={destinationFeatures?.projectFeatures?.featureTitle}
								info={destinationFeatures?.projectFeatures?.projectService}
							/>
						</div>
					</AnimatePresence>
				) : (
					<div className="destinations__tabs">
						<div className="title">
							{destinationFeatures?.projectFeatures?.featureTitle}
						</div>
						<Swiper
							breakpoints={{
								767: {
									slidesPerView: 1.5,
								},
							}}
							spaceBetween={12}
							slidesPerView={1}
							modules={[Navigation, Pagination]}
							pagination={{
								el: ".destination-features-progress-bar",
								type: "progressbar",
							}}
							navigation={{
								nextEl: ".destination-features-next",
								prevEl: ".destination-features-prev",
							}}
							className="destination-features-swiper"
						>
							{/* {destinationFeatures?.projectFeatures?.projectService?.map( */}
							{modifiedSwiperArr?.map((dest, index) => (
								/* {modifiedSwiperArr?.map((dest, index) => ( */
								<SwiperSlide key={index}>
									<DestinationMapInfoList
										title={destinationFeatures?.projectFeatures?.featureTitle}
										info={dest}
										key={index}
									/>
								</SwiperSlide>
							))}
							<div className="destination-features-navigation-container">
								<div className="swiper-button-prev destination-features-prev"></div>
								<div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal destination-features-progress-bar"></div>
								<div className="swiper-button-next destination-features-next"></div>
							</div>
						</Swiper>
					</div>
				)}
			</div>
		</>
	);
};

export default DestinationMapInfo;
