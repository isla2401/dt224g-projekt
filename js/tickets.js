"use strict";

/*
    Denna fil innehåller kod som:
    - Hämtar biljetter från data/tickets.json
    - Visar biljetterna på sidan tickets.html
	- Hämtar sparad varukorg från localStorage
	- Sparar biljetter till varukorgen i localStorage
	- Animerar "köp nu"-knappen på sidan tickets.html
*/

// Hämta element från DOM
const ticketsContainer = document.querySelector("#tickets-container"); // Container för biljetter

// Skapa globala variabler
let shoppingCartItems = []; // Varukorgsinnehåll

// =========================== EVENTLYSSNARE ===========================

// När sidan laddats in
document.addEventListener("DOMContentLoaded", () => {
	getTickets(); // Hämta och visa biljetter
	loadShoppingCart(); // Hämta sparad varukorg från localStorage
});

// =========================== FUNKTIONER ===========================

// Hämtar biljetter från JSON-fil
async function getTickets() {
	try {
		// Hämta data med fetch
		const response = await fetch("data/tickets.json");

		// Kontrollera att API-anropet lyckats
		if (!response.ok) {
			throw new Error("API-anropet misslyckades. Status: " + response.status);
		}

		// Omvandla JSON till JavaScript-objekt
		const data = await response.json();

		// Visa attraktionerna
		displayTickets(data);
	} catch (error) {
		// Skriv ut felmeddelande till konsolen och på sidan
		console.error("Något gick fel: " + error);
		ticketsContainer.innerHTML = "<p>Kunde inte hämta biljetter. Försök igen senare.</p>";
	}
}

// Visar biljetterna på sidan
function displayTickets(data) {
	// Skapa array med biljetter
	const tickets = data.tickets;

	// Skapa element i DOM för varje biljett
	tickets.forEach((ticket) => {
		// Skapa element
		const articleEl = document.createElement("article");
		const imageEl = document.createElement("img");
		const titleEl = document.createElement("h3");
		const descriptionEl = document.createElement("p");
		const priceEl = document.createElement("p");
		const buyButton = document.createElement("button");

		// Lägg till bildlänk och alt-text
		imageEl.src = ticket.image;
		imageEl.alt = ticket.alt;

		// Lägg till texter
		titleEl.textContent = ticket.name;
		descriptionEl.textContent = ticket.description;
		priceEl.textContent = `Pris: ${ticket.price} kr`;

		// Lägg till text på knapp
		buyButton.textContent = "Köp nu";

		// Lägg till eventlyssnare för klick på knapp
		buyButton.addEventListener("click", () => {
			saveToCart(ticket); // Spara biljett till varukorg
			animateButton(buyButton); // Animera knapp
		});

		// Lägg till klasser för styling
		priceEl.classList.add("price");
		buyButton.classList.add("button-red");

		// Lägg in bild, texter och knapp i ett article-element
		articleEl.appendChild(imageEl);
		articleEl.appendChild(titleEl);
		articleEl.appendChild(descriptionEl);
		articleEl.appendChild(priceEl);
		articleEl.appendChild(buyButton);

		// Lägg in article i tickets-container så att den visas på sidan
		ticketsContainer.appendChild(articleEl);
	});
}

// Hämtar eventuell varukorgsinnehåll från localStorage
function loadShoppingCart() {
	// Kontrollera om varukorg finns sparad i local storage
	if (localStorage.getItem("shoppingCart") !== null) {
		// Fyll arrayen med det sparade varukorgsinnehållet
		shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCart"));
	}
}

// Sparar biljett till varukorg i localStorage
function saveToCart(ticket) {
	// Lägg till biljetten i arrayen
	shoppingCartItems.push(ticket);
	// Spara arrayen i localStorage
	localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartItems)); 
}

// Byter färg och text på knappen
function animateButton(button) {
	// Gör knappen grön och ersätt texten med en bock
	button.classList.add("active");
	button.textContent = "✓";

	// Återställ knappen efter 700 ms
	setTimeout(function () {
		button.classList.remove("active");
		button.textContent = "Köp nu";
	}, 700);
}
