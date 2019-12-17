import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import {
  getStoredBookmarks,
  saveStoredBookmarks,
  deleteStoredBookmark
} from "../chromeHelper";
import { initializeBookmarks } from "../variables";
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
  const [hotKeysEnabled] = useState(true);
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
        const emptyList = initializeBookmarks(currentLayout);

        await saveStoredBookmarks(emptyList);
        setBookmarks(emptyList);
      } else {
        setBookmarks(stored_bookmarks);
      }
    };

    getBookmarks();
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
    // console.log(dragIndex, hoverIndex);
    // const tmp = bookmarks[dragIndex];
    // const newBookmarks = bookmarks;
    // newBookmarks[dragIndex] = bookmarks[hoverIndex];
    // newBookmarks[hoverIndex] = tmp;

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
      <div
        className={[
          "bookmarks",
          editMode ? "editMode" : "",
          dragEnabled ? "dragEnabled" : ""
        ]
          .join(" ")
          .trim()}
      >
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
            onMoveBookmark={onMoveBookmark}
          ></Bookmark>
        ))}
      </div>
    </div>
  );
};

export default App;
