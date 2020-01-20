import {
  Layouts,
  saveStoredBookmarks,
  saveStoredSettings,
  listenToKeys
} from "./helpers";
import DefaultSettings from "./storage/Settings";

/**
 * @migration v0.*.* --> v1.0.0:
 * - Change { name: "", url: "" } --> undefined
 * - Change bookmarks.bookmarks --> bookmarks
 * - Check if version is in storage, if not create it to track for future migrations
 * - Adding `settings` storage item
 * - Add popup with version changes, Suggest setting a shortcut for the extension (Ctrl+1)
 */

export default async ({ bookmarks, settings }) => {
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
      settings.bookmarkBackgroundSizePx =
        DefaultSettings.bookmarkBackgroundSizePx;
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
