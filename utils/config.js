export const API_ENDPOINTS = {
	MENU: "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json",
	MENU_IMAGE(imageFileName) {
		return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;
	},
};
