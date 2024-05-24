export const attachDebuggerToTab = async (tabId: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		chrome.debugger.attach({ tabId }, "1.0", () => {
			if (chrome.runtime.lastError) {
				reject(
					new Error(
						`Failed to attach debugger to tab ${tabId}: ${chrome.runtime.lastError.message}`,
					),
				);
			} else {
				console.log("Debugger attached successfully.");
				resolve();
			}
		});
	});
};

export const enableConsoleForTab = async (tabId: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		chrome.debugger.sendCommand({ tabId }, "Console.enable", {}, () => {
			if (chrome.runtime.lastError) {
				reject(
					new Error(
						`Failed to enable console for tab ${tabId}: ${chrome.runtime.lastError.message}`,
					),
				);
			} else {
				console.log("Console enabled for tab:", tabId);
				resolve();
			}
		});
	});
};

export const detachDebuggerFromTab = async (tabId: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		chrome.debugger.detach({ tabId }, () => {
			if (chrome.runtime.lastError) {
				reject(
					new Error(
						`Failed to detach debugger from tab ${tabId}: ${chrome.runtime.lastError.message}`,
					),
				);
			} else {
				console.log("Debugger detached from tab:", tabId);
				resolve();
			}
		});
	});
};

export const collectConsoleLogs = (
	tabId: number,
	timeout: number = 1000,
): Promise<any[]> => {
	return new Promise(async (resolve) => {
		const logs: any[] = [];
		let logsReceived = false;
		let attempts = 0;
		const maxAttempts = 5;

		const listener = (debuggeeId: any, message: any, params: any) => {
			if (message === "Console.messageAdded" && params && params.message) {
				logs.push(params.message);
				logsReceived = true;
			} else {
				console.log("Debugger log:", params);
				console.log("Debugger message:", message);
				console.log("Debugger debuggeeId:", debuggeeId);
			}
		};
		chrome.debugger.onEvent.addListener(listener);

		const checkLogs = async () => {
			if (logsReceived) {
				console.log("Logs collected:", logs);
				chrome.debugger.onEvent.removeListener(listener);
				await detachDebuggerFromTab(tabId);
				logsReceived = false;
				resolve(logs);
			} else if (attempts < maxAttempts) {
				console.log("No logs received yet, waiting more...");
				attempts++;
				setTimeout(checkLogs, timeout);
			} else {
				console.log("Maximum attempts reached without receiving logs.");
				chrome.debugger.onEvent.removeListener(listener);
				await detachDebuggerFromTab(tabId);
				resolve(logs);
			}
		};

		setTimeout(await checkLogs, timeout);
	});
};

export const getConsoleLogs = async (): Promise<any[]> => {
	try {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tabs.length === 0) throw new Error("No active tab found");

		const currentTabId = tabs[0].id;

		if (typeof currentTabId !== "number") throw new Error("Invalid tab ID");

		await attachDebuggerToTab(currentTabId);

		setTimeout(async () => {
			await enableConsoleForTab(currentTabId);
		}, 1000);

		const logs = await collectConsoleLogs(currentTabId);

		return logs;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
