import Image from "next/image";
import { forwardRef } from "react"
import Expandable from "../common/Expandable";
import SectionHeader from "../common/SectionHeader";

// eslint-disable-next-line react/display-name
const MissionAndVision = forwardRef(({missionData}, ref) => {
	return (
		<div className="mission-and-vision-section" ref={ref}>
			<div className="mission">
				{/* <h2 className="title">{missionData?.header}</h2> */}
				<div className="mission-header">
					<SectionHeader
						title={missionData?.header}
						subTitle={missionData?.sectionPrefix}
						customStyle={"header--style-pl"}
					/>
				</div>
				<h3 className="subtitle">
					{missionData?.title1}
				</h3>
				<div className="img-container">
					<Image src={"/icons/dot.svg"} layout="fill" priority />
				</div>
				<Expandable data={missionData?.desc1} />
				{missionData?.title2 && 
					<h3 className="subtitle">
						{missionData?.title2}
					</h3>
				}
				{missionData?.desc2 && 
				<Expandable data={missionData?.desc2} />
				}
			</div>
		</div>
	)
})
export default MissionAndVision
