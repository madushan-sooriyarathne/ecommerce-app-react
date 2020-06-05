import { useState } from "react";

const UseToggleState = (initialVal = false) => {
  const [state, setState] = useState(initialVal);

  const toggleState = () => {
    setState(!state);
  };

  return [state, toggleState];
};

export default UseToggleState;
