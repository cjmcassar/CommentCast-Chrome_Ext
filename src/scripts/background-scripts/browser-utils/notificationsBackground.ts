// Handle notification click event

export default function notificationLink() {
	console.log("notificationLink listener added");
	chrome.notifications.onClicked.addListener((notificationId) => {
		chrome.storage.local.get(notificationId, (items) => {
			const url = items[notificationId];
			if (url) {
				chrome.tabs.create({ url });
				// Optionally, clear the stored URL after opening
				// chrome.storage.local.remove(notificationId);
			}
		});
	});
}
