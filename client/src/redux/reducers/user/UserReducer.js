const INITIAL_STATE = {
  currentUser: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { currentUser: action.payload };
    case "UPDATE_USER":
      return { currentUser: { ...state.currentUser, ...action.payload } };
    default:
      return state;
  }
};

export default UserReducer;
