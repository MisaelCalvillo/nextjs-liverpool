import React from 'react';
import { initializeStore } from '../store';

const isServer = typeof window === 'undefined';

function getOrCreateStore(initialState) {
  // Siempre crea una nueva store si es servidor, 
  // de lo contrario el estado es compartido entre los requests

  if (isServer) {
    return initializeStore(initialState);
  }

  // Crea store is no está disponible en el cliente y guardalo en el objeto window
  if (!window[__NEXT_REDUX_STORE__]){
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

const App => {
  class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {

      const reduxStore = getOrCreateStore();

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }

  return AppWithRedux;
}

export default App;