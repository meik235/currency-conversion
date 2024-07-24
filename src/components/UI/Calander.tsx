import React, { useState, useEffect, useMemo } from "react";
import { ICalanderProps } from "@/ts/calander";

const Calander: React.FC<ICalanderProps> = (props) => {
	const { label, value, handleDateChange, isDisabled } = props;
	const [date, setDate] = useState<string>(
		value ? value.toISOString().split("T")[0] : ""
	);

	useEffect(() => {
		if (value) {
			setDate(value.toISOString().split("T")[0]);
		}
	}, [value]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(event.target.value);
		if (!isNaN(newDate.getTime())) {
			setDate(event.target.value);
			handleDateChange(newDate);
		}
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

	const RenderCalanderIcon = useMemo(() => {
		return (
			<div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
				<svg
					className='w-4 h-4 text-gray-500 dark:text-gray-400'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					viewBox='0 0 20 20'>
					<path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
				</svg>
			</div>
		);
	}, []);

	const RenderCalanderInputField = useMemo(() => {
		const disabledStyle = isDisabled
			? "bg-gray-200 cursor-not-allowed dark:bg-gray-800"
			: "";

		return (
			<input
				id='default-datepicker'
				type='date'
				value={date}
				onChange={handleInputChange}
				className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${disabledStyle}`}
				placeholder='Select date'
				disabled={isDisabled}
			/>
		);
	}, [date, isDisabled]);

	return (
		<div className='relative max-w-sm'>
			{RenderLabel}
			{RenderCalanderIcon}
			{RenderCalanderInputField}
		</div>
	);
};

export default Calander;
