// import DestinationCard from "../common/DestinationCard"
import DestinationSightCard from "../common/DestinationSightCard"
import SectionHeader from "../common/SectionHeader"

const DestinationSights = () => {
	const destinationSights = [
		{
			sight: "Labranda Club",
			img: "/destinations/gouna-1.png",
			dest: "El Gouna, Egypt",
		},
		{
			sight: "PANORAMA",
			img: "/destinations/gouna-2.png",
			dest: "El Gouna, Egypt",
		},
		{
			sight: "Movenpick Resort",
			img: "/destinations/gouna-3.png",
			dest: "El Gouna, Egypt",
		},
		{
			sight: "Steigenberger Golf",
			img: "/destinations/gouna-4.png",
			dest: "El Gouna, Egypt",
		},
		{
			sight: "Corners Rihana",
			img: "/destinations/gouna-5.png",
			dest: "El Gouna, Egypt",
		},
		{
			sight: "MS Red Sea",
			img: "/destinations/gouna-6.png",
			dest: "El Gouna, Egypt",
		},
	]
	return (
		<>
			<div className="destination-sights-container">
				<div className="title">
					<SectionHeader title={"El Gouna"} subTitle={"Destination of"} />
				</div>
				<div className="destination-sights-cards-container">
					{destinationSights.map((item, index) => (
						<DestinationSightCard destinationData={item} key={index} />
					))}
				</div>
			</div>
		</>
	)
}

export default DestinationSights
