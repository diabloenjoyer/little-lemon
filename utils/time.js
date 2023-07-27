export const getTimeDifferenceInMinutes = (futureTime) => {
	const now = new Date();

	const timeDifferenceInMilliseconds = futureTime - now;
	return timeDifferenceInMilliseconds / (1000 * 60);
};
