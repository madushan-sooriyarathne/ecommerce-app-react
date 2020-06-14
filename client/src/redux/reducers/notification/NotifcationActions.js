const showNotification = (notification) => {
  return { type: "SET_NOTIFICATION", payload: notification };
};

const removeNotification = () => {
  return { type: "REMOVE_NOTIFICATION" };
};

const addItem = (item) => {
  showNotification(item);
  setTimeout(removeNotification(), 3000);
};

export { showNotification, removeNotification, addItem };
