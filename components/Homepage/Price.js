import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"
import { fetchSharePrice } from "../../utils/Data"
import { useTranslation } from 'next-i18next';
const Price = () => {
	const { t } = useTranslation('common');
	const { data, error, isError, isLoading, isSuccess } = useQuery(
		["share-price"],
		() => fetchSharePrice()
	)
	return (
		<>
			<div className="price">
				<div className="price__wrapper">
					<ul>
						<li>
							<span>{t('home.share_price')}</span>
						</li>
						<li>
							{data?.stockquotes.share.last_price}{" "}
							{data?.stockquotes.share.currency} / {t('home.share')}
						</li>
						<li>
							<Link href={"/investor-relations/share-info"}>
								<span>{t('home.know_more')}</span>
							</Link>
						</li>
						{/* <li className="image-wrapper">
							{parseFloat(data?.stockquotes.share.change_absolute) > 0 ? (
								<Image
									src={"/icons/Rectangle.svg"}
									alt="Rectangle"
									width={12}
									height={12}
								/>
							) : parseFloat(data?.stockquotes.share.change_absolute) < 0 ? (
								<Image
									src={"/icons/Rectangle-red.svg"}
									alt="Rectangle"
									width={12}
									height={12}
									className="Rectangle-bottom"
								/>
							) : (
								""
							)}

							<span>
								{data?.stockquotes.share.change_absolute} (
								{data?.stockquotes.share.change_relative})
							</span>
						</li> */}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Price
