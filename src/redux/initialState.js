import { defaultStyles, defaultTitle } from '../utils/constants';
import { clone } from '../core/utils';

// NOTE: дефолтное значение
const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  stylesState: {},
  title: defaultTitle,
  currentText: '',
  currentStyles: defaultStyles,
  dateOpenPage: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
