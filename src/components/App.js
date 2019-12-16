import React, { useState, useEffect } from "react";
import {
  getStoredBookmarks,
  saveStoredBookmarks,
  deleteStoredBookmark
} from "../chromeHelper";
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
  const [layout] = useState({
    LAYOUT_4x4: {
      x: 4,
      y: 4
    }
  });
  const [editMode, setEditMode] = useState(false);
  const [dragEnabled] = useState(true);
  const [hotKeysEnabled] = useState(false);
  const [hotkeyLabelsEnabled] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentLayout] = useState(layout.LAYOUT_4x4);
  const [addBookmarkAtIndex, setAddBookmarkAtIndex] = useState(null);
  const [editBookmarkAtIndex, setEditBookmarkAtIndex] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  /**
   * On mount effect
   */
  useEffect(() => {
    const getBookmarks = async () => {
      const stored_bookmarks = await getStoredBookmarks();

      if (!stored_bookmarks || stored_bookmarks.length === 0) {
        // TODO: Separate this into a "starter" function and enable a few links by default for the users
        // TODO: Create a migration script to switch from empty bookmark values to null
        console.log("No bookmarks found, setting empty bookmarks...");
        console.log("Layout:", currentLayout.x, "x", currentLayout.y);

        const emptyList = [];
        for (var i = 0; i < currentLayout.x * currentLayout.y; i++) {
          emptyList.push(null);
        }

        await saveStoredBookmarks(emptyList);
        setBookmarks(emptyList);
      } else {
        setBookmarks(stored_bookmarks);
      }
    };

    getBookmarks();
  }, [currentLayout.x, currentLayout.y]);

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

    setAddBookmarkAtIndex(index);
  };

  const openEditBookmarkPopup = (event, index) => {
    event.preventDefault();

    setEditBookmarkAtIndex(index);
  };

  const onBookmarkClick = (event, index) => {
    if (editMode) {
      openEditBookmarkPopup(event, index);
    } else {
      return true;
    }
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
          onClose={() => {
            setSettingsOpen(false);
          }}
        ></SettingsPopup>
      )}
      <Controls
        editMode={editMode}
        editModeOnClick={() => setEditMode(!editMode)}
        settingsOnClick={() => setSettingsOpen(true)}
      ></Controls>
      {/* TODO: Add Bookmark component here. Pass layout */}
      <div className={["bookmarks", editMode ? "editMode" : null].join(" ")}>
        {bookmarks.map((bookmark, index) => (
          <Bookmark
            key={index}
            bookmark={bookmark}
            index={index}
            editMode={editMode}
            dragEnabled={dragEnabled}
            hotKeysEnabled={hotKeysEnabled}
            hotkeyLabelsEnabled={hotkeyLabelsEnabled}
            onOpenAddPopup={onOpenAddPopup}
            onDeleteBookmark={onDeleteBookmark}
            onBookmarkClick={onBookmarkClick}
          ></Bookmark>
        ))}
      </div>
    </div>
  );
};

export default App;
