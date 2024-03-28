export const highlightElements = () => {
	console.log("Button clicked! This is where your logic goes.");
	document
		.getElementById("highlightButton")
		?.addEventListener("click", function () {
			console.log("highlight button clicked !");
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				if (tabs[0]?.id) {
					chrome.scripting
						.executeScript({
							target: { tabId: tabs[0].id },
							files: ["js/content.js"],
						})
						.then(() => console.log("injected script file"));
				}
			});
		});
};
