import React, { useContext, useState } from "react";
import { isMobileContext } from "../../contexts/isMobileContext";
import { useTranslation } from 'next-i18next';
export default function Expandable({ data, inCareerPage, inMapSection, inAboutPage }) {
	const { isMobileState } = useContext(isMobileContext);
	const [isMobile, setMobile] = isMobileState;
	const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation('common');
	return (
        <div className="paragraph-container" style={{textAlign: isMobile ? 'justify' : 'unset'}}>
            <p className={`${expanded ? 'expanded' : ''}`}>
                {data}
            </p>
            {(isMobile || inMapSection || inCareerPage || inAboutPage) && data && <span className="read-more-less-btn" onClick={() => {setExpanded(!expanded)}}>{expanded ? t('about.read_less') : t('about.read_more')}</span>}
        </div>
	);
}
