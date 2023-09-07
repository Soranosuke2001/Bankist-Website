"use strict";
// This is a marketing website for the Bankist application

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

// Menu Fade Animation
// --------------------------------------------------------------------------

const nav = document.querySelector(".nav");

function handleHover(e) {
  // If the user doesnt hover over a nav link, do nothing
  if (!e.target.classList.contains("nav__link")) return;

  // Selecting the nav items
  const link = e.target;
  const siblings = link.closest(".nav").querySelectorAll(".nav__link");
  const logo = link.closest(".nav").querySelector("img");

  // Setting a faded style to all other links and logo
  siblings.forEach(el => {
    if (el !== link) el.style.opacity = this;
  });
  logo.style.opacity = this;
}

// When the user hovers over a nav link item
nav.addEventListener("mouseover", handleHover.bind(0.5));

// When the user stops hovering over a link item
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky Nav Bar
// --------------------------------------------------------------------------

const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  // Getting the first threshold entry
  const [entry] = entries;

  // Add or remove the 'stiky' class name to the nav bar
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

// Setting up the Intersection Observer API
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
// --------------------------------------------------------------------------

const allSections = document.querySelectorAll(".section");

function revealSection(entries, observer) {
  const [entry] = entries;

  // If the entry is not intersecting, do nothing
  if (!entry.isIntersecting) return;

  // Once the entry is intersecting, unhide the section and stop observing it
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

// Setting up the Intersection Observer API
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// Setting the observer for each section
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy Loading Images
// --------------------------------------------------------------------------

const imgTargets = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {
  const [entry] = entries;

  // If the image is not intersecting with the viewport, do nothing
  if (!entry.isIntersecting) return;

  // Change the image src from lazy to high quality
  entry.target.src = entry.target.dataset.src;

  // Removing the 'lazy-img' class name after the new image is loaded
  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });

  // Stop observing the target images
  observer.unobserve(entry.target);
}

// Setting up Intersection Observer API
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

// Setting up an observer for each image
imgTargets.forEach(image => imgObserver.observe(image));

// Card Carousel
// --------------------------------------------------------------------------

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length - 1;

// Translates each card to the left or right
function cardSlideHandler(skipTo = null) {
  // If the user clicks on a specific dot, then skip to the card
  if (skipTo) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${(index - skipTo) * 100}%)`)
    );

    // Setting the active dot
    activeDot(skipTo);
  } else {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
    );

    // Setting the active dot
    activeDot(currentSlide);
  }
}

// Function to handle which card to display
function nextSlide(direction) {
  // Translate each card 1 to the left
  if (direction === "right") {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    // Translate each card 1 to the right
  } else {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
  }

  // Slide the carousel
  cardSlideHandler();

  // Setting the active dot
  activeDot(currentSlide);
}

// Returns the button HTML for each dot
function dotButtonHTML(index) {
  return `<button class="dots__dot" data-slide="${index}"></button>`;
}

// Creates all the dots for the carousel
function createCarouselDots() {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML("beforeend", dotButtonHTML(index));
  });
}

// Setting which dot is active
function activeDot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach(dot => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

createCarouselDots();
cardSlideHandler();

// Right arrow button handler
btnRight.addEventListener("click", function () {
  nextSlide("right");
});

// Left arrow button handler
btnLeft.addEventListener("click", function () {
  nextSlide("left");
});

// Left and Right arrow keys to navigate the carousel
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") nextSlide("left");
  if (e.key === "ArrowRight") nextSlide("right");
});

// Dots on click event handler
dotContainer.addEventListener("click", function (e) {
  // Checking if the dot was clicked
  if (e.target.classList.contains("dots__dot")) {
    // Fetch which dot was clicked
    const { slide } = e.target.dataset;

    // Slide the carousel
    cardSlideHandler(slide);
  }
});
