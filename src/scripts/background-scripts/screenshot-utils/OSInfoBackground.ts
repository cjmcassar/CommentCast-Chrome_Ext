export const getPlatformInfo = async (): Promise<{
	platformInfo: chrome.runtime.PlatformInfo;
}> => {
	return new Promise((resolve, reject) => {
		chrome.runtime.getPlatformInfo((platformInfo) => {
			if (chrome.runtime.lastError) {
				console.error(
					"Failed to get platform info:",
					chrome.runtime.lastError.message,
				);
				return reject(chrome.runtime.lastError);
			} else {
				resolve({ platformInfo: platformInfo });
			}
		});
	});
};
