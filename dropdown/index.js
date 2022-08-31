function clearClass(classText, except=null) {
  const allClicked = Array.from(document.querySelectorAll(`.${classText}`)).filter(element => element !== except);
  allClicked?.forEach(clicked => clicked.classList.remove(classText));
}

function addEventMouseEnter(li) {
  li.addEventListener('mouseenter', (event) => {
    clearClass('clicked', event.target);
    event.stopPropagation();
  });
}

function addEventMouseClick(li) {
  li.addEventListener("click", (event) => {
    const isClicked = event.target.classList.contains('clicked');
    clearClass('clicked');
    if (!isClicked)
      event.target.classList.add('clicked');
  });
}

function dropdown(dropdowns) {
  dropdowns.forEach((li) => {
    addEventMouseEnter(li);
    addEventMouseClick(li);
  });
}

const attach = (selector) => {
  const elements = Array.from(document.querySelectorAll(selector));
  if(elements.length <= 0) return;
  dropdown(elements);
}

(function () {
  'use strict';
  exports.attach = attach;
}());