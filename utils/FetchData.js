import { parseXml, xml2json } from "./ConvertXmlToJson"

export const fetchData = async (url, locale) => {
	const apiurl = process.env.API_URL
	const response = await fetch(`${apiurl}${url}`)

	if (!response.ok) {
		throw new Error("There is an error with your internet connection")
	}

	return response.json()
}

export const fetchExternalData = async (url, locale) => {
	const apiurl = url
	const response = await fetch(apiurl)
	const xmlText = await response.text()
	const dom = parseXml(xmlText)
	const myJsonStr = xml2json(dom)
	const fixedJsonStr = myJsonStr.replace(/\nundefined/, "")
	const jsonObj = JSON.parse(fixedJsonStr)
	if (!response) {
		throw new Error("There is an error with your internet connection")
	}

	return jsonObj
}
export const fetchExternaliFrame = async (url, locale) => {
	const apiurl = url
	const response = await fetch(
		`https://charts3.equitystory.com/chart/orascom/English/'`
	)
	const htmlText = await response.text()
	// Initialize the DOM parser
	const parser = new DOMParser()

	// Parse the text
	const doc = parser.parseFromString(htmlText, "text/html")
	if (!response) {
		throw new Error("There is an error with your internet connection")
	}

	return htmlText
}
