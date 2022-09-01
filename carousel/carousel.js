const CAROUSEL = document.querySelector("#carousel");
const CAROUSEL_IMAGES = document.querySelector("#carousel-images");
const CAROUSEL_INDEX = document.querySelector("#carousel-index");
let CAROUSEL_SRC_ARRAY = [];

const clearCarousel = () => {
  CAROUSEL_SRC_ARRAY = [];
  while (CAROUSEL_IMAGES.firstChild)
    CAROUSEL_IMAGES.removeChild(CAROUSEL_IMAGES.firstChild);
  while (CAROUSEL_INDEX.firstChild)
    CAROUSEL_INDEX.removeChild(CAROUSEL_INDEX.firstChild);
};

var carouselSelectIndex= (index) => {
  if(isNaN(index)) return;
  const active = CAROUSEL.querySelectorAll('[data-active]');
  active.forEach(element => delete element.dataset.active);
  const len = CAROUSEL_SRC_ARRAY.length;
  newIndex = (index % len + len) % len;
  [...CAROUSEL_IMAGES.children][newIndex].dataset.active = true;
  [...CAROUSEL_INDEX.children][newIndex].dataset.active = true;
}

const carouselAttachLeftRightButtons = () => {
  const buttons = document.querySelectorAll(".carousel-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const len = CAROUSEL_SRC_ARRAY.length;
      const offset = button.dataset.carouselButton === "left" ? -1 : 1;
      const activeImage = CAROUSEL_IMAGES.querySelector("[data-active]");
      const activeIndex = CAROUSEL_INDEX.querySelector("[data-active]");
      let newIndex =
        [...CAROUSEL_IMAGES.children].indexOf(activeImage) + offset;
      newIndex = ((newIndex % len) + len) % len;
      CAROUSEL_IMAGES.children[newIndex].dataset.active = true;
      CAROUSEL_INDEX.children[newIndex].dataset.active = true;
      delete activeImage.dataset.active;
      delete activeIndex.dataset.active;
    });
  });
};

const carouselAttach = (images) => {
  CAROUSEL_SRC_ARRAY = images;
  CAROUSEL_SRC_ARRAY.forEach((src, index) => {
    // Create Image
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("carousel-image");
    img.alt = "Carousel Image";
    CAROUSEL_IMAGES.append(img);

    // Create Index Button
    const button = document.createElement("button");
    button.classList.add("carousel-index-button");
    button.textContent = "";
    button.addEventListener('click', () => {
      carouselSelectIndex(index);
    });
    CAROUSEL_INDEX.append(button);

    //Set first slide active
    if (index === 0) {
      first = false;
      img.dataset.active = true;
      button.dataset.active = true;
    }
  });
  carouselAttachLeftRightButtons();
};

(function () {
  "use strict";
  exports.carouselAttach = carouselAttach;
})();
