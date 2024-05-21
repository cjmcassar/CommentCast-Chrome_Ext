let isCaptureInProgress = false;

export const takeScreenshot = async (windowId: number): Promise<string> => {
	if (isCaptureInProgress) {
		console.log(
			"Screenshot capture is already in progress. Please try again later.",
		);
		return "";
	}
	isCaptureInProgress = true;

	try {
		let imgUrl64 = await chrome.tabs.captureVisibleTab(windowId, {
			format: "jpeg",
			quality: 80,
		});

		return imgUrl64;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		isCaptureInProgress = false;
	}
};
