import { screenshotBackground } from "./background-scripts/screenshotBackground";
import { getAuthCookie } from "./background-scripts/authBackground";
import notificationLink from "./background-scripts/notificationsBackground";

getAuthCookie((cookie) => {
	console.log("Auth cookie:", cookie);
});
screenshotBackground();
notificationLink();
