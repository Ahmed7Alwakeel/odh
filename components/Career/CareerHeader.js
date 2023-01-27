import { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import { isMobileContext } from "../../contexts/isMobileContext"
import { useContext } from "react" 
import Expandable from "../common/Expandable";

 function CareerHeader({headerData}) {
  // const [isShowMore, setIsShowMore] = useState(false); 
  // const toggleReadMore = () => setIsShowMore(show => !show);

  const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState

 
  return (
    <>
    {!isMobile ? (
      <div className="about-orascom-container about-orascom-style4">
       <div className="about-orascom__wrapper"> 
         <div className="about-orascom__header">
           <SectionHeader
             title={headerData?.header2}
            //  subTitle={headerData?.header1}
             customStyle={"header--style-six"}
           /> 
         </div> 
         {/* <div className={`about-orascom__info career-page-info ${isShowMore ? 'expanded' : ''}`}> */}
         <div className={`about-orascom__info career-page-info`}>
          <Expandable data={headerData?.info} inCareerPage/>
           {/* <p>
              {headerData?.info}
           </p> */}
             {/* <span   
                className="read-more" 
                onClick={toggleReadMore}>
               {!isShowMore ? "Load More..." : "Load less"} 
             </span> */}
         </div>
       </div> 
     </div>
    ) : (
      <div className="about-orascom-container about-orascom-style4">
        <div className="about-orascom__wrapper"> 
          <div className="about-orascom__header">
            <SectionHeader
              title={"Careers"} 
              customStyle={"header--style-responsive"}
            /> 
            <div className={`about-orascom__info career-page-info`}>
          <Expandable data={headerData?.info} inCareerPage/>
          </div>
          </div> 
        </div> 
      </div>
    )}
    </> 
  );
 }
 
 export default CareerHeader;