const attachDebuggerToTab = async (tabId: number): Promise<void> => {
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

const enableConsoleForTab = async (tabId: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		chrome.debugger.sendCommand({ tabId }, "Console.enable", {}, () => {
			if (chrome.runtime.lastError) {
				reject(
					new Error(
						`Failed to enable console for tab ${tabId}: ${chrome.runtime.lastError.message}`,
					),
				);
			} else {
				// console.log("Console enabled for tab:", tabId);
				resolve();
			}
		});
	});
};

const detachDebuggerFromTab = async (tabId: number): Promise<void> => {
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

const collectConsoleLogs = (
	tabId: number,
	timeout: number = 2000,
): Promise<any[]> => {
	return new Promise((resolve) => {
		const logs: any[] = [];
		const listener = (debuggeeId: any, message: any, params: any) => {
			if (message === "Console.messageAdded" && params && params.message) {
				logs.push(params.message);
			}
		};
		chrome.debugger.onEvent.addListener(listener);

		setTimeout(async () => {
			chrome.debugger.onEvent.removeListener(listener);
			await detachDebuggerFromTab(tabId);
			resolve(logs);
		}, timeout);
	});
};

export const getConsoleLogs = async (): Promise<any[]> => {
	try {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tabs.length === 0) throw new Error("No active tab found");

		const currentTabId = tabs[0].id;
		if (typeof currentTabId !== "number") throw new Error("Invalid tab ID");

		await attachDebuggerToTab(currentTabId);
		await enableConsoleForTab(currentTabId);
		const logs = await collectConsoleLogs(currentTabId);
		return logs;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
