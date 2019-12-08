/* global chrome */

export const getStoredBookmarks = () => {
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  } else {
    chrome.storage.sync.get("bookmarks", function(obj) {
      console.log("Got local storage bookmarks:", obj.bookmarks);
      return obj.bookmarks;
    });
  }
};

export default {};
