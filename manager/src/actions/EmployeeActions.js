import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import * as types from './types';
import data from '../data/EmployeeList.json';

export const updateEmployee = ({ prop, value }) => {
  return {
    type: types.UPDATE_EMPLOYEE,
    data: { prop, value }
  };
};

export const addEmployee = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: types.RESET_EMPLOYEE_FORM });
        Actions.pop();
      });
  };
};

export const fetchEmployees = () => {
  return {
    type: types.EMPLOYEES_FETCHED,
    data: data.users.user_id_1.employees
  };
};


export const updateEmployeeData = ({ name, phone, shift, id }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: types.RESET_EMPLOYEE_FORM });
        Actions.pop();
      });
  };
};

export const deleteEmployee = ({ id }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`)
      .remove()
      .then(() => {
        dispatch({ type: types.RESET_EMPLOYEE_FORM });
        Actions.pop();
      });
  };
};
