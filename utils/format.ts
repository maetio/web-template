export const capitalizeFirstLetter = (str?: String) => {
	if (str) return str.charAt(0).toUpperCase() + str.slice(1);
	return "";
};