// ... (existing code remains the same)

import { detachDebuggerFromTab } from "./debugLogsBackground";

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
	timeout: number = 1000,
): Promise<any[]> => {
	return new Promise(async (resolve) => {
		const requests: any[] = [];
		let requestsReceived = false;
		let attempts = 0;
		const maxAttempts = 5;

		const listener = (debuggeeId: any, message: any, params: any) => {
			if (message === "Network.requestWillBeSent" && params && params.request) {
				if (params.request.url.startsWith("http")) {
					requests.push(params.request);
					requestsReceived = true;
				}
			}
		};
		chrome.debugger.onEvent.addListener(listener);

		const checkRequests = async () => {
			if (requestsReceived) {
				console.log("Network requests collected:", requests);
				chrome.debugger.onEvent.removeListener(listener);
				await detachDebuggerFromTab(tabId);
				requestsReceived = false;
				resolve(requests);
			} else if (attempts < maxAttempts) {
				console.log("No requests received yet, waiting more...");
				attempts++;
				setTimeout(checkRequests, timeout);
			} else {
				console.log("Maximum attempts reached without receiving requests.");
				chrome.debugger.onEvent.removeListener(listener);
				await detachDebuggerFromTab(tabId);
				resolve(requests);
			}
		};

		setTimeout(await checkRequests, timeout);
	});
};
