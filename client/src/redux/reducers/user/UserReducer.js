const INITIAL_STATE = {
  currentUser: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { currentUser: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
