import { TodoInterface } from 'utils/constants/types';

// Local Storage
export const setLocalStorage = (key: string, value: TodoInterface[] | null) => {
  const toJSON = JSON.stringify(value);
  return localStorage.setItem(key, toJSON);
};

export const getLocalStorage = (key: string): TodoInterface[] | null => {
  const dataset = localStorage.getItem(key);
  if (typeof dataset === 'string') {
    const toJS = JSON.parse(dataset);
    return toJS;
  }
  return null;
};
