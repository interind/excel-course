import { $ } from '../../core/Dom';
import { Emitter } from '../../core/Emitter';

export class Excel { // главный класс формирует все компоненты.
  constructor(selector, options) {
    this.$el = $(selector), // теперь это наследник Dom.
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
  }

  getRoot() { // сборка разметки для рендер
    const $root = $.create('div', 'excel');
    const componentOptions = { emitter: this.emitter, store: this.store };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
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

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
