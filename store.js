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
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TICK: 
      return {
        ...state,
        lastUpdate: action.ts,
        light: !!action.light
      }
    case actionTypes.INCREMENTO:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case actionTypes.DECREMENTO:
      return {
        ...state,
        count: state.count - 1
      }
    case actionTypes.RESET:
      return {
        ...state,
        count: initialState.count
      }
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

export const startClock = () => {
  return {
    type: actionTypes.TICK,
    light: true,
    ts: Date.now()
  }
}

export const incrementCount = () => {
  return { type: actionTypes.INCREMENTO }
}

export const decrementCount = () => {
  return { type: actionTypes.DECREMENTO }
}

export const resetCount = () => {
  return { type: actionTypes.RESET }
}

export function initializeStore (initialState = {}) {
  return createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware())
  )
}