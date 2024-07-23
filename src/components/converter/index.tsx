"use client";

import React, { useState } from "react";
import { BUTTON_TEXT, KEYS, PLACEHOLDER_TEXT } from "@/constant/index";
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
};

const Converter: React.FC = () => {
	const { ENTER_CURRENCY } = PLACEHOLDER_TEXT;
	const { CONVERTER } = BUTTON_TEXT;
	const {
		PRIMARY_CURRENCY_KEY,
		SECONDARY_CURRENCY_KEY,
		PRIMARY_COUNTRY_KEY,
		SECONDARY_COUNTRY_KEY,
	} = KEYS;

	const [currencyData, setCurrencyData] = useState<CurrencyDataType>({
		...initialCurrencyData,
	});

	const {
		primaryCurrency,
		secondaryCurrency,
		primaryCountry,
		secondaryCountry,
	} = currencyData;

	const handleInputChange = (key: string, value: string | number) => {
		setCurrencyData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleButtonClick = () => {};

	return (
		<div>
			<div className='flex flex-row'>
				<InputField
					value={primaryCurrency}
					handleInputChange={(value) =>
						handleInputChange(PRIMARY_CURRENCY_KEY, Number(value))
					}
					placeholder={ENTER_CURRENCY}
				/>
				<Dropdown
					selectedValue={primaryCountry}
					list={["Dashboard", "Settings", "Earnings", "Sign out"]}
					handleInputChange={(value) =>
						handleInputChange(PRIMARY_COUNTRY_KEY, value)
					}
				/>
			</div>
			<div className='flex flex-row'>
				<InputField
					value={secondaryCurrency}
					handleInputChange={(value) =>
						handleInputChange(SECONDARY_CURRENCY_KEY, Number(value))
					}
					placeholder={ENTER_CURRENCY}
				/>
				<Dropdown
					selectedValue={secondaryCountry}
					list={["Dashboard", "Settings", "Earnings", "Sign out"]}
					handleInputChange={(value) =>
						handleInputChange(SECONDARY_COUNTRY_KEY, value)
					}
				/>
			</div>
			<Button
				text={CONVERTER}
				handleButtonClick={handleButtonClick}
			/>
		</div>
	);
};

export default Converter;
