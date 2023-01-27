import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useContext, useEffect } from "react"
import { useState } from "react"
import AudioComponent from "../common/AudioComponent"

export default function CorporateFilings({
	corpData,
	inFinancialInfoPage,
	inCorporateFilingPage,
}) {
	const quarterArr = ["Quarter", "Quarter", "Quarter", "Quarter"]
	const [audioIsPlaying, setAudioIsPlaying] = useState(false)
	const [activeAudio, setActiveAudio] = useState()
	const [currentYear, setCurrentYear] = useState(0)

	return (
		<div className="corporate-section">
			<div className="title">
				<h2>{corpData?.title}</h2>
			</div>
			<div className="years-swiper">
				<Swiper
					spaceBetween={10}
					slidesPerView={4}
					// slidesPerGroup={4}
					modules={[Navigation, Pagination]}
					navigation={{
						nextEl: ".corporate-filings-next",
						prevEl: ".corporate-filings-prev",
					}}
				>
					{corpData?.years?.data
						.sort((a, b) => b.attributes.year - a.attributes.year)
						.map((year, index) => (
							<SwiperSlide key={index}>
								<div
									className={`year ${index == currentYear ? "active" : ""}`}
									onClick={() => {
										setCurrentYear(index)
										setAudioIsPlaying(false)
									}}
								>
									{year?.attributes?.year}
								</div>
							</SwiperSlide>
						))}
				</Swiper>
				<div className="swiper-button-prev corporate-filings-prev"></div>
				<div className="swiper-button-next corporate-filings-next"></div>
			</div>
			{inCorporateFilingPage && (
				<div className="data-sections inCorporateFilingPage">
					<div className="section meetings">
						<div className="title">
							<h4>
								{corpData?.years?.data[currentYear].attributes.general.title}
							</h4>
						</div>
						<div className="meetings-list list">
							{corpData?.years?.data[
								currentYear
							]?.attributes?.general?.yearbuttons.map((button, index) => (
								<div key={index} className="meeting item">
									<a
										href={
											!button?.buttonLink?.data?.attributes?.url.match(
												/^http?:\/\//i
											) &&
											!button?.buttonLink?.data?.attributes?.url.match(
												/^https?:\/\//i
											)
												? "https://" +
												  button?.buttonLink?.data.attributes?.url
												: button?.buttonLink?.data.attributes?.url
										}
										target="_blank"
										rel="noopener noreferrer"
									>
										{button.buttonTitle}
									</a>
								</div>
							))}
						</div>
					</div>
					<div className="section documents">
						<div className="title">
							<h4>
								{corpData?.years?.data[currentYear].attributes.corporate.title}
							</h4>
						</div>
						<div className="documents-list list">
							{corpData?.years?.data[
								currentYear
							].attributes.corporate.yearbuttons?.map((button, index) => (
								<div key={index} className={`document item`}>
									<a
										href={
											!button?.buttonLink?.data.attributes?.url.match(
												/^http?:\/\//i
											) &&
											!button?.buttonLink?.data.attributes?.url.match(
												/^https?:\/\//i
											)
												? "https://" +
												  button?.buttonLink?.data.attributes?.url
												: button?.buttonLink?.data.attributes?.url
										}
										target="_blank"
										rel="noopener noreferrer"
									>
										{button.buttonTitle}
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			{inFinancialInfoPage && (
				<div className="data-sections inFinancialInfoPage">
					<div className="section releases">
						<div className="title">
							<h4>
								{corpData?.years?.data[currentYear].attributes.Releases.title}
							</h4>
						</div>
						<div className="section-list list">
							{corpData?.years?.data[
								currentYear
							].attributes.Releases.yearbuttons
								.concat(quarterArr)
								.slice(0, 4)
								.map((button, index) => (
									<div
										key={index}
										className={`meeting item ${
											button == "Quarter" ? "inactive" : ""
										}`}
									>
										<a
											href={
												!button?.buttonLink?.data?.attributes?.url.match(
													/^http?:\/\//i
												) &&
												!button?.buttonLink?.data?.attributes?.url.match(
													/^https?:\/\//i
												)
													? "https://" +
													  button?.buttonLink?.data?.attributes?.url
													: button?.buttonLink?.data?.attributes?.url
											}
											target="_blank"
											rel="noopener noreferrer"
											// download={button?.buttonLink?.data[0].attributes?.name}
										>
											{/* {button.buttonTitle ? button.buttonTitle : button} */}
											{button.buttonTitle ? button.buttonTitle : ""}
										</a>
									</div>
								))}
						</div>
					</div>
					<div className="section EarningPresentation">
						<div className="title">
							<h4>
								{
									corpData?.years?.data[currentYear]?.attributes
										?.EarningPresentation?.title
								}
							</h4>
						</div>
						<div className="section-list list">
							{corpData?.years?.data[
								currentYear
							].attributes.EarningPresentation.yearbuttons
								.concat(quarterArr)
								.slice(0, 4)
								.map((button, index) => (
									<div
										key={index}
										className={`meeting item ${
											button == "Quarter" ? "inactive" : ""
										}`}
									>
										<a
											href={
												!button?.buttonLink?.data?.attributes?.url.match(
													/^http?:\/\//i
												) &&
												!button?.buttonLink?.data?.attributes?.url.match(
													/^https?:\/\//i
												)
													? "https://" +
													  button?.buttonLink?.data?.attributes?.url
													: button?.buttonLink?.data?.attributes?.url
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											{/* {button.buttonTitle ? button.buttonTitle : button} */}
											{button.buttonTitle ? button.buttonTitle : ""}
										</a>
									</div>
								))}
						</div>
					</div>
					<div className="section financialStatements">
						<div className="title">
							<h4>
								{
									corpData?.years?.data[currentYear].attributes
										.financialStatements.title
								}
							</h4>
						</div>
						<div className="section-list list">
							{corpData?.years.data[
								currentYear
							].attributes.financialStatements.yearbuttons
								.concat(quarterArr)
								.slice(0, 4)
								.map((button, index) => (
									<div
										key={index}
										className={`meeting item ${
											button == "Quarter" ? "inactive" : ""
										}`}
									>
										{!!button?.buttonLink?.data && (
											<a
												href={
													!button?.buttonLink?.data?.attributes?.url.match(
														/^http?:\/\//i
													) &&
													!button?.buttonLink?.data?.attributes?.url.match(
														/^https?:\/\//i
													)
														? "https://" +
														  button?.buttonLink?.data?.attributes?.url
														: button?.buttonLink?.data?.attributes?.url
												}
												target="_blank"
												rel="noopener noreferrer"
											>
												{/* {button.buttonTitle ? button.buttonTitle : button} */}
												{button.buttonTitle ? button.buttonTitle : ""}
											</a>
										)}
									</div>
								))}
						</div>
					</div>

					{/* <div className="section conference">
						<div className="title">
							<h4>
								{corpData?.years?.data[currentYear].attributes.conference.title}
							</h4>
						</div>
						<div className="section-list list">
							{corpData?.years?.data[
								currentYear
							].attributes.conference.yearbuttons
								.concat(quarterArr)
								.slice(0, 4)
								.map((button, index) => (
									<div
										key={index}
										className={`meeting item ${
											button == "Quarter" ? "inactive" : ""
										}`}
									>
									<a
										href={
											!button?.buttonLink?.data[0].attributes?.url.match(
												/^http?:\/\//i
											) &&
											!button?.buttonLink?.data[0].attributes?.url.match(
												/^https?:\/\//i
											)
												? "https://" +
												  button?.buttonLink?.data[0].attributes?.url
												: button?.buttonLink?.data[0].attributes?.url
										}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => {
											setAudioIsPlaying(!audioIsPlaying);
										}}
									>
										{button?.buttonLink?.data[0].attributes?.url && 
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
										}
										{button.buttonTitle ? button.buttonTitle : button}
									</a>
									{audioIsPlaying && (
										<audio controls autoPlay>
											<source
												src={section?.ButtonLink.data[0].attributes.url}
												type="audio/mp3"
											/>
										</audio>
									)}
								</div>	
								))}
						</div>
					</div> */}

					<div className="section conference">
						<div className="title">
							<h4>
								{corpData?.years?.data[currentYear].attributes.conference.title}
							</h4>
						</div>
						<div className="section-list list">
							{corpData?.years?.data[
								currentYear
							].attributes.conference.yearbuttons
								.concat(quarterArr)
								.slice(0, 4)
								.map((button, index) => (
									<div
										key={index}
										className={`meeting item ${
											button == "Quarter" ? "inactive" : ""
										}`}
									>
										<div
											className={`audioContainer ${
												audioIsPlaying && activeAudio == index
													? "isPlaying"
													: ""
											}`}
											onClick={() => {
												setAudioIsPlaying(!audioIsPlaying)
												setActiveAudio(index)
											}}
										>
											{button?.buttonLink?.data?.attributes?.url && (
												<div
													className={`play-icon ${
														audioIsPlaying ? "isPlaying" : ""
													}`}
												>
													{audioIsPlaying && activeAudio == index ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="20"
															viewBox="0 0 24 24"
														>
															<path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="20"
															viewBox="0 0 24 24"
														>
															<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
														</svg>
													)}
												</div>
											)}
											<span>
												{/* {button.buttonTitle ? button.buttonTitle : button} */}
												{button.buttonTitle ? button.buttonTitle : ""}
											</span>
										</div>
										<AudioComponent
											activeAudio={activeAudio}
											index={index}
											audioIsPlaying={audioIsPlaying}
											src={button?.buttonLink?.data?.attributes.url}
										/>
									</div>
								))}
						</div>
					</div>

					<div className="section AnnualReports lastRow">
						<div className="title">
							<h4>
								{
									corpData?.years?.data[currentYear].attributes.AnnualReports
										.title
								}
							</h4>
						</div>
						<div className="section-list list">
							{corpData?.years?.data[
								currentYear
							].attributes.AnnualReports.yearbuttons.map((button, index) => (
								<div
									key={index}
									className={`meeting item ${
										button == "Quarter" ? "inactive" : ""
									}`}
								>
									<a
										href={
											!button?.buttonLink?.data?.attributes?.url.match(
												/^http?:\/\//i
											) &&
											!button?.buttonLink?.data?.attributes?.url.match(
												/^https?:\/\//i
											)
												? "https://" +
												  button?.buttonLink?.data?.attributes?.url
												: button?.buttonLink?.data?.attributes?.url
										}
										target="_blank"
										rel="noopener noreferrer"
									>
										{button.buttonTitle ? button.buttonTitle : button}
									</a>
								</div>
							))}
						</div>
					</div>
					<div className="section investors lastRow">
						<div className="title">
							<h4>
								{
									corpData?.years?.data[currentYear]?.attributes?.investors
										?.title
								}
							</h4>
						</div>
						<div className="meetings-list list">
							{corpData?.years?.data[currentYear].attributes?.investors
								?.yearbuttons.length <= 4
								? corpData?.years?.data[
										currentYear
								  ].attributes?.investors?.yearbuttons
										?.concat(quarterArr)
										.slice(0, 4)
										.map((button, index) => (
											<div
												key={index}
												className={`meeting item ${
													button == "Quarter" ? "inactive" : ""
												}`}
											>
												{!!button?.buttonLink?.data && (
													<a
														href={
															!button?.buttonLink?.data?.attributes?.url.match(
																/^http?:\/\//i
															) &&
															!button?.buttonLink?.data?.attributes?.url.match(
																/^https?:\/\//i
															)
																? "https://" +
																  button?.buttonLink?.data?.attributes?.url
																: button?.buttonLink?.data?.attributes?.url
														}
														target="_blank"
														rel="noopener noreferrer"
													>
														{button.buttonTitle ? button.buttonTitle : button}
													</a>
												)}
											</div>
										))
								: corpData?.years?.data[
										currentYear
								  ].attributes?.investors?.yearbuttons?.map((button, index) => (
										<div
											key={index}
											className={`meeting item ${
												button == "Quarter" ? "inactive" : ""
											}`}
										>
											<a
												href={
													!button?.buttonLink?.data?.attributes?.url.match(
														/^http?:\/\//i
													) &&
													!button?.buttonLink?.data?.attributes?.url.match(
														/^https?:\/\//i
													)
														? "https://" +
														  button?.buttonLink?.data?.attributes?.url
														: button?.buttonLink?.data?.attributes?.url
												}
												target="_blank"
												rel="noopener noreferrer"
											>
												{button.buttonTitle ? button.buttonTitle : button}
											</a>
										</div>
								  ))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
