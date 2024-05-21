export const getCurrentTabUrl = async (): Promise<string> => {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0 && tabs[0].url) {
				resolve(tabs[0].url);
			} else {
				reject(new Error("No active tab found or URL is not accessible."));
			}
		});
	});
};
