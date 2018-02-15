import { UPDATE_EMPLOYEE, RESET_EMPLOYEE_FORM } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE:
      // action.data === {prop:name, value:Jane}
      return {
        ...state,
        // this is es6 key interpolation
        [action.data.prop]: action.data.value
      };
    case RESET_EMPLOYEE_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
};
