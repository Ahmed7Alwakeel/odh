import Image from "next/image"

const DestinationMapInfoItem = ({item}) => {
	return (
		<> 
			<div className="destination-item">
				<div className="img-container">
					{item.serviceIcon && 
						<Image src={item.serviceIcon.data.attributes.url} alt="icon" layout="responsive" width={"3rem"} height={"3rem"} />
					}
				</div>
				<div className="value">{item.serviceInfo}</div>
			</div>
		</>
	)
}

export default DestinationMapInfoItem
