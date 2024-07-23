import axios from "axios";
import { MIDDLEWARE } from "@/constant/index"; 

// Create and configure Axios instance
const createAxiosInstance = (baseURL: string | undefined) => {
	const instance = axios.create({
		baseURL,
	});
	return instance;
};

const axiosInstance = createAxiosInstance(MIDDLEWARE);

interface ApiResponse {
	success: boolean;
	status: number;
	data: any;
}

// Define ApiCalls object with the get method
const ApiCalls = {
	get: function (url: string, params: object = {}, onFinish: (response: ApiResponse) => void) {
		axiosInstance
			.get(url, { params }) // Pass params as part of the options object
			.then((response) => {
				onFinish({
					success: true,
					status: response.status,
					data: response.data,
				});
			})
			.catch((error) => {
				const status = error.response?.status || 0;
				const data = error.response?.data || {};
				onFinish({
					success: false,
					status,
					data,
				});
			});
	},
};

export default ApiCalls;
