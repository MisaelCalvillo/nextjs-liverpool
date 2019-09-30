import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  lastUpdate: 0, 
  light: false,
  count: 0
};

export const actionTypes = {
  TICK: 'TICK',
  INCREMENTO: 'INCREMENTO',
  DECREMENTO: 'DECREMENTO',
  RESET: 'RESET'
}

// REDUCER
export const reducer = (state = initialState, action) {
  switch(action.type) {
    case actionTypes.TICK: 
      return {
        ...state,
        lastUpdate: action.ts,
        light: !!action.light
      }
    case actionTypes.INCREMENTO:
    case actionTypes.DECREMENTO:
    case actionTypes.RESET:
    default: return state;
  }
}

// ACTION CREATORS
export const serverRenderClock = () => {
  return { 
    type: actionTypes.TICK, 
    light: false, 
    ts: Date.now() 
  };
}

export function initializeStore (initialState = {}) {
  return createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware())
  )
}