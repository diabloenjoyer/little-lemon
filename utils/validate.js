export const isValidEmail = (emailStr) => {
	const emailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	return emailRegEx.test(emailStr);
};

export const isUSPhoneNumber = (phoneStr) => {
	const telWithParenteses = new RegExp(/^\([0-9]{3}\)[0-9]{3}[0-9]{4}$/);
	const telWithoutParenteses = new RegExp(/^[0-9]{3}[0-9]{3}[0-9]{4}$/);
	return (
		telWithParenteses.test(phoneStr) || telWithoutParenteses.test(phoneStr)
	);
};
