import { useState } from "react";

const useInputState = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, updateValue, reset];
};

export default useInputState;
