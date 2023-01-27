import { useTranslation } from "next-i18next";
import React from "react";
import { useState } from "react";

export default function LatestResults({ latestFinancialData }) {
	const [audioIsPlaying, setAudioIsPlaying] = useState(false);

	// We could sort them by id as 2022 was added first on CMS, but in the next years, 2023 for example will have the last id in the list, and so on..
	// So it's better to sort them by year value
	const sortedFinancialData = latestFinancialData?.sort(
		(a, b) => b.attributes.year - a.attributes.year
	);
	
	const {t} = useTranslation('common')

	return (
		<div className="latest-results-section">
			<div className="title">
				<h2>{t('investor.latest_results')}</h2>
			</div>
			<div className="subtitle">
				<span>{t('investor.latest_download')}</span>
			</div>

			{sortedFinancialData && (
				<div className="results-sections">
					<div className="section">
						<div className="title">
							<h4>{sortedFinancialData[0].attributes.Releases?.title}</h4>
						</div>
						<a
							className="subtitle"
							href={
								sortedFinancialData[0].attributes.Releases?.yearbuttons[sortedFinancialData[0].attributes.Releases?.yearbuttons.length-1]
									?.buttonLink.data.attributes.url
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<h4>
								{
									sortedFinancialData[0].attributes.Releases?.yearbuttons[
										sortedFinancialData[0].attributes.Releases?.yearbuttons.length-1
									]?.buttonTitle
								}
							</h4>
						</a>
					</div>
					<div className="section">
						<div className="title">
							<h4>
								{sortedFinancialData[0].attributes.EarningPresentation?.title}
							</h4>
						</div>
						<a
							className="subtitle"
							href={
								sortedFinancialData[0].attributes.EarningPresentation
									?.yearbuttons[sortedFinancialData[0].attributes.EarningPresentation?.yearbuttons.length-1]?.buttonLink.data.attributes.url
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<h4>
								{
									sortedFinancialData[0].attributes.EarningPresentation
										?.yearbuttons[sortedFinancialData[0].attributes.EarningPresentation?.yearbuttons.length-1]?.buttonTitle
								}
							</h4>
						</a>
					</div>
					<div className="section">
						<div className="title">
							<h4>
								{sortedFinancialData[0].attributes.financialStatements?.title}
							</h4>
						</div>
						<a
							className="subtitle"
							href={
								sortedFinancialData[0].attributes.financialStatements
									?.yearbuttons[sortedFinancialData[0].attributes.financialStatements?.yearbuttons.length-1]?.buttonLink.data.attributes.url
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<h4>
								{
									sortedFinancialData[0].attributes.financialStatements
										?.yearbuttons[sortedFinancialData[0].attributes.financialStatements?.yearbuttons.length-1]?.buttonTitle
								}
							</h4>
						</a>
					</div>
					<div className="section">
						<div className="title">
							<h4>{sortedFinancialData[0].attributes.conference?.title}</h4>
						</div>
						{sortedFinancialData[0].attributes.conference?.yearbuttons[
												sortedFinancialData[0].attributes.conference?.yearbuttons.length-1
											]?.buttonLink.data.attributes.url
											&& 
						<>
							<div
								className="subtitle audioSection"
								onClick={() => {
									setAudioIsPlaying(!audioIsPlaying);
								}}
							>
								<div className="play-icon">
									{audioIsPlaying ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
										>
											<path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
										>
											<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
										</svg>
									)}
								</div>
								<h4>
									{
										sortedFinancialData[0].attributes.conference?.yearbuttons[
											sortedFinancialData[0].attributes.conference?.yearbuttons.length-1
										]?.buttonTitle
									}
								</h4>
							</div>
							{audioIsPlaying && (
								<audio controls autoPlay>
									<source
										src={
											"//" +
											sortedFinancialData[0].attributes.conference?.yearbuttons[
												sortedFinancialData[0].attributes.conference?.yearbuttons.length-1
											]?.buttonLink.data.attributes.url
										}
										type="audio/mpeg"
									/>
								</audio>
							)}
						</>
											}
					</div>
				</div>
			)}
		</div>
	);
}
