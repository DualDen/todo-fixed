import {ITodo} from 'utils/constants/types';

// Local Storage
export const setLocalStorage = (key: string, value: ITodo[]) => {
  const toJSON = JSON.stringify(value);
  return localStorage.setItem(key, toJSON);
};

export const getLocalStorage = (key: string): ITodo[] | null => {
  const dataset = localStorage.getItem(key);
  if (dataset) {
    return JSON.parse(dataset);
  }
  return null;
};
