const INITIAL_STATE = {
  initialized: false,
};

const FirebaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_INITIALIZED":
      return { initialized: true };
    case "TOGGLE_INITIALIZED":
      return { initialized: !state.initialized };
    default:
      return state;
  }
};

export default FirebaseReducer;
