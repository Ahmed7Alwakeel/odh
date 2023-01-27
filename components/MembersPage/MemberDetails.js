import BoarderMemberCard from "../AboutPage/BoardMemberCard"
import CardMember from "../AboutPage/CardMember"
import ManagmentMemberCard from "../AboutPage/ManagmentMemberCard"
import Expandable from "../common/Expandable"
import { useContext } from "react";
import { isMobileContext } from "../../contexts/isMobileContext";

const MemberDetails = ({ memberData, managmentId, memberId }) => {
	const { isMobileState } = useContext(isMobileContext);
	const [isMobile, setMobile] = isMobileState;

	return (
		<>
			<div className="member-details-container">
				<div className="member-details__wrapper">
					<div className="member__info">
						{isMobile ? (
							<>
							<quote className="quote">{memberData?.header}</quote>
							</> 
						) : (
							<>
							<h3>{memberData?.name}</h3>
							<quote className="quote">{memberData?.header}</quote>
							</>
						)}
						<div className="member-info__decription">
							<div className="paragraph-container">
							<p className='expanded'>
								{	memberData?.info}
							</p>
							</div> 
						</div>
					</div>
					<div className="member__card">
						{managmentId ? (
							<ManagmentMemberCard
								customStyle={"board-directors__data--wd"}
								image={memberData?.imageDesktop1?.data?.attributes.url}
								imageMobile={memberData?.imageMobile1?.data?.attributes.url}
								name={memberData?.name}
								jobTitle={memberData?.jobTitle}
								id={managmentId}
								iconImg={memberData?.iconImage?.data?.attributes?.url}
							/>
						) : (
							<BoarderMemberCard
								customStyle={"board-directors__data--wd"}
								image={memberData?.imageDesktop1?.data?.attributes?.url}
								imageMobile={memberData?.imageMobile1?.data?.attributes?.url}
								name={memberData?.name}
								jobTitle={memberData?.jobTitle}
								id={memberId}
								iconImg={memberData?.iconImage?.data?.attributes?.url}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default MemberDetails
