/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/integration/react';

import Router from './Router';
import configureStore from './data/configureStore';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCpBtbK5J0EbAnr8gJDUUTASC1ZQImLXxI',
      authDomain: 'referron-179908.firebaseapp.com',
      databaseURL: 'https://referron-179908.firebaseio.com',
      projectId: 'referron-179908',
      storageBucket: 'referron-179908.appspot.com',
      messagingSenderId: '616065719486'
    });
  }

  render() {
    const { store, persistor } = configureStore();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
