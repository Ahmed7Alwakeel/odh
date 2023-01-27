const SelectedCountryDestinations = ({
	destination,
	allNumbers,
	setSelectedDestinationInfo,
	setSelectedDestinationID,
	setSelectedDestinationSlug,
	activeSelected,
	index,
}) => {
	return (
		<>
			<span
				onClick={() => {
					setSelectedDestinationInfo(destination?.attributes)
					setSelectedDestinationID(destination?.id)
					setSelectedDestinationSlug(destination?.attributes.slug)
				}}
				className={
					activeSelected == index
						? "selected-Destination active"
						: "selected-Destination "
				}
			>
				{destination?.attributes?.projectName}
			</span>
		</>
	)
}

export default SelectedCountryDestinations
