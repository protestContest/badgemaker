import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import reducer from './reducer';
import App from './App';


document.addEventListener("DOMContentLoaded", () => {
  disableScrollBounce();

  const rootEl = document.querySelector('#root');
  const stateStr = localStorage.getItem('state');
  const initialState = (stateStr) ? JSON.parse(stateStr) : undefined;

  const store = createStore(reducer, initialState, applyMiddleware(persistState));

  ReactDOM.render((
    <Provider store={store}>
      <App/>
    </Provider>
  ), rootEl);
});

function persistState({ getState }) {
  return next => action => {
    const returnValue = next(action);
    const state = getState();
    localStorage.setItem('state', JSON.stringify(state));
    return returnValue;
  };
};

function disableScrollBounce() {
  if (window.navigator.standalone) {
    document.body.style.position = 'fixed';
  }
}
