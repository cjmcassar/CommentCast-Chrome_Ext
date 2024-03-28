// content.js
let highlightingEnabled = true;
// Function to add or remove event listeners
function toggleHighlighting(enable: boolean) {
	if (enable) {
		console.log("------->highlighting is enabled");
		document.addEventListener("mouseover", highlightElement);
		document.addEventListener("mouseout", removeHighlight);
	} else {
		document.removeEventListener("mouseover", highlightElement);
		document.removeEventListener("mouseout", removeHighlight);
		// Optionally, remove existing highlights
		if (window.hasOwnProperty("currentlyHighlighted")) {
			(window as any)["currentlyHighlighted"].style.outline = "";
			(window as any)["currentlyHighlighted"] = null;
		}
	}
}

// Function to highlight the hovered element
function highlightElement(event: MouseEvent) {
	if ((window as any).currentlyHighlighted) {
		(window as any).currentlyHighlighted.style.outline = "";
	}
	(event.target as HTMLElement).style.outline = "2px solid red";
	(window as any).currentlyHighlighted = event.target;
}

// Function to remove highlight from an element
function removeHighlight(event: MouseEvent) {
	if ((window as any).currentlyHighlighted) {
		(window as any).currentlyHighlighted.style.outline = "";
	}
}
// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.toggle) {
		highlightingEnabled = !highlightingEnabled;
		toggleHighlighting(highlightingEnabled);
	}
});

// Initialize with highlighting disabled
toggleHighlighting(highlightingEnabled);

export {};
