import { $ } from '../../core/dom.js';

export function resizeHandler($root, event) { // логика ресайза таблицы
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords(); // получаем координаты родителя.
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value;

  $resizer.css({ opacity: 1, [sideProp]: '-100vw' });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = Math.floor(e.pageX - coords.right); // округляем координаты
      value = coords.width + delta;
      $resizer.css({ right: -delta + 'px' });
    } else if (type === 'row') {
      const delta = Math.floor(e.pageY - coords.bottom); // округляем координаты
      value = coords.height + delta;
      $resizer.css({ bottom: -delta + 'px' });
    }
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === 'col') {
      $parent.css({ width: value + 'px' });
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => (el.style.width = value + 'px'));
    } else {
      $parent.css({ height: value + 'px' });
    }
    $resizer.css({ opacity: 0, bottom: 0, right: 0 });
  };
}
