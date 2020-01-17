/* global chrome */

export const getLocalJson = key => JSON.parse(localStorage.getItem(key));
export const saveLocalJson = (key, json) =>
  localStorage.setItem(key, JSON.stringify(json));

export const getChromeJson = key =>
  new Promise(resolve =>
    chrome.storage.sync.get([key], obj => {
      resolve(obj[key]);
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
  const bookmarkArrayLength = 120;
  let processedBookmarks = [],
    processedSettings = {},
    isNewUser = false,
    isNewVersion = false;

  if (!settings) {
    processedSettings = DefaultSettings;

    if (!bookmarks) {
      /**
       * New User
       */
      isNewUser = true;
      processedBookmarks = new Array(bookmarkArrayLength);
      processedBookmarks.fill(null, 0);
      processedBookmarks[0] = {
        name: "Test Website",
        url:
          "https://chrome.google.com/webstore/detail/desktop-bookmarks/dppepokpjgoaooihcnelbjhbhnggpblo"
      };

      processedSettings.stats.joinedVersion = DefaultSettings.version;
    } else {
      /**
       * Legacy User
       * Convert { name: "", url: "" } to null
       * Make array length 120, instead of 16
       */
      isNewVersion = true;
      processedBookmarks = bookmarks.map(bookmark => {
        if (bookmark.name === "" || bookmark.url === "") {
          return null;
        }

        return bookmark;
      });

      processedBookmarks.length = bookmarkArrayLength;
      processedBookmarks.fill(null, 16);

      processedSettings.layout = Layouts.x4y4;
      processedSettings.stats.joinedVersion = "<1.0.0";
    }
  } else if (settings.version !== DefaultSettings.version) {
    /**
     * Existing User, New Version
     */
    isNewVersion = true;

    processedBookmarks = bookmarks;
    processedSettings = settings;

    processedSettings.updatedFromVersion = processedSettings.version;
    processedSettings.version = DefaultSettings.version;

    // Further migration tasks for the new versions
    if (settings.version === "1.0.1") {
      settings.iconRadiusPercentage = DefaultSettings.iconRadiusPercentage;
      settings.showAddNewPlaceholder = DefaultSettings.showAddNewPlaceholder;
      settings.stats = DefaultSettings.stats;
      settings.stats.joinedVersion = settings.joinedVersion;
      delete settings.joinedVersion;
      delete settings.bookmarkBorderRadiusPx;
    }
  } else {
    /**
     * Existing User
     */
    processedBookmarks = bookmarks;
    processedSettings = settings;
  }

  if (isNewUser || isNewVersion) {
    await saveStoredBookmarks(processedBookmarks);
    await saveStoredSettings(processedSettings);
  }

  listenToKeys(processedSettings);

  return { processedBookmarks, processedSettings, isNewUser, isNewVersion };
};

/**
 * Constants
 */
// TODO: Make x/y manual numbers, no need for predefined sets
export const Layouts = {
  x3y3: {
    x: 3,
    y: 3
  },
  x4y4: {
    x: 4,
    y: 4
  }
};

export const DefaultSettings = {
  version: "1.0.1",
  updatedFromVersion: null,
  dragEnabled: true,
  hotKeysEnabled: true,
  hotKeyLabelsEnabled: true,
  // New in 1.0.1
  iconRadiusPercentage: 20,
  bookmarkLabelFontSizePx: 15,
  showAddNewPlaceholder: true,
  displayLabels: true,
  stats: {
    installedOn: null,
    extensionOpenedTimes: 0,
    joinedVersion: null
  },
  // TODO:
  pageSize: {
    width: "100%",
    height: "100%"
  },
  autoHideControls: false,
  faviconBackground: "#ffffff",
  layout: Layouts.x3y3,
  background: {
    value: "default.png",
    type: "image"
  }
};

export default {};
