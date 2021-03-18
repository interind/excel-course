const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 20;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) { // ячейки
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    return `
      <div class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        style="width: ${width}"
      >${data || ''}</div>
    `;
  };
}

function toColumn({ col, index, width }) { // создаем колонку
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col" ></div>
    </div>
  `;
}

function createRow(index, content='', state) { // создаем строчку
  const height = getHeight(state, index);
  const resize = index ?
   '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div
    class="row"
    data-type="resizable"
    data-row=${index}
    style="height: ${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function(col, index) {
    return {col, index, width: getWidth(state, index)};
  };
}

export function createTable(rowsCount = 15, state = {}) {
  console.log('tableTemplate', state);
  const colsCount = CODES.Z - CODES.A + 1; // количество столбцов
  const rows =[];
  const cols = new Array(colsCount)
      .fill('') // заполняем массив
      .map(toChar) // заполняем буквами
      .map(withWidthFrom(state.colState)) // обработка под шаблон
      .map(toColumn) // обработка под шаблон
      .join(''); // приводим массив к строке.
  rows.push(createRow(null, cols, {}));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount) // массив ячеек
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join('');
}
