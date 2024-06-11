export const enableNetworkForTab = async (tabId: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		chrome.debugger.sendCommand({ tabId }, "Network.enable", {}, () => {
			if (chrome.runtime.lastError) {
				reject(
					new Error(
						`Failed to enable network for tab ${tabId}: ${chrome.runtime.lastError.message}`,
					),
				);
			} else {
				console.log("Network enabled for tab:", tabId);
				resolve();
			}
		});
	});
};

export const collectNetworkRequests = (
	tabId: number,
	timeout: number = 500,
): Promise<any[]> => {
	return new Promise(async (resolve) => {
		const requests: any[] = [];
		let requestsReceived = false;
		let attempts = 0;
		const maxAttempts = 3;

		const listener = (debuggeeId: any, message: any, params: any) => {
			if (message === "Network.loadingFailed" && params && params.errorText) {
				if (params.type === "Fetch") {
					requests.push(params);
					requestsReceived = true;
				}
			} else {
				console.log("Network request:", params);
				console.log("Network message:", message);
			}
		};
		chrome.debugger.onEvent.addListener(listener);

		const checkRequests = async () => {
			if (requestsReceived) {
				console.log("Network requests collected:", requests);
				chrome.debugger.onEvent.removeListener(listener);
				requestsReceived = false;
				resolve(requests);
			} else if (attempts < maxAttempts) {
				console.log("No requests received yet, waiting more...");
				attempts++;
				setTimeout(checkRequests, timeout);
			} else {
				console.log("Maximum attempts reached without receiving requests.");
				chrome.debugger.onEvent.removeListener(listener);
				resolve(requests);
			}
		};

		setTimeout(await checkRequests, timeout);
	});
};
