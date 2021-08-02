export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}

// class CreateStore {
//   constructor(rootReducer, initialState = {}) {
//     this.listeners = [];
//     this.rootReducer = rootReducer;
//     this.initialState = initialState;
//     this.state = rootReducer({ ...initialState}, {type: '__INIT__' });
//   }

//   unsubscribe(fn) {
//     this.listeners = this.listeners.filter((l) => l !== fn);
//   }

//   subscribe(fn) {
//     this.listeners.push(fn);
//     return this.unsubscribe(fn);
//   }

//   dispatch(action) {
//     const state = this.rootReducer(this.state, action);
//     this.listeners.forEach((listener) => listener(state));
//   }

//   getState() {
//     return this.state;
//   }
// }
