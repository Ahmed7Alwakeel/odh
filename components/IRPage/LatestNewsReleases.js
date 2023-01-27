import React, { useMemo } from "react"
import { useState } from "react"
import MediaCenterCard from "../Homepage/MediaCenterCard"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import moment from "moment"
import { useTranslation } from "next-i18next"

export default function LatestNewsReleases({
	mediaData,
	isSuccess,
	calendarData,
}) {
	const { t } = useTranslation("common")
	const [value, onChange] = useState(new Date())
	const upcomingEvents = useMemo(
		() =>
			calendarData?.filter((event) =>
				moment(event.date).isSameOrAfter(moment().format("YYYY-MM-DD"))
			),
		[calendarData]
	)

	const options = useMemo(
		() => upcomingEvents?.map((event) => event.date),
		[upcomingEvents]
	)

	return (
		<div className="latest-news-section">
			<div className="news">
				<div className="title">
					<h2>{t("investor.latest_new_release")}</h2>
				</div>
				<div className="news-container">
					{mediaData?.slice(0, 2).map((mediaInfo, index) => (
						<div key={index} className="media-slide-container">
							<MediaCenterCard mediaInfo={mediaInfo} isSuccess={isSuccess} />
						</div>
					))}
				</div>
			</div>
			<div className="calender-section">
				<div className="title">
					<h2>{t("investor.coming_event")}</h2>
				</div>
				<Calendar
					onChange={onChange}
					calendarType="US"
					next2Label={null}
					prev2Label={null}
					value={value}
					selectRange={false}
					showFixedNumberOfWeeks
					tileClassName={({ date }) => {
						if (new Set(options).has(moment(date).format("YYYY-MM-DD"))) {
							return "highlight"
						}
					}}
				/>
				{upcomingEvents && (
					<div className="main-event">
						<div className="date">
							{moment(upcomingEvents[0]?.date).format("DD MMM YYYY")}
						</div>
						<div className="event-name">{upcomingEvents[0]?.title}</div>
					</div>
				)}
			</div>
		</div>
	)
}
