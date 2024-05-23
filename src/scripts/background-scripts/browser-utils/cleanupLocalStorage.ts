export function cleanupLocalStorage() {
	console.log("cleanupLocalStorage initiated");
	chrome.storage.local.get(null, (items) => {
		const allKeys = Object.keys(items);
		allKeys.forEach((key) => {
			// Example condition: remove if the URL contains a specific issue number or based on other logic
			if (items[key].includes("issues")) {
				chrome.storage.local.remove(key, () => {
					if (chrome.runtime.lastError) {
						console.error(
							`Failed to remove ${key} from local storage:`,
							chrome.runtime.lastError,
						);
					} else {
						console.log(`Removed ${key} from local storage.`);
					}
				});
				// Break after the first removal to ensure the function only runs once
				return;
			}
		});
	});
}
