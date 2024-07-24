import React, { useMemo } from "react";
import Loader from "./Loader";
import { IButtonProps } from "@/ts/button";

const Button: React.FC<IButtonProps> = (props) => {
	const { text, handleButtonClick, isLoading, isDisabled } = props;

	const updatedStyle =
		isLoading || isDisabled
			? "bg-gray-400 cursor-not-allowed"
			: "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

	const RenderButton = useMemo(() => {
		return (
			<button
				type='submit'
				className={`flex justify-center text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${updatedStyle}`}
				onClick={handleButtonClick}
				disabled={isLoading || isDisabled}>
				{isLoading ? <Loader size={4} /> : text}
			</button>
		);
	}, [text, handleButtonClick]);

	return RenderButton;
};

export default Button;
