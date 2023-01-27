import {
	FormTextInput,
	FormNumberInput,
	FormTextFieldInput,
	FormReactSelect,
} from "../common/FormInputs"
import { Formik, useField } from "formik"
import * as Yup from "yup"
import ButtonLink from "../common/ButtonLink"
import { useState } from "react"
import { API_URL } from "../../utils/Data"
import { useTranslation } from "next-i18next"
function ContactUsInput({ formData }) {
	let { t } = useTranslation("common")
	const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)
	const knowMoreOptions = [
		{
			label: "Orascom Development",
			value: "Orascom Development",
		},
		{
			label: `${t("contact_us.real_state")}`,
			value: "Real Estate Projects",
		},
		{
			label: "Hotels",
			value: "Hotels",
		},
	]
	return (
		<div className="contact-form-wrapper">
			<div className="contact-form-text">
				<h2>{formData?.formHeader}</h2>
			</div>
			<Formik
				initialValues={{
					knowMore: "Orascom development",
					fullName: "",
					email: "",
					mobileNumber: "",
					message: "",
				}}
				validationSchema={Yup.object({
					knowMore: Yup.string().required("Required"),
					fullName: Yup.string().required("Required"),
					email: Yup.string()
						.email(`${t("contact_us.valid_email")}`)
						.required(`${t("contact_us.required")}`),

					mobileNumber: Yup.string()
						.min(8, `${t("contact_us.valid_phone")}`)
						.max(15, `${t("contact_us.valid_phone")}`)
						.required(`${t("contact_us.required")}`),
					message: Yup.string().required(`${t("contact_us.required")}`),
				})}
				onSubmit={(values, { resetForm }) => {
					const data = { data: values }
					fetch(`${API_URL}/contact-forms`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-type": "application/json; charset=UTF-8",
						},
					}).then((response) => {
						if (response.status == 200) {
							resetForm()
							setSubmittedSuccessfully(true)
							setTimeout(() => {
								setSubmittedSuccessfully(false)
							}, 1000)
						}
					})
				}}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit}>
						<div className="field-wrapper">
							<div className="input-wrapper">
								<FormReactSelect
									options={knowMoreOptions}
									name="knowMore"
									type="text"
									label={`${t("contact_us.know_more")}`}
									onChange={(e) => {
										formik.setFieldValue("knowMore", e.value)
									}}
									placeholder="Orascom development"
									className="selectInput"
								/>
							</div>
							<div className="input-wrapper">
								<FormTextInput
									name="fullName"
									type="text"
									label={`${t("contact_us.full_name")}`}
									placeholder={`${t("contact_us.full_name")}`}
								/>
							</div>
							<div className="input-wrapper">
								<FormTextInput
									name="email"
									type="email"
									label={`${t("contact_us.email")}`}
									placeholder={`${t("contact_us.email")}`}
								/>
							</div>
							<div className="input-wrapper">
								<FormNumberInput
									name="mobileNumber"
									type="number"
									label={`${t("contact_us.mobile")}`}
									placeholder={`${t("contact_us.mobile")}`}
								/>
							</div>
							<div className="input-wrapper">
								<FormTextFieldInput
									rows="3"
									name="message"
									type="text"
									label={`${t("contact_us.message")}`}
									placeholder={`${t("contact_us.enter_message")}`}
								/>
							</div>
						</div>
						<div className="contact-form-submit-wrapper">
							{/* <button type="submit" className="contact-form-submit">
								{formData?.buttonTitle}
							</button> */}
							<ButtonLink
								title={
									!submittedSuccessfully
										? formData?.buttonTitle
										: `${t("contact_us.thank_you")}`
								}
								blue
								customStyle={"contact-us-form"}
								formBtn
								submittedSuccessfully={submittedSuccessfully}
							/>
						</div>
					</form>
				)}
			</Formik>
		</div>
	)
}

export default ContactUsInput
