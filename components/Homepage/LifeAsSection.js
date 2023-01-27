import ButtonLink from "../common/ButtonLink"
import { useTranslation } from 'next-i18next';
const LifeAsSection = ({ lifeData }) => {
let {t}=useTranslation()
	return (
		<section className="life-section">
			<div className="life-section__wrapper">
				<div className="life-section__header">
					<h2>{lifeData?.header1}</h2>
					<h3>{lifeData?.header2}</h3>
				</div>
				<div className="life-section__info">
					<p>{lifeData?.info}</p>
					<div className="learn-more-container">
						<ButtonLink
							title={lifeData?.ButtonTitle}
							link={lifeData?.ButtonLink} 
							blue
							customStyle={"learn-more"}
						/>
						<ButtonLink
							title={lifeData?.buttonTitle1}
							link={lifeData?.buttonLink1}
							blue
							customStyle={"learn-more"}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LifeAsSection;
