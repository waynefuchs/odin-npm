const MOBILEMENU = "#mobile-menu";
const DROPMENU = ".drop-menu";
const HAMBURGER = "#hamburger";
const HAMBURGERBTN = "#hamburger-btn";

function clearClass(classText, except = null) {
  const allClicked = Array.from(
    document.querySelectorAll(`.${classText}`)
  ).filter((element) => element !== except);
  allClicked?.forEach((clicked) => clicked.classList.remove(classText));
}

function addEventMouseEnter(li) {
  li.addEventListener("mouseenter", (event) => {
    clearClass("clicked", event.target);
    event.stopPropagation();
  });
}

function addEventMouseClick(li) {
  li.addEventListener("click", (event) => {
    const isClicked = event.target.classList.contains("clicked");
    clearClass("clicked");
    if (!isClicked) event.target.classList.add("clicked");
  });
}

function addEventResize() {
  window.addEventListener("resize", manageHamburger);
}

function dropdown(dropdowns) {
  dropdowns.forEach((li) => {
    addEventMouseEnter(li);
    addEventMouseClick(li);
  });
}

const dropdownAttach = () => {
  const elements = Array.from(document.querySelectorAll(DROPMENU));
  if (elements.length <= 0) return;

  addEventResize();
  dropdown(elements);
  manageHamburger();
};

function clearHamburger() {
  const mobileMenu = document.querySelector(MOBILEMENU);
  const hamburger = document.querySelector(HAMBURGER);
  const hamburgerBtn = document.querySelector(HAMBURGERBTN);
  hamburgerBtn.classList.remove("hidden");
  Array.from(hamburger.children).forEach((element) =>
    mobileMenu.insertBefore(element, hamburgerBtn)
  );
}

function manageHamburger() {
  let hamburgerCount = 0;
  clearHamburger();
  const hamburger = document.querySelector(HAMBURGER);
  const hamburgerBtn = document.querySelector(HAMBURGERBTN);
  const data = getGridData();
  const dropdowns = Array.from(document.querySelectorAll(DROPMENU)).filter(
    (element) => !element.contains(hamburger)
  );

  dropdowns.reverse().every((li) => {
    // console.log(li);
    const data = getGridData();
    if (data.rowCount <= 1) {
      if (hamburgerCount <= 0) hamburgerBtn.classList.add("hidden");
      return false;
    }

    // MOVE -->
    hamburger.insertBefore(li, hamburger.firstChild);
    hamburgerCount += 1;
    return true;
  });
}

function getGridData() {
  const mobileMenu = document.querySelector(MOBILEMENU);
  const gridComputedStyle = window.getComputedStyle(mobileMenu);

  return {
    rowCount: gridComputedStyle
      .getPropertyValue("grid-template-rows")
      .split(" ").length,
    columnCount: gridComputedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ").length,
    rowSizes: gridComputedStyle
      .getPropertyValue("grid-template-rows")
      .split(" ")
      .map(parseFloat),
    columnSizes: gridComputedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ")
      .map(parseFloat),
  };
}

(function () {
  "use strict";
  exports.dropdownAttach = dropdownAttach;
  exports.clearClass = clearClass;
})();
