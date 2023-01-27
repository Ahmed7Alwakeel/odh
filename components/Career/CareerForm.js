import SectionHeader from "../common/SectionHeader";
import Image from "next/image"
import FormSteps from "./FormSteps";
import Expandable from "../common/Expandable";

function CareerForm({headerData, locationOptions}) {
  return (
    <div className="career-orascom-form-container">
      <div className="career-orascom-form-wrapper">
        <div className="career-form__info">
          <div className="about-orascom-container about-orascom-style3">
            <div className="about-orascom__wrapper"> 
              <div className="about-orascom__header">
                <SectionHeader
                  title={headerData?.header} 
                  customStyle={"header--style-four"}
                /> 
              </div> 
              <div className="about-orascom__info">
                {/* <Expandable data={headerData?.info} /> */}
                <p>
                {headerData?.info}
                </p>
              </div>
            </div> 
            <div className="orascom__logo-wrapper">
              <div className="image-wrapper"> 
                <Image src="/career/dots.svg"
                  alt="dots" 
                  layout="fill" 
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="career-form__steps-wrapper">
          <FormSteps locationOptions={locationOptions}/>
        </div>
      </div>
    </div>
  );
}

export default CareerForm;