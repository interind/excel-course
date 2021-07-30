import { storage } from '../core/utils';
import { defaultStyles } from '../utils/constants';

// NOTE: дефолтное значение
const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

export const initialState = storage('excel-state') ?
  storage('excel-state') : defaultState;
