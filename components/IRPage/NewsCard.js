
import React from 'react'
import Image from "next/image"
import ButtonLink from '../common/ButtonLink'
import { useTranslation } from 'next-i18next';
const NewsCard = ({mediaInfo}) => {
    const { t } = useTranslation('common');
    return (
        <div className='news-main-card '>
            <div className='card-date'>
                <div className="date-icon-container">
                    <Image
                        src={"/icons/calendar_today2.svg"}
                        alt="calendar"
                        layout="fill"
                        priority
                    />
                </div>
                <div className='date-header'>{mediaInfo.pubDate.slice(0, mediaInfo.pubDate.indexOf(":") - 3)}</div>
            </div>
            <div className='card-description'>
            {mediaInfo.title['#cdata']}
            </div>
            <div className='card-type'>
            {mediaInfo.type == "EQS-Ad-hoc" ? `${t('investor.ad_hoc')}` : `${t('investor.press_release')}`}
            </div>
            <ButtonLink title={t('investor.read_more')} link={`/news/${mediaInfo?.newsID}`} />
        </div>
    )
}

export default NewsCard

