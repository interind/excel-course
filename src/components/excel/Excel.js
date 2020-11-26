import { $ } from '../../core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector),
    this.components = options.components || [];
  }

  getRoot() { // сборка разметки для рендер
    const $root = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el);
    });
    return $root;
  }

  render() { // главный рендер
    this.$el.append(this.getRoot());
  }
}
