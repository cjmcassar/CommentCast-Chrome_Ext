// content.js
let highlightingEnabled: boolean;
// Function to add or remove event listeners
function toggleHighlighting(highlightingEnabled: boolean) {
	chrome.storage.local.set({ highlightingEnabled: highlightingEnabled }, () => {
		console.log(
			"Updated highlightingEnabled in storage to:",
			highlightingEnabled,
		); // Confirm storage update
	});

	if (highlightingEnabled) {
		console.log("------->highlighting is enabled");
		document.addEventListener("mouseover", highlightElement);
		document.addEventListener("mouseout", removeHighlight);
	} else {
		console.log("------->highlighting is disabled");
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
		console.log("Toggling highlightingEnabled to:", highlightingEnabled); // Log the toggled state
		toggleHighlighting(highlightingEnabled);
	}
});

chrome.storage.local.get("highlightingEnabled", function (data) {
	highlightingEnabled = data.highlightingEnabled ?? false;
	console.log("Initial highlightingEnabled from storage:", highlightingEnabled); // Log the initial state from storage
	toggleHighlighting(highlightingEnabled);
});

export {};
