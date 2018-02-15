export const selectLibrary = (libraryId) => {
  return {
    type: 'select_library',
    libraryId
  };
};

export const addLibrary = (title, description) => {
  return {
    type: 'add_library',
    library: {
      id: 42,
      title,
      description
    }
  };
};
