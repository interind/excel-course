import { $ } from '../../core/Dom';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { ExcelComponent } from '../../core/ExcelComponent';
import { TableSelection } from './TableSelection';
import { shouldResize, isCell, matrix, nextSelector} from './table.functions';
export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
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
        this.selection.select($target); // элемент с методами DOM
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}


