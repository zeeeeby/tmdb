export const localStorage = {
  save: (storeName, item = {}) => {
    window.localStorage.setItem(storeName, JSON.stringify(item));
  },
  load: (storeName) => {
    return JSON.parse(window.localStorage.getItem(storeName)) || {};
  },
  remove: (storeName) => {
    window.localStorage.removeItem(storeName);
  },
};
