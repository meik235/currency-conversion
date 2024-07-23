export interface IButtonProps {
	text: string;
	handleButtonClick: () => void;
	isLoading?: boolean;
	isDisabled?: boolean;
}
