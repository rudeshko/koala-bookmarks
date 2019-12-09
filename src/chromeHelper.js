import {
  emptyBookmark,
  getLocalJson,
  saveLocalJson,
  getChromeJson
} from "./variables";

export const getStoredBookmarks = async () => {
  if (process.env.NODE_ENV === "development") {
    return getLocalJson("bookmarks");
  } else {
    return getChromeJson("bookmarks");
  }
};

export const deleteStoredBookmark = async index => {
  if (process.env.NODE_ENV === "development") {
    console.log("Deleting bookmark at index", index);

    let localBookmarks = getLocalJson("bookmarks");
    localBookmarks[index] = emptyBookmark;

    saveLocalJson("bookmarks", localBookmarks);

    return localBookmarks;
  } else {
    // chrome.storage.sync.set({ bookmarks: [] }, function() {
    //   // TODO: Return promise
    // });
    // await set ...
  }
};

export const addStoredBookmark = async index => updateStoredBookmark(index);

export const updateStoredBookmark = async index => {
  console.log("Changing", index);
};

export default {};
