/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Router from './Router';

export default class App extends Component {
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
    return (
      <Provider
        store={createStore(reducers,
                           {},
                           applyMiddleware(ReduxThunk))}
      >
        <Router />
      </Provider>
    );
  }
}
