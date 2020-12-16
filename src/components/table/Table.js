import { $ } from '../../core/Dom';
import { createTable } from './table.template';
import { shouldResize, isCell, matrix } from './table.functions';
import { resizeHandler } from './table.resize';
import { ExcelComponent } from '../../core/ExcelComponent';
import { TableSelection } from './TableSelection';
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

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      // const $cell = this.$root.find
      // (`[data-id="${event.target.dataset.id}"]`); тут поиск по DOM
      const $target = $(event.target);
      if (event.shiftKey) { // выделение ячеек
        const target = $target.id(true);
        const current = this.selection.current.id(true);
        const $cells = matrix(target, current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($(event.target)); // элемент с методами DOM
      }
    }
  }
}
