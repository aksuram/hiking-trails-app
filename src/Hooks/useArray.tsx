import { useState } from "react";

const useArray = <T,>() => {
  const [array, setArray] = useState<T[]>([]);

  const addToArray = (index: number, element: T) => {
    setArray((array) => [
      ...array.slice(0, index),
      element,
      ...array.slice(index, array.length),
    ]);
  };

  const removeFromArray = (index: number) => {
    setArray((array) => [
      ...array.slice(0, index),
      ...array.slice(index + 1, array.length),
    ]);
  };

  const editInArray = (index: number, element: T) => {
    setArray((array) => [
      ...array.slice(0, index),
      element,
      ...array.slice(index + 1, array.length),
    ]);
  };

  const pushToArray = (element: T) => {
    setArray((array) => [...array, element]);
  };

  const clearArray = () => {
    setArray([]);
  };

  const mapArray = (mapFn: (value: T, index: number, array: T[]) => T) => {
    setArray((array) => [...array.map(mapFn)]);
  };

  return {
    array,
    pushToArray,
    addToArray,
    editInArray,
    removeFromArray,
    clearArray,
    mapArray,
    setArray,
  };
};

export default useArray;
