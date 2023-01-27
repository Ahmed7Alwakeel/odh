import DestinationCard from "./DestinationCard"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper";
const DestinationsSwipper = ({ destData }) => {
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="w-100"
        breakpoints={
          {
            768: {
              slidesPerView: 1.7
            }
          }
        } >
        {destData?.attributes?.projects?.data?.map((dest, i) => (
            <SwiperSlide key={i}>
              <DestinationCard
              key={i}
              imgSrc={"/home/tab-destinations/Elgouna2.png"}
              logoSrc={"/destinations/El-Gouna.png"}
              title={dest.attributes.projectName}
              description={dest.attributes.projectInfo}
              slug={dest.slug}
            />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
export default DestinationsSwipper