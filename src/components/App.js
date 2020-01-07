import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import {
  getStoredBookmarks,
  getStoredSettings,
  saveStoredBookmarks,
  saveStoredSettings,
  deleteStoredBookmark,
  listenToKeys,
  migrationChecker,
  Layouts
} from "../helpers";
import AddBookmarkPopup from "./AddBookmarkPopup";
import EditBookmarkPopup from "./EditBookmarkPopup";
import SettingsPopup from "./SettingsPopup";
import Controls from "./Controls";
import Bookmark from "./Bookmark";

import "../sass/App.scss";

const App = () => {
  /**
   * Define Hooks
   */
  const [currentLayout] = useState(Layouts.x4y4);
  const [editMode, setEditMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [settings, setSettings] = useState({});

  const [addBookmarkAtIndex, setAddBookmarkAtIndex] = useState(null);
  const [editBookmarkAtIndex, setEditBookmarkAtIndex] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  /**
   * On mount effect
   */
  useEffect(() => {
    const getStoredItems = async () => {
      const stored_bookmarks = await getStoredBookmarks();
      const stored_settings = await getStoredSettings();

      const {
        processedBookmarks,
        processedSettings,
        isNewUser,
        isNewVersion
      } = await migrationChecker({
        bookmarks: stored_bookmarks,
        settings: stored_settings
      });

      setBookmarks(processedBookmarks);
      setSettings(processedSettings);

      if (isNewUser) {
        // TODO: Display a Welcome popup
        console.log("Displaying new user popup...");
      } else if (isNewVersion) {
        // TODO: Display version update changes
        console.log(
          "Displaying new version popup... version:",
          processedSettings.version
        );
      }
    };

    getStoredItems();
  }, [currentLayout]);

  /**
   * Methods
   */
  const onDeleteBookmark = async (event, index) => {
    event.preventDefault();
    event.stopPropagation();

    const updatedBookmarks = await deleteStoredBookmark(index);
    setBookmarks(updatedBookmarks);
  };

  const onOpenAddPopup = (event, index) => {
    event.preventDefault();

    setEditMode(false);
    setAddBookmarkAtIndex(index);
  };

  const onBookmarkClick = (event, index) => {
    if (editMode) {
      event.preventDefault();

      setEditBookmarkAtIndex(index);
    } else {
      return true;
    }
  };

  const onMoveBookmark = async (dragIndex, hoverIndex) => {
    // Swaps the two items vertically and horizontally
    // const newBookmarks = JSON.parse(JSON.stringify(bookmarks));
    // const tmp = bookmarks[dragIndex];
    // newBookmarks[dragIndex] = bookmarks[hoverIndex];
    // newBookmarks[hoverIndex] = tmp;

    // Reorders in place, instead of a swap
    const dragBookmark = bookmarks[dragIndex];
    const newBookmarks = update(bookmarks, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragBookmark]
      ]
    });

    setBookmarks(newBookmarks);
    await saveStoredBookmarks(newBookmarks);
  };

  const onSettingsChange = async newSettings => {
    setSettings(newSettings);
    await saveStoredSettings(newSettings);
    listenToKeys(newSettings.hotKeysEnabled);
  };

  /**
   * Output the component
   */
  return (
    <div className="container">
      {addBookmarkAtIndex !== null && (
        <AddBookmarkPopup
          index={addBookmarkAtIndex}
          onCreate={updatedBookmarks => {
            setBookmarks(updatedBookmarks);
            setAddBookmarkAtIndex(null);
          }}
          onClose={() => {
            setAddBookmarkAtIndex(null);
          }}
        ></AddBookmarkPopup>
      )}
      {editBookmarkAtIndex !== null && (
        <EditBookmarkPopup
          index={editBookmarkAtIndex}
          bookmarks={bookmarks}
          onEdit={updatedBookmarks => {
            setBookmarks(updatedBookmarks);
            setEditBookmarkAtIndex(null);
          }}
          onClose={() => {
            setEditBookmarkAtIndex(null);
          }}
        ></EditBookmarkPopup>
      )}
      {settingsOpen && (
        <SettingsPopup
          settings={settings}
          onClose={() => {
            setSettingsOpen(false);
          }}
          onSettingsChange={onSettingsChange}
        ></SettingsPopup>
      )}
      <Controls
        editMode={editMode}
        editModeOnClick={() => setEditMode(!editMode)}
        settingsOnClick={() => setSettingsOpen(true)}
      ></Controls>
      <div
        className={[
          "bookmarks",
          editMode ? "editMode" : "",
          settings.dragEnabled ? "dragEnabled" : "",
          `layout_${currentLayout.x}x${currentLayout.y}`
        ]
          .join(" ")
          .trim()}
      >
        {bookmarks
          .slice(0, currentLayout.x * currentLayout.y)
          .map((bookmark, index) => (
            <Bookmark
              key={index}
              bookmark={bookmark}
              layout={currentLayout}
              index={index}
              editMode={editMode}
              settings={settings}
              onOpenAddPopup={onOpenAddPopup}
              onDeleteBookmark={onDeleteBookmark}
              onBookmarkClick={onBookmarkClick}
              onMoveBookmark={onMoveBookmark}
            ></Bookmark>
          ))}
      </div>
    </div>
  );
};

export default App;
