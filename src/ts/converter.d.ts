export interface IConverterProps {
	countryCodeArray: [];
}

export type CurrencyDataType = {
	primaryCurrency: number;
	secondaryCurrency: number;
	primaryCountry: string;
	secondaryCountry: string;
	selectedDate: Date | null;
};
