const SectionHeader = ({ title, subTitle ,customStyle }) => {
	return (
		<>
			<div className={`section-header-container  ${customStyle}`}>
				{subTitle && <h4>{subTitle}</h4>}
				<h2>{title}</h2>
			</div>
		</>
	)
}

export default SectionHeader
