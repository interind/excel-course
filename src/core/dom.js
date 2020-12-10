class Dom {
  // класс для создания ДОМ элементов и добавления классов
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) :
        selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      // относится ли node к классу Dom
      node = node.$el;
    }
    if (Element.prototype.append) {
      // проверка у элемента у кого применяем append
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => (this.$el.style[key] = styles[key]));
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }
}

export function $(selector) { // возвращает наследования класса
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el); // обернули в функцию чтобы элемент получил прототип класса DOM.
};
