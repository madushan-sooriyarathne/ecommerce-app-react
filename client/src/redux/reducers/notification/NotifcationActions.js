const showNotification = (notification) => {
  return { type: "SET_NOTIFICATION", payload: notification };
};

const removeNotification = () => {
  return { type: "REMOVE_NOTIFICATION" };
};


export { showNotification, removeNotification };
