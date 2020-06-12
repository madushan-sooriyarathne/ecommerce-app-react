const setCurrentUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

const updateUser = (updatedFields) => {
  return {
    type: "UPDATE_USER",
    payload: updatedFields,
  };
};

export { setCurrentUser, updateUser };
