import { screenshotBackground } from "./background-scripts/screenshotBackground";
import { getAuthCookie } from "./background-scripts/authBackground";

getAuthCookie((cookie) => {
	console.log("Auth cookie:", cookie);
});
screenshotBackground();
