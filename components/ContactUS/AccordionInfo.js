import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	ChakraProvider,
	Box,
	AccordionIcon,
} from "@chakra-ui/react"
import Image from "next/image"
// import { ContactUS } from "../DummyData/ContactUS"

function AccordionInfo({data ,id , index}) {
  return (
    <div className="accordion-contactus-mobile">
      <Accordion allowToggle> 
          <AccordionItem key={index}>
            {({ isExpanded }) => (
              <> 
                <div className="accordion-header">
                  <AccordionButton> 
                    <Box flex='1' textAlign='left'>
                    {data.countryName}
                    </Box>
                    {isExpanded?  
                    <div className="icon-container">
                      <div className="image-wrapper minus">
                        <Image 
                          src="/icons/contact-us/minus.svg"
                          layout="fill"
                          alt="minus"
                          objectFit="cover" 
                        /> 
                      </div>
                    </div>
                    :
                    <div className="icon-container">
                      <div className="image-wrapper">
                        <Image
                          src="/icons/contact-us/pluse.svg"
                          alt="Pepole"
                          objectFit="cover"
                          layout="fill"
                        />
                      </div>
                    </div>
                    } 
                  </AccordionButton>
                </div>
                <AccordionPanel pb={4}>
                  <p className="office">{data.office}</p>
                  <p className="address">
                    {data.address}
                  </p>
                  <ul className="react-tabs__tab-list">
                  <li>
                    <a className="list-item-link" href="tel:5551234567">
                      <div className="icon-container">
                        <div className="image-wrapper">
                          <Image
                            src={data.phoneIcon.data.attributes.url}
                            alt="Pepole"
                            objectFit="cover"
                            layout="fill"
                          />
                        </div>
                      </div>
                      <h2 className="name"> 
                      {data.phoneNumber}
                      </h2>
                    </a>
                  </li>
                  {data.phoneNumber2 && 
                  <li>
                    <a className="list-item-link" href="tel:5551234567">
                      <div className="icon-container">
                        <div className="image-wrapper">
                          <Image
                            src={data.phoneIcon.data.attributes.url}
                            alt="Pepole"
                            objectFit="cover"
                            layout="fill"
                          />
                        </div>
                      </div>
                      <h2 className="name"> 
                      {data.phoneNumber2} 
                      </h2>
                    </a>
                  </li>
                  }
                  <li>
                    <a className="list-item-link" href="mailto:sales@orascomdh.com">
                      <div className="icon-container">
                        <div className="image-wrapper">
                          <Image
                            src={data.emailIcon.data.attributes.url}
                            alt="Pepole"
                            objectFit="cover"
                            layout="fill"
                          />
                        </div>
                      </div>
                      <h2 className="name">
                        <a >
                          {data.email}
                        </a>
                      </h2>
                    </a>
                  </li>
                    <li>
                      <div className="icon-container">
                        <div className="image-wrapper">
                          <Image
                            src={data.urlIcon.data.attributes.url}
                            alt="Pepole"
                            objectFit="cover"
                            layout="fill"
                          />
                        </div>
                      </div>
                      <h2 className="name">
                        <a href="#">
                          {data.url}   
                        </a>
                        </h2>
                    </li> 
                  </ul>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>  
			</Accordion>
		</div>
	)
}

export default AccordionInfo
