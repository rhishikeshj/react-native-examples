import { EMPLOYEES_FETCHED } from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCHED:
      return action.data;
    default:
      return state;
  }
};
