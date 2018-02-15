export default (state = null, action) => {
  switch (action.type) {
    case 'select_library':
      if (action.libraryId === state) {
        return null;
      }
      return action.libraryId;
    default:
      return state;
  }
};
