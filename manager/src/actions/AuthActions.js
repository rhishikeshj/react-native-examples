import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as types from './types';

export const updateEmail = (text) => {
  return {
    type: types.UPDATE_EMAIL,
    email: text
  };
};

export const updatePassword = (text) => {
  return {
    type: types.UPDATE_PASSWORD,
    password: text
  };
};

const onUserLoggedIn = (dispatch, user) => {
  dispatch({
    type: types.USER_LOGGED_IN,
    user,
  });

  Actions.main();
};

const onUserLoginFailed = (dispatch) => {
  dispatch({
    type: types.USER_LOGIN_FAILED,
  });
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_LOGIN_STARTED
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => onUserLoggedIn(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => onUserLoggedIn(dispatch, user))
          .catch(() => onUserLoginFailed(dispatch));
      });
  };
};
