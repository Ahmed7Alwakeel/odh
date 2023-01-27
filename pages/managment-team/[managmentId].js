import MemberDetails from "../../components/MembersPage/MemberDetails"
import MemberSwiper from "../../components/MembersPage/MemberSwiper"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { fetchShareInfo, getAllData, getDynamicData } from "../../utils/Data"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const MembersPage = ({ managmentId, locale }) => {
	let { t } = useTranslation("common")
	const [managmentMembers, setManagmentMembers] = useState()
	const [memberData, setMemberData] = useState()
	const { data, isLoading, isSuccess } = useQuery(
		["managment-member", locale],
		() =>
			getDynamicData(
				"management-team-cards",
				managmentId,
				locale,
				"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
			)
	)

	const {
		data: managmentMembersData,
		isLoading: managmentMembersLoading,
		isSuccess: managmentMembersSucess,
	} = useQuery(["managment-members", locale], () =>
		getAllData(
			"management-team-cards",
			locale,
			"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
		)
	)

	useEffect(() => {
		managmentMembersSucess && setManagmentMembers(managmentMembersData)
	}, [managmentMembersData, managmentMembersSucess])

	useEffect(() => {
		isSuccess && setMemberData(data)
	}, [data, isSuccess])

	return (
		<>
			<NextSeo title={t("headers.about_us_page")} />
			<MemberDetails
				memberData={memberData?.data[0]?.attributes?.teamCard}
				managmentId={managmentId}
			/>
			<MemberSwiper
				membersData={managmentMembers?.data}
				memberId={managmentId}
				managmentId
			/>
		</>
	)
}
export async function getServerSideProps(ctx) {
	const queryClient = new QueryClient()

	const locale = ctx.locale
	const { managmentId } = ctx.params
	await queryClient.prefetchQuery(["managment-member", locale], () =>
		getDynamicData(
			"management-team-cards",
			managmentId,
			locale,
			"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
		)
	)
	await queryClient.prefetchQuery(["managment-members", locale], () =>
		getAllData(
			"management-team-cards",
			locale,
			"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
		)
	)

	const response = await getDynamicData(
		"management-team-cards",
		managmentId,
		locale,
		"populate[0]=teamCard.imageDesktop1&populate[1]=teamCard.iconImage&populate[2]=teamCard.imageMobile1"
	)
	if (response.data == null || response.data.length == 0) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			managmentId: managmentId,
			locale: locale,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}

export default MembersPage
