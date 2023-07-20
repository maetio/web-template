export /**
 * Return the time string
 * i.e. 4:45 a.m.
 * @param {Date} date
 */
const getTimeString = (date: Date) =>
	`${date.getHours() % 12 || 12}:${
		date?.getMinutes() < 10 ? `0${date?.getMinutes()}` : date.getMinutes()
	} ${date?.getHours() > 11 ? "p.m." : "a.m."}`;

export /**
 * Return the full date string
 * i.e. January 3, 2022 or March 3 within 9 months of the future
 * @param {Date} date
 * @return {*} string
 */
const getFullDateString = (date: Date) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const current = new Date();
	// show year if 9 months in future, and no more than 1 month previous
	const nineMonthsMilliseconds = 9 * 31 * 24 * 60 * 60 * 1000;
	const oneMonthMilliseconds = 1 * 31 * 24 * 60 * 60 * 1000;
	const showYear =
		date.getUTCMilliseconds() - current.getUTCMilliseconds() >
			nineMonthsMilliseconds &&
		current.getUTCMilliseconds() - date.getUTCMilliseconds() >
			oneMonthMilliseconds;

	// return the date string, add the full year if its behind in time or a different year
	return `${monthNames[date.getMonth()]} ${date.getDate()}${
		showYear ? `, ${date.getFullYear()}` : ""
	}`;
};

export /**
 * Return the short date string
 * i.e. Jan 2022 or Mar 3 within 9 months of the future
 * @param {Date} date
 * @return {*} string
 */
const getShortDateString = (date: Date) => {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const current = new Date();
	// show year if 9 months in future, and no more than 1 month previous
	const nineMonthsMilliseconds = 9 * 31 * 24 * 60 * 60 * 1000;
	const oneMonthMilliseconds = 1 * 31 * 24 * 60 * 60 * 1000;
	const showYear =
		date.getUTCMilliseconds() - current.getUTCMilliseconds() >
			nineMonthsMilliseconds &&
		current.getUTCMilliseconds() - date.getUTCMilliseconds() >
			oneMonthMilliseconds;

	// return the date string, add the full year if its behind in time or a different year
	return `${monthNames[date.getMonth()]} ${
		showYear ? date.getFullYear() : date.getDate()
	}`;
};

export /**
 * Will return whether the date is today or not, using local time
 *
 * @param {Date} date
 * @return {*}
 */
const isToday = (date: Date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export /**
 * Function will return the time if the date is today, otherwise the short date
 *
 * @param {Date} date
 * @return {*}
 */
const showTimeOrDate = (date: Date) => {
	if (isToday(date)) return getTimeString(date);
	return getFullDateString(date);
};

export /**
 * Add days to date
 *
 * @param {Date} date
 * @param {number} days
 * @return {*}
 */
const addDays = (date: Date, days: number) => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export /**
 * Subtract days from date
 *
 * @param {Date} date
 * @param {number} days
 * @return {*}
 */
const subtractDays = (date: Date, days: number) => {
	const result = new Date(date);
	result.setDate(result.getDate() - days);
	return result;
};
