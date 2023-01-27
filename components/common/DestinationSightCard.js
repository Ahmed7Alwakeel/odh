import Image from "next/image"

const DestinationSightCard = ({ destinationData }) => {
	return (
		<>
			<div className="destination-sight-card-container">
				<div className="card-img">
					<Image
						src={destinationData.img}
						layout="fill"
						objectFit="cover"
						alt="dest-location"
					/>
				</div>
				<div className="card-info">
					<div className="location">
						<h2>{destinationData.sight}</h2>
					</div>
					<div className="country">
						<span>{destinationData.dest}</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default DestinationSightCard
