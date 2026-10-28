"use strict";

/*
    Denna fil innehåller kod som:
	- Hämtar sparad varukorg från localStorage
    - Visar varukorgsinnehållet på sidan cart.html
    - Kan ta bort föremål från varukorgen
*/

// Hämta element från DOM
const cartContainer = document.querySelector("#cart-container"); // Container för varukorgen
const cartSumEl = document.querySelector("#cart-sum"); // Text med summan av varukorgen
const payButton = document.querySelector("#to-payment-button"); // "Till betalning"-knapp

// Skapa globala variabler
let shoppingCartItems = []; // Varukorgsinnehåll

// =========================== EVENTLYSSNARE ===========================

// När sidan laddats in
document.addEventListener("DOMContentLoaded", () => {
	loadShoppingCart(); // Hämta sparad varukorg från localStorage
	displayShoppingCart(); // Visa innehåll i varukorg
});

// När "Till betalning" klickas på
payButton.addEventListener("click", () => {
	alert("Denna funktion är ännu inte tillgänglig :(");
})

// =========================== FUNKTIONER ===========================

// Hämtar eventuell varukorgsinnehåll från localStorage
function loadShoppingCart() {
	// Kontrollera om varukorg finns sparad i local storage
	if (localStorage.getItem("shoppingCart") !== null) {
		// Fyll arrayen med det sparade varukorgsinnehållet
		shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCart"));
	}
}

// Visar varukorgsinnehållet på sidan
function displayShoppingCart() {
	// Rensa tidigare innehåll
	cartContainer.innerHTML = "";

	// Variabel som håller koll på summan i varukorgen
	let sum = 0;

	// Skapa element i DOM för varje föremål
	shoppingCartItems.forEach((item, index) => {
		// Skapa element
		const listItemEl = document.createElement("li");
		const textContainerEl = document.createElement("div"); // För styling
		const imageEl = document.createElement("img");
		const titleEl = document.createElement("h2");
		const priceEl = document.createElement("p");
		const removeButton = document.createElement("button");

		// Lägg till bildlänk och alt-text
		imageEl.src = item.image;
		imageEl.alt = item.alt;

		// Lägg till texter
		titleEl.textContent = item.name;
		priceEl.textContent = `${item.price} kr`;

		// Lägg till text och ikon på knapp
		removeButton.innerHTML = `<i class="fa-solid fa-trash-can"></i> Ta bort`;

		// Lägg till eventlyssnare för klick på knapp
		removeButton.addEventListener("click", () => {
			removeFromCart(index); // Ta bort föremålet från varukorgen
			displayShoppingCart(); // Ladda om varukorgen
		});

		// Lägg till klasser för styling
		textContainerEl.classList.add("text-container");
		removeButton.classList.add("button-red");

		// Lägg in texter och knapp i container
		textContainerEl.appendChild(titleEl);
		textContainerEl.appendChild(priceEl);
		textContainerEl.appendChild(removeButton);

		// Lägg in bild och text-container i <li>
		listItemEl.appendChild(imageEl);
		listItemEl.appendChild(textContainerEl);

		// Lägg in <li> i <ul> (cartContainer) så att den visas på sidan
		cartContainer.appendChild(listItemEl);

		// Lägg till föremålets pris i totalsumman
		sum += item.price;
	});

	// Kontrollera om varukorgen har något innehåll att visa
	if (shoppingCartItems.length === 0) {
		cartContainer.innerHTML = "Din varukorg är tom.";
		cartSumEl.textContent = ""; // Ta bort summa-texten
		payButton.classList.add("hide"); // Göm "Till betalning"-knapp
	} else {
		cartSumEl.textContent = `Summa: ${sum} kr`; // Visa summan
		payButton.classList.remove("hide"); // Visa "Till betalning"-knapp
	}
}

// Tar bort föremål från varukorg
function removeFromCart(itemIndex) {
	// Ta bort från array
	shoppingCartItems.splice(itemIndex, 1);
	// Uppdatera localStorage med den nya arrayen
	localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartItems));
}
