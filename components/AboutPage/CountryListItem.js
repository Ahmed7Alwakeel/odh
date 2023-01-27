import Image from "next/image"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"

const CountryListItem = ({
	country,
	setMapUrl,
	setChangeCountry,
	setSelectedCountry,
	flagImg,
	flagImgMobile,
	mapImg,
	setIsBack,
	setActiveSelected
}) => {
	const handelCountryChange = () => {
		// setMapUrl(country.mapImage)
		setMapUrl(mapImg)
		setActiveSelected(-1)
		// setMapUrl('/about/map/egypt-earth.svg')
		setChangeCountry(false)
		setSelectedCountry(country)
		setIsBack(false)
	}

	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState

	return (
		<div onClick={() => handelCountryChange()}>
			<div className="image-wrapper">
				{!isMobile && flagImg && 
				<Image
					src={flagImg}
					alt={`${country.attributes.countryName}-flag`}
					layout={"fill"}
					objectFit={"cover"}
				/>
				}
				{isMobile && flagImgMobile && 
				<Image
					src={flagImgMobile}
					alt={`${country.attributes.countryName}-flag`}
					layout={"fill"}
					objectFit={"cover"}
				/>
				}
			</div>
			<span>{country.attributes.countryName}</span>
		</div>
	)
}

export default CountryListItem
