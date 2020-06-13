import { createSelector } from "reselect";

const getCurrentUser = (state) => state.user.currentUser;

const getCurrentUserId = createSelector([getCurrentUser], (currentUser) => {
  if (currentUser) return currentUser.uid;
});

export { getCurrentUser, getCurrentUserId };
