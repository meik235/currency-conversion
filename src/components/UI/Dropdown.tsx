import React, { useEffect, useMemo, useRef, useState } from "react";
import { IDropdownProps } from "@/ts/dropdown";
import { PLACEHOLDER_TEXT } from "@/constant/index";

const Dropdown: React.FC<IDropdownProps> = (props) => {
	const { SELECT_AN_OPTION } = PLACEHOLDER_TEXT;

	const { label, selectedValue, list, handleInputChange, isDisabled } = props;

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const updatedLabel = label || selectedValue || SELECT_AN_OPTION;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleItemClick = (data: string) => {
		handleInputChange(data);
		setIsOpen(false);
	};

	const getItemClassName = (data: string) => {
		return `block px-4 py-2 ${
			data === selectedValue
				? "bg-gray-100 dark:bg-gray-600"
				: "hover:bg-gray-100 dark:hover:bg-gray-600"
		} dark:text-white`;
	};

	const RenderDropdownButton = useMemo(() => {
		const updatedStyle = isDisabled
			? "bg-gray-400 cursor-not-allowed"
			: "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

		return (
			<button
				id='dropdownDefaultButton'
				onClick={toggleDropdown}
				className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[180px] h-[44px] ${updatedStyle}`}
				type='button'
				disabled={isDisabled}>
				{updatedLabel}
				<svg
					className='w-2.5 h-2.5 ml-3'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 10 6'>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='m1 1 4 4 4-4'
					/>
				</svg>
			</button>
		);
	}, [isOpen, updatedLabel]);

	const RenderDropdownMenu = useMemo(() => {
		if (!isOpen) return null;

		return (
			<div
				ref={dropdownRef}
				id='dropdown'
				className='absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
				<ul
					className='py-2 text-sm text-gray-700 dark:text-gray-200'
					aria-labelledby='dropdownDefaultButton'>
					{list?.map((data, index) => (
						<li
							key={index}
							onClick={() => handleItemClick(data)}
							className={getItemClassName(data)}>
							<a
								href='#'
								className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
								{data}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	}, [list, isOpen]);

	return (
		<div className='relative'>
			{RenderDropdownButton}
			{RenderDropdownMenu}
		</div>
	);
};

export default Dropdown;
