/* global chrome */

export const getLocalJson = key => JSON.parse(localStorage.getItem(key));
export const saveLocalJson = (key, json) =>
  localStorage.setItem(key, JSON.stringify(json));

export const getChromeJson = key =>
  new Promise(resolve =>
    chrome.storage.sync.get(key, obj => {
      console.log("Got Chrome Storage", key, obj);

      resolve(obj.bookmarks);
    })
  );

export const setChromeJson = (key, json) =>
  new Promise(resolve =>
    chrome.storage.sync.set({ [key]: json }, () => {
      resolve(true);
    })
  );

export const initializeBookmarks = layout => {
  // TODO: Create a migration script to switch from empty bookmark values to null
  console.log("No bookmarks found, setting empty bookmarks...");
  console.log("Layout:", layout.x, "x", layout.y);

  const emptyList = [];
  for (var i = 0; i < layout.x * layout.y; i++) {
    emptyList.push(null);
  }

  return emptyList;
};

export const Settings = {
  dragEnabled: true,
  hotKeysEnabled: true,
  hotKeyLabelsEnabled: true
};

export default {};
