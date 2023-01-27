import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

function FormSteps({locationOptions}) {
	const makeRequest = (formData) => {
		// const data = { data: formData };
		const data = { data: formData };
		fetch(`https://guarded-cliffs-43287.herokuapp.com/api/career-forms`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => {
				if (response.status == 200) {
					resetForm();
				}
			})
			.catch((error) => {
			});
	};

	const handleNextStep = (newData, finalStep = false) => {
		setData((prev) => ({ ...prev, ...newData }));
		if (finalStep) {
			// makeRequest(newData);
			// makeRequest(data);
			// return to not increment steps
			return;
		}
		setCurrentStep((prev) => prev + 1);
	};
	const handlePrevStep = (newData) => {
		setData((prev) => ({ ...prev, ...newData }));
		setCurrentStep((prev) => prev - 1);
};

	const [data, setData] = useState({
		fullName: "",
		gender: "",
		email: "",
		mobileNumber: "",
		employmentType: "",
		locationInterested: "",
		jobInterested: "",
		university: "",
		faculty: "",
		yearOfGraduation: "",
		YearsOfExperience: "",
		ProfessionalHighlights: "",
		// uploadCV: "",
	},
	);

	const [currentStep, setCurrentStep] = useState(0);
	const steps = [
		<StepOne
			key={1}
			next={handleNextStep}
			data={data}
			currentStep={currentStep}
			locationOptions={locationOptions}
		/>,
		<StepTwo
			key={2}
			next={handleNextStep}
			prev={handlePrevStep}
			data={data}
			currentStep={currentStep}
		/>,
	];

	return (
		<div className="career-form__steps">
			<div className="steps-form">{steps[currentStep]}</div>
		</div>
	);
}

export default FormSteps;
