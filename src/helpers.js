/* global chrome */

export const getLocalJson = key => JSON.parse(localStorage.getItem(key));
export const saveLocalJson = (key, json) =>
  localStorage.setItem(key, JSON.stringify(json));

export const getChromeJson = key =>
  new Promise(resolve =>
    chrome.storage.sync.get(key, obj => {
      resolve(obj.bookmarks);
    })
  );

export const setChromeJson = (key, json) =>
  new Promise(resolve =>
    chrome.storage.sync.set({ [key]: json }, () => {
      resolve(true);
    })
  );

export const getStoredBookmarks = async () => {
  if (process.env.NODE_ENV === "development") {
    return getLocalJson("bookmarks");
  } else {
    return getChromeJson("bookmarks");
  }
};

export const getStoredSettings = async () => {
  if (process.env.NODE_ENV === "development") {
    return getLocalJson("settings");
  } else {
    return getChromeJson("settings");
  }
};

export const saveStoredBookmarks = async bookmarks => {
  if (process.env.NODE_ENV === "development") {
    saveLocalJson("bookmarks", bookmarks);
  } else {
    await setChromeJson("bookmarks", bookmarks);
  }
};

export const saveStoredSettings = async bookmarks => {
  if (process.env.NODE_ENV === "development") {
    saveLocalJson("settings", bookmarks);
  } else {
    await setChromeJson("settings", bookmarks);
  }
};

export const deleteStoredBookmark = async index => {
  const bookmarks = await getStoredBookmarks();
  bookmarks[index] = null;

  if (process.env.NODE_ENV === "development") {
    saveLocalJson("bookmarks", bookmarks);
  } else {
    await setChromeJson("bookmarks", bookmarks);
  }

  return bookmarks;
};

export const addStoredBookmark = async (index, bookmark) =>
  updateStoredBookmark(index, bookmark);

export const updateStoredBookmark = async (index, bookmark) => {
  const bookmarks = await getStoredBookmarks();
  bookmarks[index] = bookmark;

  if (process.env.NODE_ENV === "development") {
    saveLocalJson("bookmarks", bookmarks);
  } else {
    await setChromeJson("bookmarks", bookmarks);
  }

  return bookmarks;
};

export const initializeBookmarks = layout => {
  console.log("No bookmarks found, setting empty bookmarks...");
  console.log("Layout:", layout.x, "x", layout.y);

  const emptyList = [];
  for (var i = 0; i < layout.x * layout.y; i++) {
    emptyList.push(null);
  }

  return emptyList;
};

export const migrationChecker = async storageItems => {
  /**
   * @version v0.* --> v1:
   * - Empty bookmarks { name: "", url: "" } --> null
   */
  console.log(storageItems);
};

/**
 * Storage definitions
 */
export const Settings = {
  version: "1.0.0",
  dragEnabled: true,
  hotKeysEnabled: true,
  hotKeyLabelsEnabled: true,
  bookmarkLabelfontSize: 15,
  bookmarkBorderRadius: 10,
  layoutX: 4,
  layoutY: 4,
  backgroundImageName: "default.png"
};

export default {};
