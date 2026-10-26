"use strict";

/*
    Denna fil innehåller kod som:
    - Hämtar attraktioner från data/attractions.json
    - Visar attraktionerna på sidan park.html
*/

// Hämta element från DOM
const attractionsSection = document.querySelector("#attractions"); // Sektion för attraktioner

// =========================== EVENTLYSSNARE ===========================

// När sidan laddats in
document.addEventListener("DOMContentLoaded", () => {
	getAttractions(); // Hämta och visa attraktioner
});

// =========================== FUNKTIONER ===========================

// Hämtar attraktioner från JSON-fil
async function getAttractions() {
	try {
		// Hämta data med fetch
		const response = await fetch("../data/attractions.json");

		// Kontrollera att API-anropet lyckats
		if (!response.ok) {
			throw new Error("API-anropet misslyckades. Status: " + response.status);
		}

		// Omvandla JSON till JavaScript-objekt
		const data = await response.json();

		// Visa attraktionerna
		displayAttractions(data);
	} catch (error) {
		// Skriv ut felmeddelande till konsolen och på sidan
		console.error("Något gick fel: " + error);
		attractionsSection.innerHTML = "<p>Kunde inte hämta attraktioner. Försök igen senare.</p>";
	}
}

// Visar attraktionerna på sidan
function displayAttractions(data) {
	// Skapa array med attraktionerna
	const attractions = data.attractions;

	// Skapa element i DOM för varje attraktion
	attractions.forEach((attraction) => {
		// Skapa element
		const articleEl = document.createElement("article");
		const imageContainerEl = document.createElement("div"); // För styling
		const textContainerEl = document.createElement("div"); // För styling
		const imageEl = document.createElement("img");
		const titleEl = document.createElement("h3");
		const heightRequirementEl = document.createElement("p");

		// Lägg till bildlänk och alt-text
		imageEl.src = attraction.image;
		imageEl.alt = attraction.alt;

		// Skapa rubriktext
		titleEl.textContent = attraction.name;

		// Skapa längdkravstext
		if (attraction.heightRequirement === null) {
			heightRequirementEl.textContent = "Längdkrav: -";
		} else {
			heightRequirementEl.textContent = `Längdkrav: ${attraction.heightRequirement} cm`;
		}

		// Lägg till klasser för styling av containers
		imageContainerEl.classList.add("image-container");
		textContainerEl.classList.add("text-container");

		// Lägg in bild och texter i sina containers
		imageContainerEl.appendChild(imageEl);
		textContainerEl.appendChild(titleEl);
		textContainerEl.appendChild(heightRequirementEl);

		// Lägg in containers i article
		articleEl.appendChild(imageContainerEl);
		articleEl.appendChild(textContainerEl);

		// Lägg in article i attraktionssektionen så att den visas på sidan
		attractionsSection.appendChild(articleEl);
	});
}
