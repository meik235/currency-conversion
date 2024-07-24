export const MIDDLEWARE = process.env.BASE_API_URL;
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const EXCHANGERATE_API_KEY = process.env.EXCHANGERATE_API_KEY;

export const LABEL = {
	CURRENCY_CONVERTOR: "Currency Convertor",
};

export const PLACEHOLDER_TEXT = {
	ENTER_CURRENCY: "Enter currency",
	VALUE: "value",
	SELECT_AN_OPTION: "Select an option",
	CHIP: "----",
};

export const BUTTON_TEXT = {
	CONVERT: "Convert",
	WANNA_SWAP: "Wanna Swap?",
};

export const KEYS = {
	PRIMARY_CURRENCY_KEY: "primaryCurrency",
	SECONDARY_CURRENCY_KEY: "secondaryCurrency",
	PRIMARY_COUNTRY_KEY: "primaryCountry",
	SECONDARY_COUNTRY_KEY: "secondaryCountry",
	SELECTED_DATE_KEY: "selectedDate",
};

export const COUNTRY_CODE_ARRAY: string[] = [
	"AUD",
	"ATS",
	"BEF",
	"BRL",
	"CAD",
	"CHF",
	"CNY",
	"DEM",
	"DKK",
	"ESP",
	"EUR",
	"FIM",
	"FRF",
	"GBP",
	"GRD",
	"HKD",
	"IEP",
	"INR",
	"IRR",
	"ITL",
	"JPY",
	"KRW",
	"LKR",
	"MXN",
	"MYR",
	"NOK",
	"NLG",
	"NZD",
	"PTE",
	"SEK",
	"SGD",
	"THB",
	"TWD",
	"USD",
	"ZAR",
];

export const ERROR_MESSAGE = {
	SORRY_SOMETHING_WENT_WORNG: "Sorry! Something went worng. :(",
	INFO_PRO_PLAN:
		"You can't use the date feature because a Pro plan is required to get the information.",
};
