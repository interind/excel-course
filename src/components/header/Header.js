import { ExcelComponent } from '../../core/ExcelComponent';
import { changeTitle } from '../../redux/actions';
import { $ } from '../../core/Dom';
import { defaultTitle } from '../../utils/constants';
import { debounce } from '../../core/utils';
import { ActiveRoute } from '../../core/routes/ActiveRoute';
export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onClick(evt) {
    const $target = $(evt.target);
    if ($target.data.button === 'remove') {
      const decision = confirm('Delete board?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button">
          <i
          class="material-icons"
            data-button="remove"
          >delete</i>
        </div>

        <div class="button">
          <i
            class="material-icons"
            data-button="exit"
          >exit_to_app</i>
        </div>
      </div>`;
  }

  onInput(evt) {
    const $target = $(evt.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
