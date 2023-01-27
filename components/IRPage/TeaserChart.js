import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { useContext } from "react"
import { isMobileContext } from "../../contexts/isMobileContext"

export default function TeaserChart({ reportData }) {
	const { isMobileState } = useContext(isMobileContext)
	const [isMobile, setMobile] = isMobileState
	const { locale } = useRouter()
	return (
		<div className="teaser-chart-section">
			<div className="iframe-container">
				<iframe
					scrolling="no"
					src={`https://charts3.equitystory.com/teaser/orascom/${
						locale == "de" ? "German" : "English"
					}/?xdm_e=https%3A%2F%2Fwww.orascomdh.com&xdm_c=default5674&xdm_p=1`}
				/>
			</div>
			<div className="annual-report">
				<div className="img-container">
					{!isMobile && reportData?.imageDesktop.data.attributes.url && (
						<Image
							src={reportData?.imageDesktop.data.attributes.url}
							alt={reportData?.altDesktop}
							layout="fill"
						/>
					)}
					{isMobile && reportData?.imageMobile.data.attributes.url && (
						<Image
							src={reportData?.imageMobile.data.attributes.url}
							alt={reportData?.altMobile}
							layout="fill"
						/>
					)}
				</div>
				<div className="title-container">
					<h3 className="title">{reportData?.text}</h3>
					<a
						className="subtitle"
						href={
							!reportData?.Button?.buttonLink?.data?.attributes?.url.match(
								/^http?:\/\//i
							) &&
							!reportData?.Button?.buttonLink?.data?.attributes?.url.match(
								/^https?:\/\//i
							)
								? "https://" +
								  reportData?.Button?.buttonLink?.data?.attributes?.url
								: reportData?.Button?.buttonLink?.data?.attributes?.url
						}
						target="_blank"
						rel="noopener noreferrer"
						download={reportData?.text}
					>
						<h4>{reportData?.Button?.buttonTitle}</h4>
						<div className="download-icon">
							<svg
								width="24"
								height="24"
								xmlns="http://www.w3.org/2000/svg"
								fillRule="evenodd"
								clipRule="evenodd"
							>
								<path d="M6 16h-5v6h22v-6h-5v-1h6v8h-24v-8h6v1zm14 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5-17v14.884l4.736-5.724.764.645-5.979 7.195-6.021-7.205.765-.644 4.735 5.732v-14.883h1z" />
							</svg>
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
