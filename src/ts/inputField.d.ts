export interface IInputFieldProps {
	label?: string;
	value: string | number;
	handleInputChange: (value: string | number | boolean) => void;
	placeholder?: string;
	isDisabled?: boolean;
}
