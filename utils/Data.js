import { fetchExternalData, fetchExternaliFrame } from "./FetchData"
import { getArticles, getFeed } from "./Rss"

export const API_URL = "https://admin.odh.beyond-creation.net/api"
// export const API_URL = "https://odh-strapi-r3xyr.ondigitalocean.app/api"

export const fetchSharePrice = async () => {
	const values = await fetchExternalData(
		"https://charts3.equitystory.com/api/orascom/English/"
	)
	return values
}
export const fetchSharePricefeed = async () => {
	const values = await getFeed(
		"https://charts3.equitystory.com/api/orascom/English/"
	)

	return values
}
export const fetchShareInfo = async (locale) => {
	const values = await fetchExternaliFrame(
		process.env.NEXT_PUBLIC_SHARE_INFO,
		locale
	)
	return values
}

export const fetchDataOdhHolding = async (locale) => {
	const values = await fetchExternalData(
		`https://irpages2.equitystory.com/cgi-bin/show.ssp?id=1&companyName=meldeverlinkung&language=${
			locale != "de" ? "English" : "German"
		}&companyDirectoryName=orascomdevelopment&type=all&feed=1&limit=6`
	)

	return values
}
export const fetchDataOdhHoldingNewRelease = async (locale) => {
	const values = await fetchExternalData(
		`https://irpages2.equitystory.com/cgi-bin/show.ssp?id=1&companyName=meldeverlinkung&language=${
			locale != "de" ? "English" : "German"
		}&companyDirectoryName=orascomdevelopment&type=all&feed=1`
	)

	return values
}
export const getAllData = async (page, locale, populate) => {
	const response = await fetch(
		`${API_URL}/${page}?locale=${locale}&${populate}`
	)
	return response.json()
}
//id till get a slug
export const getDynamicData = async (page, slug, locale, populate) => {
	const response = await fetch(
		`${API_URL}/${page}?filters[slug][$eq]=${slug}&locale=${locale}&${populate}`
	)
	return response.json()
}

export const getTeaserChart = async (locale) => {
	const values = await fetchExternaliFrame(
		`https://charts3.equitystory.com/teaser/orascom/${
			locale == "de" ? "German" : "English"
		}/?xdm_e=https%3A%2F%2Fwww.orascomdh.com&xdm_c=default5674&xdm_p=1`
	)
	return values
}

export const getCorporateData = async (locale) => {
	const response = await fetch(
		`${API_URL}/corporate-filing?locale=${locale}&populate[0]=years&populate[1]=years.general&populate[2]=years.general.generalbuttons&populate[3]=years.corporate&populate[4]=years.corporate.corporatebuttons&populate[5]=years.general.yearbuttons&populate[6]=years.general.yearbuttons.buttonLink&populate[7]=years.corporate.yearbuttons&populate[8]=years.corporate.yearbuttons.buttonLink`
	)
	return response.json()
}
export const getShareInfoData= async () => {
	const response = await fetch(
		`${API_URL}/share-info`
	)
	return response.json()
}

export const getFinancialData = async (locale) => {
	const response = await fetch(
		`${API_URL}/financial-information?locale=${locale}&populate[0]=years&populate[1]=years.Releases.yearbuttons&populate[2]=years.Releases.yearbuttons.buttonLink&populate[3]=years.EarningPresentation.yearbuttons&populate[4]=years.EarningPresentation.yearbuttons.buttonLink&populate[5]=years.financialStatements.yearbuttons&populate[6]=years.financialStatements.yearbuttons.buttonLink&populate[7]=years.conference.yearbuttons&populate[8]=years.conference.yearbuttons.buttonLink&populate[9]=years.AnnualReports.yearbuttons&populate[10]=years.AnnualReports.yearbuttons.buttonLink&populate[11]=years.investors.yearbuttons&populate[12]=years.investors.yearbuttons.buttonLink&populate[13]=years.general.yearbuttons&populate[14]=years.general.yearbuttons.buttonLink&populate[15]=years.corporate.yearbuttons&populate[16]=years.corporate.yearbuttons.buttonLink`
	)
	return response.json()
}
