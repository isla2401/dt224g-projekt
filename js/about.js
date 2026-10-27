"use strict";

/*
    Denna fil innehåller kod som:
    - Visar/döljer svaren till "frågor & svar"
*/

// Hämta element från DOM
const questionButtons = document.querySelectorAll(".question-button"); // Knappar som frågorna ligger i
const answerContainers = document.querySelectorAll(".answer-container"); // Containers för svaren
const arrowIcons = document.querySelectorAll(".arrow-icon-container"); // Pil-ikonen bredvid frågan

// =========================== EVENTLYSSNARE ===========================

// Visa/dölj svar när en fråga klickas på
questionButtons.forEach((button, index) => {
	button.addEventListener("click", () => {
		toggleAnswer(index);
	});
});

// =========================== FUNKTIONER ===========================

// Växlar mellan att visa och dölja svaret på frågan
function toggleAnswer(index) {
	answerContainers[index].classList.toggle("open"); // Visa/dölj svaret
	arrowIcons[index].classList.toggle("active"); // Rotera pil-ikonen

	// Byt värde på aria-expanded för att signalera om svaret visas eller ej
	if (questionButtons[index].ariaExpanded === "true") {
		questionButtons[index].ariaExpanded = "false";
	} else {
		questionButtons[index].ariaExpanded = "true";
	}
}
