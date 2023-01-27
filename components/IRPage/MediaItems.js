import React from "react"
import NewsCard from "./NewsCard"

const MediaItems = ({ currentItems }) => {
	return (
		<>
			{currentItems?.map((mediaInfo, index) => (
				<div className={`news-card-container `} key={index}>
					<NewsCard mediaInfo={mediaInfo} />
				</div>
			))}
		</>
	)
}

export default MediaItems
