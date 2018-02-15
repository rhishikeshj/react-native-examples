import data from './LibraryList.json';

export default (state, action) => {
  switch (action.type) {
    case 'add_library':
      return [...state, action.library];
    default:
      return data;
  }
};
