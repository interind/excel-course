import { storage } from '../core/utils';

// NOTE: дефолтное значение
const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  currentText: '',
};

export const initialState = storage('excel-state') ?
  storage('excel-state') : defaultState;
