"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Displaying a cookie message
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
headerElClass.append(message);

// Removing the cookie message on button click
const closeCookieBtn = document.querySelector(".btn--close-cookie");
closeCookieBtn.addEventListener("click", () => {
  message.parentElement.removeChild(message);
});

// Styles for the cookie message
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// Adding more height to the cookie message
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";