import { useState } from "react";

const useListState = (initialValue = []) => {
  const [list, setList] = useState(initialValue);

  const toggleItem = (id) => {
    const updatedList = list.map((item) => ({
      ...item,
      isActive: id === item.id,
    }));
    setList(updatedList);
  };

  return [list, toggleItem];
};

export default useListState;
