import Image from "next/image"
import ButtonLink from "../common/ButtonLink"
// import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
const MediaCenterCard = ({ mediaInfo, isSuccess }) => {
	const { t } = useTranslation('common');
	return (
		<>
			<div className="media-center-slider-card-container">
				<div className="media-date-container">
					<div className="date-icon-container">
						<Image
							src={"/icons/calendar_today2.svg"}
							alt="calendar"
							layout="fill"
							priority
						/>
					</div>
					{/* <div className="media-date">{parse(`${isSuccess && data.rss.channel.item[0].pubDate }`)}</div> */}
					<div className="media-date">
						{mediaInfo.pubDate.slice(0, mediaInfo.pubDate.indexOf(":") - 3)}
					</div>
				</div>
				<div className="media-heading-container">
					{mediaInfo.title['#cdata']}
				</div>
				<div className="media-author-container">{mediaInfo.type == "EQS-Ad-hoc" ? `${t('investor.ad_hoc')}` : `${t('investor.press_release')}`}</div>
				<ButtonLink title={t('home.read_more')} link={`/news/${mediaInfo?.newsID}`} />
			</div>
		</>
	)
}

export default MediaCenterCard
