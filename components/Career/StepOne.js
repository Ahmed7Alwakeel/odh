import React from "react";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ButtonLink from "../common/ButtonLink";
import Select from "react-select";
import { useTranslation } from "next-i18next";

export default function StepOne({ data, next, currentStep, locationOptions }) {
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const { t } = useTranslation("common");

	const stepOneValidationSchema = Yup.object({
		fullName: Yup.string().required(`${t("headers.required")}`),
		gender: Yup.string().required(`${t("headers.required")}`),
		email: Yup.string()
			.email(`${t("careers.invalid-email-format")}`)
			.required(`${t("headers.required")}`),
		mobileNumber: Yup.string()
			.required(`${t("headers.required")}`)
			.matches(phoneRegExp, `${t("careers.Phone-number-is-not-valid")}`),
		employmentType: Yup.string().required(`${t("headers.required")}`),
		locationInterested: Yup.string().required(`${t("headers.required")}`),
		jobInterested: Yup.string().required(`${t("headers.required")}`),
	});

	// const
	const mappedOptions = [];
	locationOptions?.map((country) => {
		mappedOptions.push({
			label: country.attributes.location,
			value: country.attributes.location,
		});
	});

	// const handleSubmit = (values) => {
	// 	next(values);
	// };

	const customStyles = {
		menu: (provided, state) => ({
			...provided,
			borderRadius: "0",
		}),
		menuList: (provided, state) => ({
			...provided,
			padding: "0",
			"> .css-1n7v3ny-option": {
				cursor: "pointer",
				backgroundcolor: "#ddd",
				color: "#000000",
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? "#1e366c"
				: state.isFocused
				? `#ddd`
				: "white",
			cursor: "pointer",
			fontSize: "1.3rem",
			"&:hover": {
				backgroundColor: state.isSelected ? "#1e366c" : `#ddd`,
			},
		}),
		// placeholder: (provided, state) => ({
		//     ...provided,
		// }),
		control: (provided, state) => ({
			...provided,
			boxShadow: "none",
			borderRadius: "0rem",
			cursor: "pointer",
			paddingInlineStart: "0.5rem",
			fontSize: "1.3rem",
		}),
		singleValue: (provided, state) => ({
			...provided,
			fontSize: "1.3rem",
		}),
		valueContainer: (provided, state) => ({
			...provided,
			padding: 0,
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			display: "none",
		}),
	};

	return (
		<Formik
			initialValues={data}
			validationSchema={stepOneValidationSchema}
			onSubmit={(values, { resetForm }) => {
				next(values);
				resetForm();
			}}
		>
			{(formProps) => (
				<Form>
					<div className="steps-tap">
						<ul className="tab__list">
							<li className={`tab__item ${currentStep == 0 ? "active" : ""}`}>
								{t("careers.step-1")}
							</li>
							<li className={`tab__item ${currentStep == 1 ? "active" : ""}`}>
								{t("careers.step-2")}
							</li>
						</ul>
					</div>
					<div className="form-wrapper">
						<div className="field-wrapper">
							<label className="file-input__label" htmlFor="fullName">
								{t("careers.full-name")}
							</label>
							<div className="input-wrapper">
								<Field
									placeholder={t("careers.full-name")}
									name="fullName"
									className={"text-input"}
								/>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="fullName" />
							</p>
						</div>
						<div className="field-wrapper">
							<label className="control-label" htmlFor="gender">
								{t("careers.gender")}
							</label>
							<div className="field-wrapper-container">
								<div className="input-wrapper input-wrapper--flex">
									<Field
										id="maleOption"
										type="radio"
										name="gender"
										value="Male"
										className="radio-buttom"
									/>

									<label className="control-label" htmlFor="maleOption">
										{t("careers.male")}
									</label>
								</div>
								<div className="input-wrapper input-wrapper--flex">
									<Field
										id="femaleOption"
										type="radio"
										name="gender"
										value="Female"
										className="radio-buttom"
									/>
									<label className="control-label" htmlFor="femaleOption">
										{t("careers.female")}
									</label>
								</div>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="gender" />
							</p>
						</div>
						<div className="field-wrapper">
							<label className="file-input__label" htmlFor="email">
								{t("careers.email-id")}
							</label>
							<div className="input-wrapper">
								<Field
									placeholder={t("careers.email-id")}
									type="email"
									name="email"
									className={"text-input"}
								/>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="email" />
							</p>
						</div>
						<div className="field-wrapper">
							<label className="file-input__label" htmlFor="mobileNumber">
								{t("careers.mobile-number")}
							</label>
							<div className="input-wrapper">
								<Field
									type="number"
									placeholder={t("careers.mobile-number")}
									name="mobileNumber"
									className={"text-input"}
								/>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="mobileNumber" />
							</p>
						</div>
						<div className="field-wrapper">
							<label className="control-label" htmlFor="employmentType">
								{t("careers.employment-type")}
							</label>
							<div className="field-wrapper-container">
								<div className="input-wrapper input-wrapper--flex">
									<Field
										id="fullTime"
										type="radio"
										name="employmentType"
										value="Full Time"
										className="radio-buttom"
									/>
									<label className="control-label" htmlFor="fullTime">
										{t("careers.full-time")}
									</label>
								</div>
								<div className="input-wrapper input-wrapper--flex">
									<Field
										id="partTime"
										type="radio"
										name="employmentType"
										value="Part Time"
										className="radio-buttom"
									/>
									<label className="control-label" htmlFor="partTime">
										{t("careers.Part-time")}
									</label>
								</div>
								<div className="input-wrapper input-wrapper--flex">
									<Field
										id="internship"
										type="radio"
										name="employmentType"
										value="Internship"
										className="radio-buttom"
									/>
									<label className="control-label" htmlFor="internship">
										{t("careers.internship")}
									</label>
								</div>
							</div>

							<p className="errorMsg">
								<ErrorMessage name="employmentType" />
							</p>
						</div>
						<div className="field-wrapper locationSelectionInput">
							<label className="file-input__label" htmlFor="location">
								{t("careers.location-interested-to-work-in")}
							</label>
							<div className="input-wrapper">
								<Select
									name="locationInterested"
									options={mappedOptions}
									onChange={(e) => {
										formProps.setFieldValue("locationInterested", e.value);
									}}
									instanceId={"SelectLocation"}
									styles={customStyles}
								/>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="locationInterested" />
							</p>
						</div>
						<div className="field-wrapper jobInterestInput">
							<label className="file-input__label" htmlFor="jobInterested">
								{t("careers.job-Interested-in")}
							</label>
							<div className="input-wrapper">
								<Field
									placeholder={t("careers.ex-accountant")}
									name="jobInterested"
									className={"text-input"}
								/>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="jobInterested" />
							</p>
						</div>
						<div className="contact-form-submit-wrapper">
							{/* <button className="contact-form-submit" type="submit"> */}
							{/* Next */}
							<ButtonLink
								title={t("careers.next")}
								blue
								customStyle="careers-form-btn"
								formBtn
							/>
							{/* </button> */}
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
