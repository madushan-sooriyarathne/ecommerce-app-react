const INITIAL_STATE = {
  notification: null,
};

const NotificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { notification: action.payload };

    case "REMOVE_NOTIFICATION":
      return { notification: null };
    default:
      return state;
  }
};

export default NotificationsReducer;
