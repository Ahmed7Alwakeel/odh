import Image from "next/image";
import Link from "next/link";

function ButtonLink({
	title,
	customStyle,
	blue,
	link,
	formBtn,
	submittedSuccessfully,
	OHMSection
}) {
	return (
		<>
			{formBtn ? (
				<button
					type="submit"
					className={`read-more__container ${customStyle ? customStyle : ""} ${
						submittedSuccessfully ? "submitted" : ""
					}`}
					disabled={submittedSuccessfully}
				>
					<div className="read-more-link">{title}</div>
					{!submittedSuccessfully && (
						<div className="orascom-line">
							<div className="point">
								<Image
									objectFit="contain"
									layout="responsive"
									width="18px"
									height="18px"
									src="/orascom-circle.svg"
									alt="orascom-logo"
									className={blue ? "blue" : ""}
								/>
							</div>
						</div>
					)}
				</button>
			) : (
					<Link href={link ? link : ""}>
						<a target={OHMSection ? '_blank' : ''}>
							<div
								className={`read-more__container ${customStyle ? customStyle : ""}`}
							>
								<div className="read-more-link">{title}</div>
								<div className="orascom-line">
									<div className="point">
										<Image
											objectFit="contain"
											layout="responsive"
											width="18px"
											height="18px"
											src="/orascom-circle.svg"
											alt="orascom-logo"
											className={blue ? "blue" : ""}
										/>
									</div>
								</div>
							</div>
						</a>
					</Link>
			)}
		</>
	);
}

export default ButtonLink;
