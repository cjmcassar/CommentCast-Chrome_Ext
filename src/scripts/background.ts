import { screenshotBackground } from "./background-scripts/screenshotBackground";
import { signIn } from "./background-scripts/authBackground";
import notificationLink from "./background-scripts/browser-utils/notificationsBackground";

signIn();

screenshotBackground();
notificationLink();
