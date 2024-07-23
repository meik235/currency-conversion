import React, { useMemo } from "react";
import { PLACEHOLDER_TEXT } from "@/constant/index";
import { IInputFieldProps } from "@/ts/inputField";

const InputField: React.FC<IInputFieldProps> = (props) => {
	const { VALUE } = PLACEHOLDER_TEXT;

	const { label, value, handleInputChange, placeholder, disabled } = props;
	const updatedPlaceholder = placeholder || `Enter ${label || VALUE}`;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleInputChange(event.target.value);
	};

	const RenderLabel = useMemo(() => {
		if (!label) {
			return null;
		}
		return (
			<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
				{label}
			</label>
		);
	}, [label]);

	const RenderInputBox = useMemo(() => {
		return (
			<input
				type='text'
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				value={value}
				onChange={handleChange}
				placeholder={updatedPlaceholder}
				disabled={disabled}
			/>
		);
	}, [value, disabled]);

	return (
		<form>
			<div className='grid gap-6 mb-6 md:grid-row-2'>
				<div>
					{RenderLabel}
					{RenderInputBox}
				</div>
			</div>
		</form>
	);
};

export default InputField;
