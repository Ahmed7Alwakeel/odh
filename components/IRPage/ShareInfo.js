import { useRouter } from "next/router"
import React from "react"
// import IframeResizer from 'iframe-resizer-react'
import { useState } from "react"
import { useTranslation } from 'next-i18next';
export default function ShareInfo({shareInfo}) {
	const { t } = useTranslation('common');
	// To prevent iframe scroll behaviour on re-render
	const [rendered, setRendered] = useState(false)
	setTimeout(() => {
		setRendered(true)
	}, 500)

	const { locale } = useRouter()

	return (
		<div className="share-info-section">
			<div className="header">
				<h2>{t('investor.share_info')}</h2>
			</div>
			<div className={`iframe-container ${rendered ? "reHeight" : ""}`}>
				{/* <IframeResizer 
                    // heightCalculationMethod="lowestElement"
                    src="https://charts3.equitystory.com/chart/orascom/English/?xdm_e=https%3A%2F%2Fwww.orascomdh.com&xdm_c=default8197&xdm_p=1"
                    // style={{minHeight: '1200'}}
                /> */}
				<iframe
					src={`https://charts3.equitystory.com/chart/orascom/${
						locale == "de" ? "German" : "English"
					}/?xdm_e=https%3A%2F%2Fwww.orascomdh.com&xdm_c=default8197&xdm_p=1`}
				></iframe>
			</div>
			<div className="shareholders-container">
				<div className="title">
					<h3>{t('investor.shareholder_info')}</h3>
				</div>
				<div className="shareholers-list">
					<div className="shareholder">
						<div className="title">As of 31 Dec. 2021</div>
						<div className="number">{t('investor.number_of_share')}</div>
						<div className="percentage">%</div>
					</div>
					<div className="shareholder">
						<div className="title">Samih O. Sawiris et al</div>
						<div className="number">{shareInfo?.data?.attributes?.samih_sawiris_shares}</div>
						<div className="percentage">{shareInfo?.data?.attributes?.samih_sawiris_percentage}</div>
					</div>
					<div className="shareholder">
						<div className="title">{t('investor.free_float')}</div>
						<div className="number">{shareInfo?.data?.attributes?.free_float_shares}</div>
						<div className="percentage">{shareInfo?.data?.attributes?.free_float_percentage}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
