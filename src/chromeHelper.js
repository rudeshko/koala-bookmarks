import {
  emptyBookmark,
  getLocalJson,
  saveLocalJson,
  getChromeJson,
  // setChromeJson
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
    // await setChromeJson("bookmarks", ...);
  }
};

export const addStoredBookmark = async (index, bookmark) =>
  updateStoredBookmark(index, bookmark);

export const updateStoredBookmark = async (index, bookmark) => {
  console.log("Changing bookmark at index", index);

  const bookmarks = await getStoredBookmarks();
  bookmarks[index] = bookmark;

  if (process.env.NODE_ENV === "development") {
    saveLocalJson("bookmarks", bookmarks);
  } else {
    // TODO:
  }

  return bookmarks;
};

export default {};
