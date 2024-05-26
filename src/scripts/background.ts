import { screenshotBackground } from "./background-scripts/screenshotBackground";
import { signIn } from "./background-scripts/authBackground";
import notificationLink from "./background-scripts/browser-utils/notificationsBackground";

function checkUrlAndSignIn(
	tabId: number,
	changeInfo: chrome.tabs.TabChangeInfo,
	tab: chrome.tabs.Tab,
) {
	console.log("checkUrlAndSignIn");
	const url = tab.url;
	if (
		url &&
		(url.includes("http://localhost:3000") ||
			url.includes("https://commentcast-dashboard.vercel.app/"))
	) {
		signIn();
	}
}

chrome.tabs.onUpdated.addListener(checkUrlAndSignIn);

signIn();

screenshotBackground();
notificationLink();
