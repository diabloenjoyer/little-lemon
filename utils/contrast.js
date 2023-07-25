const CUSTOM_CONTRAST_TRESHOLD = 150;
const WHITE = "#ffffff";
const BLACK = "#000000";

export const getTextColor = (hexStr) => calculateContrast(hexToRgb(hexStr));

const hexToRgb = (hexStr) => {
	if (hexStr.length !== 4 && hexStr.length !== 7) {
		throw new Error(
			"The input hex string must have a length of either 4 or 7."
		);
	}

	const hexValue =
		hexStr.length === 3 ? hexStr.splice(1).repeat(2) : hexStr.slice(1);
	const red = parseInt(hexValue.slice(0, 2), 16);
	const green = parseInt(hexValue.slice(2, 4), 16);
	const blue = parseInt(hexValue.slice(4, 6), 16);

	return [red, green, blue];
};

const calculateContrast = (hexArray) =>
	hexArray[0] * 0.299 + hexArray[1] * 0.587 + hexArray[2] * 0.144 <
	CUSTOM_CONTRAST_TRESHOLD
		? WHITE
		: BLACK;
