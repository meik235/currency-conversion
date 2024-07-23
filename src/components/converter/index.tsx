"use client";

import React, { useState } from "react";
import { BUTTON_TEXT, KEYS, PLACEHOLDER_TEXT } from "@/constant/index";
import Calander from "../UI/Calander";
import InputField from "../UI/InputField";
import Dropdown from "../UI/Dropdown";
import Button from "../UI/Button";
import { CurrencyDataType } from "@/ts/converter";

// interface IConverterProps {}

const initialCurrencyData: CurrencyDataType = {
	primaryCurrency: 0,
	secondaryCurrency: 0,
	primaryCountry: "",
	secondaryCountry: "",
	selectedDate: null,
};

const Converter: React.FC = () => {
	const { ENTER_CURRENCY } = PLACEHOLDER_TEXT;
	const { CONVERT, WANNA_SWAP } = BUTTON_TEXT;
	const {
		PRIMARY_CURRENCY_KEY,
		SECONDARY_CURRENCY_KEY,
		PRIMARY_COUNTRY_KEY,
		SECONDARY_COUNTRY_KEY,
		SELECTED_DATE_KEY,
	} = KEYS;

	const [currencyData, setCurrencyData] = useState<CurrencyDataType>({
		...initialCurrencyData,
	});
	const [loading, setLoading] = useState(false);

	const {
		primaryCurrency,
		secondaryCurrency,
		primaryCountry,
		secondaryCountry,
		selectedDate,
	} = currencyData;

	const handleInputChange = (
		key: string,
		value: string | number | Date | boolean
	) => {
		setCurrencyData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleConvert = () => {};

	const handleSwap = () => {};

	return (
		<div className='flex flex-col gap-4'>
			<Calander
				value={selectedDate}
				handleDateChange={(value) =>
					handleInputChange(SELECTED_DATE_KEY, value)
				}
				isDisabled={loading}
			/>
			<div className='flex flex-row items-center'>
				<InputField
					value={primaryCurrency}
					handleInputChange={(value) =>
						handleInputChange(PRIMARY_CURRENCY_KEY, value)
					}
					placeholder={ENTER_CURRENCY}
					isDisabled={loading}
				/>
				<Dropdown
					selectedValue={primaryCountry}
					list={["Dashboard", "Settings", "Earnings", "Sign out"]}
					handleInputChange={(value) =>
						handleInputChange(PRIMARY_COUNTRY_KEY, value)
					}
					isDisabled={loading}
				/>
			</div>
			<div className='flex flex-row'>
				<InputField
					value={secondaryCurrency}
					handleInputChange={(value) =>
						handleInputChange(SECONDARY_CURRENCY_KEY, value)
					}
					placeholder={ENTER_CURRENCY}
					isDisabled={loading}
				/>
				<Dropdown
					selectedValue={secondaryCountry}
					list={["Dashboard", "Settings", "Earnings", "Sign out"]}
					handleInputChange={(value) =>
						handleInputChange(SECONDARY_COUNTRY_KEY, value)
					}
					isDisabled={loading}
				/>
			</div>
			<Button
				text={CONVERT}
				handleButtonClick={handleConvert}
				isLoading={loading}
			/>
			<Button
				text={WANNA_SWAP}
				handleButtonClick={handleSwap}
				isDisabled={loading}
			/>
		</div>
	);
};

export default Converter;
