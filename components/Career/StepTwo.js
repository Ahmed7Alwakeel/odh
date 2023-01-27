import React, { useState } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ButtonLink from "../common/ButtonLink";
import { API_URL } from "../../utils/Data";
import { useTranslation } from 'next-i18next';

export default function StepTwo({ data, next, prev, currentStep }) {
	const { t } = useTranslation('common');

	const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
	const [CVFileName, setCVFileName] = useState();

	const stepTwoValidationSchema = Yup.object({
		university: Yup.string().required(`${t('headers.required')}`),
		faculty: Yup.string().required(`${t('headers.required')}`),
		yearOfGraduation: Yup.number().required(`${t('headers.required')}`),
		YearsOfExperience: Yup.number().required(`${t('headers.required')}`),
		// ProfessionalHighlights: Yup.string().required(`Required`),
		uploadCV: Yup.string().required(`${t('headers.required')}`)
	});

	// const handleSubmit = (values) => {
	// 	next(values, true);
	// 	resetForm();
	// };



	return (
		<Formik
			initialValues={data}
			validationSchema={stepTwoValidationSchema}
			onSubmit={(values, { resetForm }) => {

				let formData = new FormData()

				let finalData = {
					fullName: values.fullName,
					gender: values.gender,
					email: values.email,
					mobileNumber: values.mobileNumber,
					employmentType: values.employmentType,
					locationInterested: values.locationInterested,
					jobInterested: values.jobInterested,
					university: values.university,
					faculty: values.faculty,
					yearOfGraduation: values.yearOfGraduation,
					YearsOfExperience: values.YearsOfExperience,
					ProfessionalHighlights: values.ProfessionalHighlights
				}

				formData.append("data", JSON.stringify(finalData));
				formData.append("files.uploadCV", values.uploadCV);
				fetch(`${API_URL}/career-forms`, {
					method: "POST",
					body: formData,
					headers: {
						// "Content-type": "application/formData; charset=UTF-8",
					},
				})
					.then((response) => {
						if (response.status == 200) {
							resetForm();
							setSubmittedSuccessfully(true);
							setTimeout(() => {
								setSubmittedSuccessfully(false)
							}, 10000);
						}
					})
			}}
		>
			{(formProps) => (
				<Form>
					<div className="steps-tap">
						<ul className="tab__list">
							<li
								onClick={() => {
									prev(formProps.values);
								}}
								className={`tab__item ${currentStep == 0 ? "active" : ""}`}
							>
								{t('careers.step-1')}
							</li>
							<li className={`tab__item ${currentStep == 1 ? "active" : ""}`}>
							{t('careers.step-2')}
							</li>
						</ul>
					</div>
					<div className="form-wrapper">
						<div className="field-wrapper">
							<label className="file-input__label" htmlFor="university">
								{t('careers.university')}
							</label>
							<div className="input-wrapper">
								<Field
									placeholder={t('careers.university')}
									name="university"
									className={"text-input"}
								/>
							</div>
							<p className="errorMsg">
								<ErrorMessage name="university" />
							</p>
						</div>
						<p className="errorMsg">
							<ErrorMessage name="university" />
						</p>
					</div>
					<div className="field-wrapper">
						<label className="file-input__label" htmlFor="faculty">
							{t('careers.faculty')}
						</label>
						<div className="input-wrapper">
							<Field
								placeholder={t('careers.faculty')}
								name="faculty"
								className={"text-input"}
							/>
						</div>
						<p className="errorMsg">
							<ErrorMessage name="faculty" />
						</p>
					</div>
					<div className="field-wrapper">
						<label className="file-input__label" htmlFor="yearOfGraduation">
							{t('careers.year-of-graduation')}
						</label>
						<div className="input-wrapper">
							<Field
								placeholder={t('careers.year-of-graduation')}
								name="yearOfGraduation"
								type="number"
								className={"text-input"}
							/>
						</div>
						<p className="errorMsg">
							<ErrorMessage name="yearOfGraduation" />
						</p>
					</div>
					<div className="field-wrapper">
						<label className="file-input__label" htmlFor="YearsOfExperience">
							{t('careers.years-of-experience')}
						</label>
						<div className="input-wrapper">
							<Field
								name="YearsOfExperience"
								placeholder={t('careers.years-of-experience')}
								type="number"
								className={"text-input"}
							/>
						</div>
						<p className="errorMsg">
							<ErrorMessage name="YearsOfExperience" />
						</p>
					</div>
					<div className="field-wrapper">
						<label
							className="file-input__label"
							htmlFor="ProfessionalHighlights"
						>
							{t('careers.professional-highlights')}
						</label>
						<div className="input-wrapper">
							<Field
								as="textarea"
								rows="3"
								name="ProfessionalHighlights"
								placeholder={t('careers.professional-highlights')}
								className={"text-input"}
							/>
						</div>
						<p className="errorMsg">
							<ErrorMessage name="ProfessionalHighlights" />
						</p>
					</div>
					<div className="field-wrapper">
						<div className="field-wrapper-container field-wrapper-container--column uploadCV">
							<label className="title">
							{t('careers.techincal-skills-soft-skills-certificates-etc')}
							</label>
							<p>{t('careers.upload-CV')}</p>
							<div className="field-wrapper">
								<input
								// <Field
									name="uploadCV"
									id="inputGroupFile06"
									className="field"
									type="file"
									accept=".pdf, .doc, .docx, .txt, .rtf"
									onChange={(event) => {
										formProps.setFieldValue("uploadCV", event.target.files[0]);
										setCVFileName(event.target.files[0].name)
									}}
								/>
								<label className="file-input__label" htmlFor="inputGroupFile06">
									{" "}
									{t('careers.choose-file')}
								</label>
							</div>
							{formProps.errors.uploadCV ? 
								<span className="errorMsg">
									{formProps.errors.uploadCV}
								</span>
								:
								<span style={{color: '#999999'}}>{CVFileName}</span>		
						}
							<span>{t('careers.alloweextensions-pdf-docx-doc-rtf-txt')}</span>
						</div>
					</div>
					<div className="contact-form-submit-wrapper">
						{/* <button className="contact-form-submit" type="submit"> */}
							<ButtonLink
								title={!submittedSuccessfully ? (`${t('careers.submit')}`) : (`${t('careers.thank-you-for-reaching-out')}`)}
								blue
								customStyle="careers-form-btn"
								formBtn
								submittedSuccessfully={submittedSuccessfully}
							/>
						{/* </button> */}
					</div>
				</Form>
			)}
		</Formik>
	);
}
