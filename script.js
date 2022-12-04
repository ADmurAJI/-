"use strict";

/* Модальное окно */

const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
const btnsOpenModalWindow = document.querySelectorAll(
  ".btn--show-modal-window"
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModalWindow = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModalWindow.forEach((button) =>
  button.addEventListener("click", openModalWindow)
);

btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Cookie message */

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close--cookie">Ok!</button>';

message.style.width = "100%";
message.style.height = "100px";
message.style.position = "fixed";
message.style.bottom = "0px";
message.style.zIndex = "100";

const header = document.querySelector(".header");
header.append(message);

document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function () {
    message.remove();
  });

/*****************************************************************************************************************************************************/

/* Плавное прокручивание */

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });

  // Старый способ

  //const section1Coords = section1.getBoundingClientRect();

  //window.pageXOffset, window.pageYOffset - текущее прокручивание

  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
});

/*****************************************************************************************************************************************************/

// Плавная навигация

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const href = e.target.getAttribute("href");
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  }
});

/*****************************************************************************************************************************************************/

// Вкладки

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContens = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clickedButton = e.target.closest(".operations__tab");

  if (!clickedButton) return;

  // Активная вкладка

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

  clickedButton.classList.add("operations__tab--active");

  // Активный контент
  tabContens.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add("operations__content--active");
});

/*****************************************************************************************************************************************************/

// Анимация потускнения на панели навигации

const nav = document.querySelector(".nav");

const navListHoverAnimation = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest(".nav__links")
      .querySelectorAll(".nav__link");

    const logo = linkOver.closest(".nav").querySelector("img");
    const logoText = linkOver.closest(".nav").querySelector(".nav__text");

    siblingLinks.forEach((element) => {
      if (element !== linkOver) element.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
    logoText.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  navListHoverAnimation(e, 0.3);
});

nav.addEventListener("mouseout", function (e) {
  navListHoverAnimation(e, 1);
});

//*****************************************************************************************************************************************************/

// Sticky navigation - Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;

const getStickNav = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerobserver = new IntersectionObserver(getStickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerobserver.observe(header);

/*****************************************************************************************************************************************************/

// Появление секций сайта

const allSection = document.querySelectorAll(".section");

const appearanceSection = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/*****************************************************************************************************************************************************/

// Имплементация lazy loading для изображений

const lazyImages = document.querySelectorAll("img[data-src]");

const loadImages = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  // Меняем изображение на изображение с высоким разрешением после его загрузки
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  treshold: 0.7,
});

lazyImages.forEach((image) => lazyImagesObserver.observe(image));
