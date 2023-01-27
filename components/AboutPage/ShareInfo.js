import { useQuery } from "react-query"
import { fetchShareInfo } from "../../utils/Data"

const ShareInfo = () => {
	const { data, error, isError, isLoading, isSuccess } = useQuery(
		["share-info"],
		() => fetchShareInfo()
	)
	return (
		<>
			<iframe
				src="https://charts3.equitystory.com/chart/orascom/English/"
				frameBorder="0"
				scrolling="no"
				style={{ height: "120rem;", width: "100%", padding: "4rem 6.5rem" }}
			></iframe>
		</>
	)
}

export default ShareInfo
