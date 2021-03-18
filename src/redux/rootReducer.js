export function rootReducer(state, action) {
  switch (action.type) {
    case 'TABLE_RESIZE':
      return {...state, colState: {}};// TODO: id и value
    default: return state;
  }
}
