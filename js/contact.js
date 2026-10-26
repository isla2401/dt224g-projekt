"use strict";

/*
    Denna fil innehåller kod som:
    - Validerar kontaktformuläret
*/

// Hämta element från DOM
const form = document.querySelector("#contact-form"); // Kontaktformulär
const nameInput = document.querySelector("#name"); // Inputfält namn
const emailInput = document.querySelector("#email"); // Inputfält e-post
const messageInput = document.querySelector("#message"); // Inputfält meddelande

const nameError = document.querySelector("#name-error"); // Felmeddelande för namn
const emailError = document.querySelector("#email-error"); // Felmeddelande för e-post
const messageError = document.querySelector("#message-error"); // Felmeddelande för meddelande

const confirmationText = document.querySelector("#confirmation-text"); // Bekräftelse på att formuläret skickats

// =========================== EVENTLYSSNARE ===========================

// När formuläret skickas
form.addEventListener("submit", (event) => {
	event.preventDefault(); // Hindra sidan från att ladda om

	// Validera formulär
	if (validateForm()) {
		// Återställ formulär och skriv ut bekräftelsemeddelande om valideringen lyckas
		form.reset();
		confirmationText.textContent = "Ditt meddelande har skickats ✓";
	}
});

// =========================== FUNKTIONER ===========================

// Validerar formulär, returnerar boolean
function validateForm() {
	clearErrors(); // Rensa eventuella felmeddelanden
	confirmationText.textContent = ""; // // Rensa eventuellt bekräftelsemeddelande

	// Hämta värden från formuläret
	const name = nameInput.value.trim();
	const email = emailInput.value.trim();
	const message = messageInput.value.trim();

	// Variabel som håller koll på om valideringen är ok eller inte
	let validate = true;

	// Kontrollera att namn har angetts
	if (name === "") {
		nameError.textContent = "Du måste ange ditt fullständiga namn";
		nameInput.classList.add("error"); // Lägger till röd kant runt input-fältet
		validate = false;
	}

	// Kontrollera att e-post har angetts
	if (email === "") {
		emailError.textContent = "Du måste ange din e-postadress";
		emailInput.classList.add("error"); // Lägger till röd kant runt input-fältet
		validate = false;
	}

	// Kontrollera att meddelande har angetts
	if (message === "") {
		messageError.textContent = "Du måste ange ett meddelande";
		messageInput.classList.add("error"); // Lägger till röd kant runt input-fältet
		validate = false;
	}

	// Returnera resultatet av valideringen
	return validate;
}

// Rensar felmeddelanden
function clearErrors() {
	// Tar bort felmeddelanden
	nameError.textContent = "";
	emailError.textContent = "";
	messageError.textContent = "";

	// Tar bort röd kant runt input-fälten
	nameInput.classList.remove("error");
	emailInput.classList.remove("error");
	messageInput.classList.remove("error");
}
