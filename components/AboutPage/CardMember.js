import Image from "next/image"

const CardMember = ({customStyle,Images,names,Info}) => {
  return (
    <>
      <div className={`board-directors__data  ${customStyle}`}> 
        <div className="image-wrapper">
          <Image
            src={Images}
            alt="Pepole"
            objectFit='top'
            layout="fill"
            width={100}
            height={100}
          />
        </div> 
        <div className="info">
          <h3>{names}</h3>
          <span>{Info}</span>
          <div className="wrapper__icon">
            <Image
              src={"/about/Pepole-directors/linkedin.svg"}
              alt="Pepole"
              objectFit='cover'
              layout="responsive"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CardMember;