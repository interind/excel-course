import { storage } from '../core/utils';

function toHtml(key) {
  const { title, dateOpenPage } = storage(key);
  const id = key.split(':')[1];
  const date = new Date(dateOpenPage);

  return (`
    <li class="db__record">
      <a href="#excel/${id}">${title}</a>
      <strong>
      ${date.toLocaleDateString()}
      ${date.toLocaleTimeString()}
      </strong>
    </li>
  `);
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return (`
      <li class="db__record">
        Список пустой
      </li>
    `);
  }
  return (`
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${ keys.map(toHtml).join('') }
    </ul>
  `);
}

