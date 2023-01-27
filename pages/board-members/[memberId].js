import MemberDetails from "../../components/MembersPage/MemberDetails"
import MemberSwiper from "../../components/MembersPage/MemberSwiper"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { fetchShareInfo, getAllData, getDynamicData } from "../../utils/Data"
import { useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
const MembersPage = ({ memberId, locale }) => {
	const [boardMembers, setBoardMembers] = useState()
	const [memberData, setMemberData] = useState()

	const { data, isLoading, isSuccess } = useQuery(
		["board-member", locale],
		() =>
			getDynamicData(
				"abot-board-directors-cards",
				memberId,
				locale,
				"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
			)
	)

	const {
		data: boardMembersData,
		isLoading: boardMembersLoading,
		isSuccess: boardMembersSucess,
	} = useQuery(["board-members", locale], () =>
		getAllData(
			"abot-board-directors-cards",
			locale,
			"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
		)
	)

	useEffect(() => {
		boardMembersSucess && setBoardMembers(boardMembersData)
	}, [boardMembersData, boardMembersSucess])

	useEffect(() => {
		isSuccess && setMemberData(data)
	}, [data, isSuccess])
	let { t } = useTranslation("common")
	return (
		<>
			<NextSeo title={t("headers.about_us_page")} />
			<MemberDetails
				memberData={memberData?.data[0]?.attributes?.card}
				memberId={memberId}
			/>
			<MemberSwiper membersData={boardMembers?.data} memberId={memberId} />
		</>
	)
}
export async function getServerSideProps(ctx) {
	const queryClient = new QueryClient()
	const { memberId } = ctx.params
	const locale = ctx.locale
	await queryClient.prefetchQuery(["board-member", locale], () =>
		getDynamicData(
			"abot-board-directors-cards",
			memberId,
			locale,
			"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
		)
	)
	await queryClient.prefetchQuery(["board-members", locale], () =>
		getAllData(
			"abot-board-directors-cards",
			locale,
			"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
		)
	)

	const response = await getDynamicData(
		"abot-board-directors-cards",
		memberId,
		locale,
		"populate[0]=card.imageDesktop1&populate[1]=card.iconImage&populate[2]=card.imageMobile1"
	)
	if (response.data == null || response.data.length == 0) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			memberId: memberId,
			locale: locale,
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}

export default MembersPage
