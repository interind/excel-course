class DOM { // класс для создания ДОМ элементов и добавления классов
  constructor() {

  }
}

export function $() {
  return new DOM();
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return el;
};
