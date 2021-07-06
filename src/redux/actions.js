import { TABLE_RESIZE, CHANGE_TEXT } from './types';

// Action create
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}
