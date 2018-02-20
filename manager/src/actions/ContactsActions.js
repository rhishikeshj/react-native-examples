import Contacts from 'react-native-contacts';

import { CONTACTS_FETCHED } from './types';

export const fetchContacts = () => {
  return (dispatch) => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log(err);
      } else {
          console.log(contacts);
      }
      dispatch({ type: CONTACTS_FETCHED, contacts });
    });
  };
};
