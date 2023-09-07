"use strict";

// Modal window
// --------------------------------------------------------------------------

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Function to open the modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Function to hide the modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Open modal button
btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

// Close modal on button click, overlay click or ESC key
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Cookie Message
// --------------------------------------------------------------------------

const header = document.querySelector(".header");
const message = document.createElement("div");

message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

// Removing the cookie message on button click
const closeCookieBtn = document.querySelector(".btn--close-cookie");
closeCookieBtn.addEventListener("click", () => {
  message.parentElement.removeChild(message);
});

// Styles for the cookie message
message.style.backgroundColor = "#37383d";
message.style.width = "100%";

// Adding more height to the cookie message
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// Scrolling Feature
// --------------------------------------------------------------------------

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// "Learn More" button click handler
btnScrollTo.addEventListener("click", e => {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Event Delegation (Nav Links Smooth Scrolling)
// --------------------------------------------------------------------------

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed Components
// --------------------------------------------------------------------------

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  // Fetching the button element on click
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  // If the user didnt click on a button, then dont do anything
  if (!clicked) return;

  // Remove the currently active tab -> switch the button styling and text content
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(tab =>
    tab.classList.remove("operations__content--active")
  );

  // Add the clicked button as the currently active tab
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
