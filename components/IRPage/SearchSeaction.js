import { useContext, useEffect, useRef, useState } from "react"
import Select from "react-select"
// import Button from "../../common/Button/Button"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion"
import { date } from "yup"
import ButtonLink from "../common/ButtonLink"
const SearchSection = ({ mediaData, setMedia, setMessage }) => {
	let { t } = useTranslation("common")
	const router = useRouter()
	const [categoriesSelect, setCategoriesSelect] = useState()
	const [yearsSelect, setYearsSelect] = useState()
	const [dateString, setDateString] = useState([])
	const [yearString, setYearString] = useState([])
	const [yearError, setYearError] = useState(false)
	const customStyles = {
		menu: (provided, state) => ({
			...provided,
			backgroundColor: "white",
			color: "black",
			padding: "0",
			margin: ".25rem",
			zIndex: "2",
			borderRadius: "0rem",
		}),
		control: (provided, state) => ({
			...provided,
			backgroundColor: "unset",
			boxShadow: "none",
			borderRadius: "0rem",
			padding: "0 !important",
			margin: "0 !important",
			display: "flex",
			alignItems: "center",
			overflow: "hidden",
			borderColor: `${!yearError ? "hsl(0, 0%, 80%)" : "red"}`,
			height: "3rem",
			transition: "1s all",
			zIndex: "1",
			color: "black",
			"&:hover": {
				borderColor: `${!yearError ? "hsl(0, 0%, 80%)" : "red"}`,
			},
			cursor: "pointer",
		}),
		valueContainer: (provided, state) => ({
			...provided,
			padding: "0 ",
			margin: "0 ",
			display: "flex",
			alignItems: "center",
			paddingInlineStart: "10px",
			color: "black",
			cursor: "pointer",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: "black",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: "black",
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			display: "none",
		}),
	}
	//to fill years options
	useEffect(() => {
		const date = []
		{
			mediaData?.map((mediaInfo, index) =>
				date.push(
					new Date(
						mediaInfo.pubDate.slice(0, mediaInfo.pubDate.indexOf(":") - 3)
					).getFullYear()
				)
			)
		}
		setDateString([...new Set(date)])
	}, [mediaData])
	useEffect(() => {
		const yearDate = [{ label: `${t('investor.any')}`, value: "any" }]
		{
			dateString?.map((year, index) =>
				yearDate.push({
					label: year,
					value: year,
				})
			)
		}
		setYearString(yearDate)
	}, [dateString])
	useEffect(() => {
		!categoriesSelect && setCategoriesSelect("any")
	}, [categoriesSelect])
	//button logic
	const searchResult = () => {
		let newData
		if (yearsSelect && categoriesSelect) {
			newData = mediaData?.filter(
				(mediaInfo) =>
					(new Date(
						mediaInfo.pubDate.slice(0, mediaInfo.pubDate.indexOf(":") - 3)
					).getFullYear() == yearsSelect &&
						mediaInfo.type == categoriesSelect) ||
					yearsSelect == categoriesSelect
			)
			setMedia(newData)
			newData.length == 0 && setMedia("empty")
		}
		if (yearsSelect == "any" && categoriesSelect != "any") {
			newData = mediaData?.filter(
				(mediaInfo) => mediaInfo.type == categoriesSelect
			)
			setMedia(newData)
			newData.length == 0 && setMedia("empty")
		}
		if (yearsSelect != "any" && categoriesSelect == "any") {
			newData = mediaData?.filter(
				(mediaInfo) =>
					new Date(
						mediaInfo.pubDate.slice(0, mediaInfo.pubDate.indexOf(":") - 3)
					).getFullYear() == yearsSelect
			)
			setMedia(newData)
			newData.length == 0 && setMedia("empty")
		}
		if (!yearsSelect) {
			setYearError(true)
			setMedia(mediaData)
		}
	}
	return (
		<>
			<motion.div className="search-section">
				<div className="search-input-group">
					<Select
						options={yearString}
						onChange={(e) => {
							setYearsSelect(e.value), setYearError(false)
						}}
						placeholder={t('investor.select_year')}
						className="select-drop-down"
						styles={customStyles}
						noOptionsMessage={() => `noOption`}
					/>
				</div>
				<div className="search-input-group">
					<Select
						options={[
							{
								label: `${t('investor.any')}`,
								value: "any",
							},
							{
								label: `${t('investor.ad_hoc')}`,
								value: "EQS-Ad-hoc",
							},
							{
								label: `${t('investor.press_release')}`,
								value: "EQS-News",
							},
						]}
						onChange={(e) => {
							setCategoriesSelect(e?.value)
						}}
						placeholder={t('investor.select_category')}
						className="select-drop-down "
						styles={customStyles}
						noOptionsMessage={() => `noOption`}
					/>
				</div>
				<div className="career-form__steps-wrapper" onClick={searchResult}>
					<ButtonLink
						title={t('investor.apply')}
						blue
						customStyle="careers-form-btn"
						formBtn
					/>
				</div>
			</motion.div>
		</>
	)
}

export default SearchSection
