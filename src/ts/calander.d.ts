export interface ICalanderProps {
	label?: string;
	value: Date | null;
	handleDateChange: (value: Date) => void;
	isDisabled?: boolean;
}
