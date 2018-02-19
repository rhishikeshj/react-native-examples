import {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_LOGIN_FAILED,
  USER_LOGIN_STARTED,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email,
        error: ''
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.password,
        error: ''
      };
    case USER_LOGGED_IN:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.user
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        error: 'Authentication Failed!',
        password: '',
        loading: false
      };
    case USER_LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        error: ''
      };
    default:
      return state;
  }
};
