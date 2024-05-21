export const getBrowserName = (): string => {
	const userAgent = navigator.userAgent;
	switch (true) {
		case userAgent.includes("Chrome"):
			return "Google Chrome";
		case userAgent.includes("Firefox"):
			return "Mozilla Firefox";
		case userAgent.includes("Safari"):
			return "Apple Safari";
		case userAgent.includes("Edge"):
			return "Microsoft Edge";
		default:
			return "Unknown Browser";
	}
};
