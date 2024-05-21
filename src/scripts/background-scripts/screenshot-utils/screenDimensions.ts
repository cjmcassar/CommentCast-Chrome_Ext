export const getScreenDimensions = async (): Promise<{
	width: number;
	height: number;
}> => {
	return new Promise((resolve, reject) => {
		chrome.system.display.getInfo((displays) => {
			if (displays.length > 0) {
				// This gets the dimensions of the primary display
				// todo: add support for multiple displays
				// todo: add support for different window sizes
				const primaryDisplay = displays.find((display) => display.isPrimary);
				if (primaryDisplay) {
					resolve({
						width: primaryDisplay.bounds.width,
						height: primaryDisplay.bounds.height,
					});
				} else {
					reject(new Error("Primary display not found."));
				}
			} else {
				reject(new Error("No displays found."));
			}
		});
	});
};
