import { $ } from '../../core/Dom';

export class Excel { // главный класс формирует все компоненты.
  constructor(selector, options) {
    this.$el = $(selector), // теперь это наследник Dom.
    this.components = options.components || [];
  }

  getRoot() { // сборка разметки для рендер
    const $root = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() { // главный рендер все приходят сюда.
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }
}
