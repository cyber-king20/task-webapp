import { format, isValid } from 'date-fns';

// 26/01/2023, 09:33 PM
export const DATE_FNS_TIME_FORMAT = 'dd/MM/yy, hh:mm aa';

export const epochToDateTimeLocal = epoch => {
	const date = new Date(epoch);
	const pad = num => String(num).padStart(2, '0');

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // Months are zero-based
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const timestampToFormattedDate = (
	timestamp: number | string | undefined,
	dateFormat: string = DATE_FNS_TIME_FORMAT
) => {
	return timestamp !== undefined && isValid(timestamp) ? format(new Date(timestamp), dateFormat) : '';
};
