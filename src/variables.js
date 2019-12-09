/* global chrome */

export const emptyBookmark = {
  name: "",
  url: ""
};

export const getLocalJson = key => JSON.parse(localStorage.getItem(key));
export const saveLocalJson = (key, json) =>
  localStorage.setItem(key, JSON.stringify(json));

export const getChromeJson = key =>
  new Promise(resolve =>
    chrome.storage.sync.get(key, obj => {
      console.log("Got Chrome Storage bookmarks:", obj.bookmarks);

      resolve(obj.bookmarks);
    })
  );

export const setChromeJson = (key, json) =>
  new Promise(resolve =>
    chrome.storage.set({ key, json }, () => {
      resolve(true);
    })
  );

export default {};
