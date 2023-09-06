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
