const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, col) { // ячейки
  return `
    <div class="cell" contenteditable data-col="${col}">
    </div>
  `;
}

function toColumn(col, index) { // создаем колонку
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col" ></div>
    </div>
  `;
}

function createRow(index, content='') { // создаем строчку
  const resize = index ?
   '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1; // количество столбцов
  const rows =[];
  const cols = new Array(colsCount)
      .fill('') // заполняем массив
      .map(toChar) // заполняем буквами
      .map(toColumn) // обработка под шаблон
      .join(''); // приводим массив к строке.
  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount) // массив ячеек
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}