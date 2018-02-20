import { CONTACTS_FETCHED } from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACTS_FETCHED:
      console.log(action.contacts);
      return action.contacts;
    default:
      return state;
  }
};
