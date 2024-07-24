export const isDateInRange = (
	date: Date | null,
	startDate: string,
	endDate: string
): boolean => {
	if (!date) {
		return false;
	}

	const givenDate = new Date(date);
	const start = new Date(startDate);
	const end = new Date(endDate);

	return givenDate >= start && givenDate <= end;
};
