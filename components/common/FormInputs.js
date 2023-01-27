import { useField } from "formik"
import Select from "react-select"
import { customStyles3 } from "../../utils/SelectOptions"

const FormReactSelect = ({ label, ...props }) => {
	const [field, meta, { setValue, setTouched, setError }] = useField(props)

	return (
		<div>
			<label htmlFor={props.id || props.name} className="form-label">
				{label}
			</label>
			<Select
				defaultValue={props.options.find((option) => option.value === field.value)}
				options={props.options}
				getOptionLabel={(option) => option.label}
				getOptionValue={(option) => option.value}
				onChange={props.onChange}
				onBlur={setTouched}
				styles={customStyles3}
				placeholder={props.placeholder}
				isSearchable={false}
				className={`select-input ${
					meta.error && meta.touched ? "error-border" : ""
				}`}
				maxMenuHeight={"16.5rem"}
				name={props.name}
				isDisabled={props.disabled ? true : false}
				instanceId={Math.random(1, 1000)}
			/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	)
}

const FormTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className={`text-input ${
					meta.error && meta.touched ? "error-border" : ""
				}`}
				{...field}
				{...props}
			/>

			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

const FormNumberInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className={`text-input ${
					meta.error && meta.touched ? "error-border" : ""
				}`}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

const FormTextFieldInput = ({ label, row, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<textarea rows={row} className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

const FormSelect = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	)
}

export {
	FormTextInput,
	FormTextFieldInput,
	FormSelect,
	FormReactSelect,
	FormNumberInput,
}
