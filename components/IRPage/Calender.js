import React, { useEffect, useMemo } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import moment from "moment"
import { useState } from "react"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
export default function Calender({ calendarData }) {
	const [value, onChange] = useState(new Date())
	const { t } = useTranslation("common")
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

	const { locale } = useRouter()

	return (
		<div className="calender-page">
			<div className="title">
				<h2>{t("investor.calendar")}</h2>
			</div>
			<div className="calender-container">
				<Calendar
					onChange={onChange}
					calendarType="US"
					locale={locale}
					next2Label={null}
					prev2Label={null}
					value={value}
					selectRange={false}
					showFixedNumberOfWeeks={4}
					tileClassName={({ date }) => {
						if (new Set(options).has(moment(date).format("YYYY-MM-DD"))) {
							return "highlight"
						}
					}}
				/>
				<div className="events">
					{upcomingEvents?.map((event, index) => (
						<div className="event" key={index}>
							<div className="event-details">
								<div className="header">
									<div className="date-icon-container">
										<Image
											src={"/icons/calendar_today2.svg"}
											alt="calendar"
											layout="fill"
											priority
										/>
									</div>
									{/* <div className="media-date">{parse(`${isSuccess && data.rss.channel.item[0].pubDate }`)}</div> */}
									<div className="media-date">{event.date}</div>
								</div>
								<div className="event-name">{event.title}</div>
							</div>
							<div className="event-type">
								<span>{event.type}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
