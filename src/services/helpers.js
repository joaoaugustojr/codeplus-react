export const upperCaseValue = (text) => {
	return text.toUpperCase();
};

export const shortText = (text, size, limit) => {
	var short = text;
	if (text.length >= size + 3) {
		short = text.substring(0, size).concat(limit);
	}
	return short;
};
