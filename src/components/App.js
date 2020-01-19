import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import {
  getStoredBookmarks,
  getStoredSettings,
  saveStoredBookmarks,
  saveStoredSettings,
  deleteStoredBookmark,
  listenToKeys,
  migrationChecker
} from "../helpers";
import AddBookmarkPopup from "./AddBookmarkPopup";
import EditBookmarkPopup from "./EditBookmarkPopup";
import NewUserPopup from "./NewUserPopup";
import NewVersionPopup from "./NewVersionPopup";
import SettingsPopup from "./SettingsPopup";
import Controls from "./Controls";
import Bookmark from "./Bookmark";

import "../sass/App.scss";

const App = () => {
  /**
   * Define Hooks
   */
  const [editMode, setEditMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [settings, setSettings] = useState({});
  const [draggingBookmarkIndex, setDraggingBookmarkIndex] = useState(null);

  const [addBookmarkAtIndex, setAddBookmarkAtIndex] = useState(null);
  const [editBookmarkAtIndex, setEditBookmarkAtIndex] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [isNewUser, setIsNewUser] = useState(false);
  const [isNewVersion, setIsNewVersion] = useState(false);

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

      if (isNewUser) openPopup("newUser", isNewUser);
      if (isNewVersion) openPopup("newVersion", isNewVersion);
    };

    getStoredItems();
  }, []);

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
    openPopup("addBookmark", index);
  };

  const onBookmarkClick = (event, index) => {
    if (editMode) {
      event.preventDefault();

      openPopup("editBookmark", index);
    } else {
      return true;
    }
  };

  const openPopup = (type, value = null) => {
    listenToKeys(false);

    switch (type) {
      case "newUser":
        setIsNewUser(true);
        break;
      case "newVersion":
        setIsNewVersion(true);
        break;
      case "addBookmark":
        setAddBookmarkAtIndex(value);
        break;
      case "editBookmark":
        setEditBookmarkAtIndex(value);
        break;
      case "settings":
        setSettingsOpen(true);
        break;
      default:
    }
  };

  const closePopup = () => {
    listenToKeys(settings.hotKeysEnabled);

    setIsNewUser(false);
    setIsNewVersion(false);
    setAddBookmarkAtIndex(null);
    setEditBookmarkAtIndex(null);
    setSettingsOpen(false);
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
  };

  /**
   * Output the component
   */
  return (
    <div className="container">
      {isNewUser && (
        <NewUserPopup
          onClose={() => {
            closePopup();
          }}
        />
      )}
      {isNewVersion && (
        <NewVersionPopup
          onClose={() => {
            closePopup();
          }}
          version={settings.version}
        />
      )}
      {addBookmarkAtIndex !== null && (
        <AddBookmarkPopup
          index={addBookmarkAtIndex}
          onCreate={updatedBookmarks => {
            setBookmarks(updatedBookmarks);
            closePopup();
          }}
          onClose={() => {
            closePopup();
          }}
        />
      )}
      {editBookmarkAtIndex !== null && (
        <EditBookmarkPopup
          index={editBookmarkAtIndex}
          bookmarks={bookmarks}
          onEdit={updatedBookmarks => {
            setBookmarks(updatedBookmarks);
            closePopup();
          }}
          onClose={() => {
            closePopup();
          }}
        />
      )}
      {settingsOpen && (
        <SettingsPopup
          settings={settings}
          onClose={() => {
            closePopup();
          }}
          onSettingsChange={onSettingsChange}
        />
      )}
      <Controls
        editMode={editMode}
        editModeOnClick={() => {
          setEditMode(!editMode);
        }}
        settingsOnClick={() => {
          openPopup("settings");
        }}
      />
      {settings.layout && (
        <div
          className={[
            "bookmarks",
            editMode ? "editMode" : "",
            settings.dragEnabled ? "dragEnabled" : "",
            draggingBookmarkIndex !== null ? "dragging" : "",
            `layout_${settings.layout.x}x${settings.layout.y}`
          ]
            .join(" ")
            .trim()}
        >
          {bookmarks
            .slice(0, settings.layout.x * settings.layout.y)
            .map((bookmark, index) => (
              <Bookmark
                key={index}
                bookmark={bookmark}
                index={index}
                editMode={editMode}
                settings={settings}
                onOpenAddPopup={onOpenAddPopup}
                onDeleteBookmark={onDeleteBookmark}
                onBookmarkClick={onBookmarkClick}
                onMoveBookmark={onMoveBookmark}
                beginDrag={index => {
                  setDraggingBookmarkIndex(index);
                }}
                endDrag={() => {
                  setDraggingBookmarkIndex(null);
                }}
                hoverDrag={index => {
                  setDraggingBookmarkIndex(index);
                }}
                className={
                  draggingBookmarkIndex !== null &&
                  draggingBookmarkIndex === index
                    ? "active"
                    : ""
                }
              ></Bookmark>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
