"use strict";

/*
    Denna fil innehåller kod som:
    - Öppnar/stänger mobilmenyn
    - Öppnar/stänger undermenyer i header
*/

// Hämta element från DOM
const menu = document.querySelector("#menu"); // Mobilmeny
const menuBtn = document.querySelector("#show-menu"); // Knapp för att öppna/stänga mobilmeny
const subMenus = document.querySelectorAll(".sub-menu"); // Undermenyer
const subMenuBtns = document.querySelectorAll(".show-sub-menu"); // Knappar för att öppna/stänga undermenyer
const menuLinks = document.querySelectorAll("#menu a"); // Länkar i menyn

// =========================== EVENTLYSSNARE ===========================

// Öppna/stäng menyn när menyknappen klickas på
menuBtn.addEventListener("click", toggleMenu);

// Öppna/stäng undermeny när dess knapp klickas på
subMenuBtns.forEach((subMenuBtn, index) => {
	subMenuBtn.addEventListener("click", () => {
		toggleSubMenu(index); // Index används för att hitta rätt knapp och undermeny
	});
});

/* Stäng menyn när en länk klickas på. (Sker inte automatiskt om man 
   klickar på en länk som går till samma sida som man befinner sig på) */
menuLinks.forEach((menuLink) => {
	menuLink.addEventListener("click", () => {
		closeMenus();
	});
});

// =========================== FUNKTIONER ===========================

// Växla mellan att öppna och stänga mobilmenyn
function toggleMenu() {
	/*  Fontawesome byter ut <i> mot <svg> när sidan laddas in vilket gör det 
        lite struligt att hämta ikoner och ändra deras utseende med JS. 
        Jag lyckades lösa det med informationen under "autoReplaceSvg" på
        https://docs-v5.fontawesome.com/apis/javascript/configuration 
        och det är därför querySelector(".svg-inline--fa") samt 
        setAttribute("data-icon", "bars"/"xmark") används.
    */

	// Hämta meny-ikon
	const menuIcon = menuBtn.querySelector(".svg-inline--fa");

	// Växla mellan öppen/stängd meny
	menu.classList.toggle("open");

	// Byt ikon och aria-label beroende på om menyn är öppen eller stängd
	if (menu.classList.contains("open")) {
		menuIcon.setAttribute("data-icon", "xmark"); // Kryss
		menuBtn.ariaLabel = "Stäng meny";
	} else {
		menuIcon.setAttribute("data-icon", "bars"); // "Hamburgare"
		menuBtn.ariaLabel = "Öppna meny";
	}
}

// Växla mellan att öppna och stänga undermenyer
function toggleSubMenu(subMenuIndex) {
	// Variabler för den aktuella undermenyn och dess knapp
	const subMenu = subMenus[subMenuIndex];
	const subMenuBtn = subMenuBtns[subMenuIndex];

	// Växla mellan öppen/stängd undermeny
	subMenu.classList.toggle("open");
	subMenuBtn.classList.toggle("active"); // Roterar knappen

	// Byt aria-label beroende på om undermenyn är öppen eller stängd
	if (subMenu.classList.contains("open")) {
		subMenuBtn.ariaLabel = "Stäng undermeny";
	} else {
		subMenuBtn.ariaLabel = "Öppna undermeny";
	}
}

// Stäng alla menyer
function closeMenus() {
	// Hämta meny-ikon
	const menuIcon = menuBtn.querySelector(".svg-inline--fa");

	// Stäng huvudmeny
	menu.classList.remove("open");
	menuIcon.setAttribute("data-icon", "bars");
	menuBtn.ariaLabel = "Öppna meny";

	// Stäng alla undermenyer
	subMenus.forEach((subMenu, index) => {
		subMenu.classList.remove("open");
		subMenuBtns[index].classList.remove("active");
		subMenuBtns[index].ariaLabel = "Öppna undermeny";
	});
}
