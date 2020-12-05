import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '../../core/dom.js';
export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20); // возвращает разметку для Table
  }

  // onClick() {
  //   console.log('click');
  // }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords(); // получаем координаты родителя.
      const idCol = $parent.data.col;
      const cells = this.$root.findAll(`[data-col="${idCol}"]`);
      const type = $resizer.data.resize;
      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = Math
              .floor(e.pageX - coords.right);// округляем координаты
          const value = coords.width + delta;
          $parent.css({ width: value + 'px' });
          cells.forEach((el) => el.style.width = value + 'px');
        } else if (type === 'row') {
          const delta = Math
              .floor(e.pageY - coords.bottom); // округляем координаты
          const value = coords.height + delta;
          $parent.css({ height: value + 'px' });
          cells.forEach((el) => (el.style.height = value + 'px'));
        }
      };
      document.onmouseup = () => document.onmousemove = null;
    }
  }
}
