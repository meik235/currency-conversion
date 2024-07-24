import React, { use } from "react";
import Converter from "@/components/converter/index";
import { MIDDLEWARE, EXCHANGERATE_API_KEY } from "@/constant/index";
import ApiUrls from "@/network/apiUrls";

async function fetchCountryCode() {
	const endpoint = `${MIDDLEWARE}${EXCHANGERATE_API_KEY}${ApiUrls.codes}`;
	const countryCodeResponse = await fetch(endpoint);
	if (!countryCodeResponse.ok) {
		return [];
	}
	const countryCodeResponseData = await countryCodeResponse?.json();
	return countryCodeResponseData;
}

const HomePage: React.FC = () => {
	const { supported_codes } = use(fetchCountryCode());
	const countryCodeArray = supported_codes?.map(
		(currency: [][]) => currency[0]
	);

	return <Converter countryCodeArray={countryCodeArray || []} />;
};

export default HomePage;
