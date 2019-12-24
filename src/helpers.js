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

export const listenToKeys = enabled => {
  if (enabled) {
    document.onkeypress = e => {
      e = e || window.event;
      const key = parseInt(String.fromCharCode(e.keyCode));

      if (key >= 1 && key <= 9) {
        const clickableElement = document.getElementById("link_" + key);
        if (clickableElement) {
          clickableElement.click();
        }
      }
    };
  } else {
    document.onkeypress = () => {};
  }
};

export const migrationChecker = async ({ bookmarks, settings }) => {
  /**
   * @migration v0.*.* --> v1.0.0:
   * - Change { name: "", url: "" } --> undefined
   * - Change bookmarks.bookmarks --> bookmarks
   * - Check if version is in storage, if not create it to track for future migrations
   * - Adding `settings` storage item
   * - Add popup with version changes, Suggest setting a shortcut for the extension (Ctrl+1)
   */
  const bookmarkArrayLength = 100;
  let processedBookmarks,
    processedSettings,
    isNewUser = false,
    isNewVersion = false;

  /**
   * Settings
   */
  if (processedSettings && processedSettings.version !== Settings.version) {
    /**
     * Existing User
     */
    isNewVersion = true;
  } else if (processedBookmarks && processedBookmarks.bookmarks) {
    /**
     * Legacy User
     * - Change { name: "", url: "" } --> null
     * - Change bookmarks.bookmarks --> bookmarks
     */
    isNewVersion = true;
    processedBookmarks = bookmarks.bookmarks.map(bookmark => {
      if (bookmark.name === "" || bookmark.url === "") {
        return null;
      }

      return bookmark;
    });
    processedBookmarks.length = bookmarkArrayLength;
  } else {
    /**
     * New User
     */
    isNewUser = true;
    processedBookmarks = new Array(bookmarkArrayLength);
    processedSettings = Settings;
  }

  if (isNewUser || isNewVersion) {
    await saveStoredBookmarks(processedBookmarks);
    await saveStoredSettings(processedSettings);
  }

  listenToKeys(processedSettings);

  return { processedBookmarks, processedSettings };
};

/**
 * Storage definitions
 */
export const Settings = {
  version: "1.0.0",
  dragEnabled: true,
  hotKeysEnabled: true,
  hotKeyLabelsEnabled: true,
  bookmarkLabelFontSize: 15,
  bookmarkBorderRadius: 10,
  layou: { x: 4, y: 4 },
  backgroundImageName: "default.png"
};

export default {};
