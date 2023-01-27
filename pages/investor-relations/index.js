import React from "react";
import Banner from "../../components/IRPage/Banner";
import { dehydrate, QueryClient, useQuery } from "react-query";
import {
	fetchDataOdhHolding,
	getAllData,
	getFinancialData,
	getTeaserChart,
} from "../../utils/Data";
import { useState } from "react";
import { useEffect } from "react";
import TeaserChart from "../../components/IRPage/TeaserChart";
import LatestResults from "../../components/IRPage/LatestResults";
import LatestNewsReleases from "../../components/IRPage/LatestNewsReleases";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AboutTabsIR from "../../components/IRPage/AboutTabsIR";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

const Index = ({ locale }) => {
	const { t } = useTranslation("common");
	const [mediaData, setMediaData] = useState();
	const [calendarData, setCalendarData] = useState();
	const [IRData, setIRData] = useState();

	const { data: calData, isSuccess: calSuccess } = useQuery(
		["calendar", locale],
		() => getAllData("calendar", locale, "populate=*")
	);
	const { data: irData, isSuccess: irSuccess } = useQuery(["IR", locale], () =>
		getAllData(
			"investor-relation",
			locale,
			"populate%5B0%5D=annualReports.imageDesktop&populate%5B1%5D=annualReports.imageMobile&populate%5B2%5D=annualReports.Button&populate%5B3%5D=annualReports.Button.buttonLink&populate%5B4%5D=annualReports.buttonIcon&populate%5B5%5D=latestResults.latestbuttons&populate%5B6%5D=latestResults.latestbuttons.ButtonLink&populate%5B7%5D=cover&populate[8]=coverMobile"
		)
	);

	const [financialData, setFinancialData] = useState();
	const {
		data: finData,
		isLoading: finLoading,
		isSuccess: finSuccess,
	} = useQuery(["financial-data", locale], () => getFinancialData(locale));
	useEffect(() => {
		if (finSuccess) {
			setFinancialData(finData);
		}
	}, [finData, finSuccess]);

	useEffect(() => {
		if (calSuccess) {
			setCalendarData(calData?.data?.attributes?.calendar);
		}
	}, [calData, calSuccess]);

	useEffect(() => {
		if (irSuccess) {
			setIRData(irData?.data?.attributes);
		}
	}, [irData, irSuccess]);

	const { data, isError, isLoading, isSuccess } = useQuery(
		["odh-holding", locale],
		() => fetchDataOdhHolding(locale)
	);
	useEffect(() => {
		if (isSuccess) {
			setMediaData(data?.rss?.channel?.item);
		}
	}, [data, isSuccess]);

	return (
		<>
			<NextSeo title={t("headers.investor-relations-page")} />
			<Banner bannerData={irData.data?.attributes} />
			<AboutTabsIR />
			<TeaserChart reportData={irData.data?.attributes.annualReports} />
			<LatestNewsReleases
				mediaData={mediaData}
				isSuccess={isSuccess}
				calendarData={calendarData}
			/>
			<LatestResults
				// latestData={irData.data?.attributes.latestResults}
				latestFinancialData={financialData?.data?.attributes.years.data}
			/>
		</>
	);
};

export default Index;

export const getServerSideProps = async ({ locale }) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["odh-holding", locale], () =>
		fetchDataOdhHolding(locale)
	);
	await queryClient.prefetchQuery(["calendar", locale], () =>
		getAllData("calendar", locale, "populate=*")
	);
	await queryClient.prefetchQuery(["IR", locale], () =>
		getAllData(
			"investor-relation",
			locale,
			"populate%5B0%5D=annualReports.imageDesktop&populate%5B1%5D=annualReports.imageMobile&populate%5B2%5D=annualReports.Button&populate%5B3%5D=annualReports.Button.buttonLink&populate%5B4%5D=annualReports.buttonIcon&populate%5B5%5D=latestResults.latestbuttons&populate%5B6%5D=latestResults.latestbuttons.ButtonLink&populate%5B7%5D=cover&populate[8]=coverMobile"
		)
	);
	await queryClient.prefetchQuery(["financial-data", locale], () =>
		getFinancialData(locale)
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			locale,
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
};
