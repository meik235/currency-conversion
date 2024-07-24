"use client";

import React, { useEffect, useState } from "react";
import {
	BUTTON_TEXT,
	COUNTRY_CODE_ARRAY,
	ERROR_MESSAGE,
	KEYS,
	LABEL,
	PLACEHOLDER_TEXT,
} from "@/constant/index";
import Calander from "../ui/Calander";
import InputField from "../ui/InputField";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import { CurrencyDataType, IConverterProps } from "@/ts/converter";
import Heading from "../ui/Heading";
import ApiCalls from "@/network/apiCalls";
import ApiUrls from "@/network/apiUrls";
import { isDateInRange } from "@/utils/index";
import InfoMessage from "../UI/InfoMessage";

const initialCurrencyData: CurrencyDataType = {
	primaryCurrency: 0,
	secondaryCurrency: 0,
	primaryCountry: "INR",
	secondaryCountry: "USD",
	selectedDate: null,
};

const Converter: React.FC<IConverterProps> = ({ countryCodeArray }) => {
	const { CURRENCY_CONVERTOR } = LABEL;
	const { ENTER_CURRENCY } = PLACEHOLDER_TEXT;
	const { CONVERT } = BUTTON_TEXT;
	const { SORRY_SOMETHING_WENT_WORNG, INFO_PRO_PLAN } = ERROR_MESSAGE;
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
	const [lastUpdatedIndex, setLastUpdatedIndex] = useState<number>(0);
	const [newCountryCodeArray, setNewCountryCodeArray] =
		useState<string[]>(countryCodeArray);
	const [loading, setLoading] = useState(false);
	const startDate = "1990-01-01";
	const endDate = "2020-12-31";

	const {
		primaryCurrency,
		secondaryCurrency,
		primaryCountry,
		secondaryCountry,
		selectedDate,
	} = currencyData;

	useEffect(() => {
		const isHistoryDate = isDateInRange(selectedDate, startDate, endDate);
		if (isHistoryDate) {
			setNewCountryCodeArray(COUNTRY_CODE_ARRAY);
			return;
		}
		setNewCountryCodeArray(countryCodeArray);
	}, [selectedDate]);

	const handleInputChange = (
		key: string,
		value: string | number | Date | boolean
	) => {
		const isPrimaryCurrencyKey = key === PRIMARY_CURRENCY_KEY;
		const isSecondaryCurrencyKey = key === SECONDARY_CURRENCY_KEY;

		if (isPrimaryCurrencyKey) {
			setLastUpdatedIndex(0);
		}

		if (isSecondaryCurrencyKey) {
			setLastUpdatedIndex(1);
		}

		setCurrencyData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleConvertBtnClick = async () => {
		setLoading(true);
		try {
			if (selectedDate) {
				await handleHistoryCurrencyConvert(selectedDate);
			} else {
				await handleCurrencyConvert();
			}

			setLoading(false);
		} catch (error: any) {
			setLoading(false);
		}
	};

	const handleHistoryCurrencyConvert = async (searchDate: Date) => {
		const dateUrlStr = getDateUrlStr(searchDate);
		const updatedCountry = lastUpdatedIndex ? secondaryCountry : primaryCountry;
		const updatedCurrency = lastUpdatedIndex
			? secondaryCurrency
			: primaryCurrency;
		const endpoint = `${ApiUrls.history}/${updatedCountry}/${dateUrlStr}/${updatedCurrency}`;
		ApiCalls.get(endpoint, {}, async (response) => {
			const { status, success, data } = response || {};
			const { conversion_amounts } = data || {};
			const updatedAmout = conversion_amounts?.[updatedCountry];

			if (!success || !updatedAmout) {
				alert(SORRY_SOMETHING_WENT_WORNG);
				return;
			}

			if (lastUpdatedIndex) {
				handleInputChange(PRIMARY_CURRENCY_KEY, updatedAmout);
			} else {
				handleInputChange(SECONDARY_CURRENCY_KEY, updatedAmout);
			}
		});
	};

	const handleCurrencyConvert = async () => {
		const endpoint = `${ApiUrls.pair}/${primaryCountry}/${secondaryCountry}`;
		ApiCalls.get(endpoint, {}, async (response) => {
			const { status, success, data } = response || {};
			const { conversion_rate } = data || {};

			if (!success) {
				alert(SORRY_SOMETHING_WENT_WORNG);
				return;
			}

			convertCurrency(conversion_rate);
		});
	};

	const getDateUrlStr = (date: Date) => {
		if (!date) {
			return "";
		}
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();
		const dateUrlStr = `${year}/${month}/${day}`;
		return dateUrlStr;
	};

	const convertCurrency = (conversionRate: number) => {
		if (lastUpdatedIndex) {
			const conversionValue = secondaryCurrency / conversionRate;
			handleInputChange(PRIMARY_CURRENCY_KEY, conversionValue);
		} else {
			const conversionValue = primaryCurrency * conversionRate;
			handleInputChange(SECONDARY_CURRENCY_KEY, conversionValue);
		}
	};

	return (
		<div className='flex flex-col gap-4 items-center justify-center'>
			<Heading text={CURRENCY_CONVERTOR} />
			<div className='flex flex-col gap-4'>
				<Calander
					value={selectedDate}
					handleDateChange={(value) =>
						handleInputChange(SELECTED_DATE_KEY, value)
					}
					isDisabled={true}
				/>
				<InfoMessage message={INFO_PRO_PLAN} />
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
						list={newCountryCodeArray}
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
						list={newCountryCodeArray}
						handleInputChange={(value) =>
							handleInputChange(SECONDARY_COUNTRY_KEY, value)
						}
						isDisabled={loading}
					/>
				</div>
				<Button
					text={CONVERT}
					handleButtonClick={handleConvertBtnClick}
					isLoading={loading}
					isDisabled={loading}
				/>
			</div>
		</div>
	);
};

export default Converter;
