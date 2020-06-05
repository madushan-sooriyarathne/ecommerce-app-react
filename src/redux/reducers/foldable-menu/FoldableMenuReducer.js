const INITIAL_STATE = {
  foldableMenuOpen: false,
};

const FoldableMenuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_FOLDABLE_MENU":
      return { foldableMenuOpen: !state.foldableMenuOpen };
    case "OPEN_FOLDABLE_MENU":
      return { foldableMenuOpen: true };
    case "CLOSE_FOLDABLE_MENU":
      return { foldableMenuOpen: false };
    default:
      return state;
  }
};

export default FoldableMenuReducer;
