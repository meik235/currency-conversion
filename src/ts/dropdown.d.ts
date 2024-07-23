export interface IDropdownProps {
	label?: string;
	selectedValue: string;
	list: string[];
	handleInputChange: (value: string) => void;
	isDisabled?: boolean;
}
