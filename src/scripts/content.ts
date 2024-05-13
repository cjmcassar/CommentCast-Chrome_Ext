import { requestScreenshot } from "./content-scripts/screenshotContent";
import { handleScreenshotUpdate } from "./content-scripts/screenshotContent";

handleScreenshotUpdate();

export { requestScreenshot };
