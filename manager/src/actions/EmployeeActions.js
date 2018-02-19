import { Actions } from 'react-native-router-flux';

import * as types from './types';
import realm from '../data/RealmDB';

const uuidv4 = require('uuid/v4');

export const updateEmployee = ({ prop, value }) => {
  return {
    type: types.UPDATE_EMPLOYEE,
    data: { prop, value }
  };
};

export const addEmployee = ({ name, phone, shift }) => {
  return (dispatch) => {
    realm.write(() => {
      realm.create('Employee', {
        id: uuidv4(),
        name,
        phone,
        shift
      });
      dispatch({ type: types.RESET_EMPLOYEE_FORM });
      Actions.pop();
    });
  };
};

export const fetchEmployees = () => {
  const employees = realm.objects('Employee');

  return {
    type: types.EMPLOYEES_FETCHED,
    data: employees
  };
};


export const updateEmployeeData = ({ name, phone, shift, id }) => {
  return (dispatch) => {
    realm.write(() => {
      const employee = realm.objects('Employee').filtered('id = $0', id)[0];
      employee.name = name;
      employee.phone = phone;
      employee.shift = shift;
    });
    dispatch({ type: types.RESET_EMPLOYEE_FORM });
    Actions.pop();
  };
};

export const deleteEmployee = ({ id }) => {
  return (dispatch) => {
    realm.write(() => {
      const employee = realm.objects('Employee').filtered('id = $0', id)[0];
      realm.delete(employee);
    });
    dispatch({ type: types.RESET_EMPLOYEE_FORM });
    Actions.pop();
  };
};
