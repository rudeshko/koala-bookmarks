import React, { useState, useEffect } from "react";
import { getStoredBookmarks, deleteStoredBookmark } from "../chromeHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faMinus,
  faPlus,
  faArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
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
  const [lastUpdated] = useState(new Date()); // TODO: Update this?
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
      console.log(stored_bookmarks);

      if (!stored_bookmarks || stored_bookmarks.length === 0) {
        // TODO: Separate this into a "starter" function and enable a few links by default for the users
        // TODO: Create a migration script to switch from empty bookmark values to null
        console.log("No bookmarks found, setting empty bookmarks...");
        console.log("Layout:", currentLayout.x, "x", currentLayout.y);

        const emptyList = [];
        for (var i = 0; i < currentLayout.x * currentLayout.y; i++) {
          emptyList.push(null);
        }

        setBookmarks(emptyList);
      } else {
        setBookmarks(stored_bookmarks);
      }
    };

    getBookmarks();
  }, [lastUpdated, currentLayout.x, currentLayout.y]);

  /**
   * Methods
   */
  const deleteBookmark = async (event, index) => {
    event.preventDefault();
    event.stopPropagation();

    const updatedBookmarks = await deleteStoredBookmark(index);
    setBookmarks(updatedBookmarks);
  };

  const openAddBookmarkPopup = (event, index) => {
    event.preventDefault();

    setAddBookmarkAtIndex(index);
  };

  const openEditBookmarkPopup = (event, index) => {
    event.preventDefault();

    setEditBookmarkAtIndex(index);
  };

  const handleBookmarkClick = (event, index) => {
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
        {bookmarks.map((value, index) => (
          <div className="bookmark" key={index}>
            {value !== null ? (
              <a
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={event => handleBookmarkClick(event, index)}
              >
                <div className="tab">
                  {editMode && dragEnabled && (
                    <div className="drag">
                      <FontAwesomeIcon icon={faArrowsAlt} />
                    </div>
                  )}
                  {hotKeysEnabled &&
                    hotkeyLabelsEnabled &&
                    index < 9 &&
                    !editMode && (
                      <div
                        className="hotkey"
                        title={`Press ${index +
                          1} on the keyboard to open the link`}
                      >
                        <div className="key">{index + 1}</div>
                      </div>
                    )}
                  <div className="icon">
                    {editMode ? (
                      <>
                        <FontAwesomeIcon icon={faWrench} className="editIcon" />
                        <div
                          className="delete"
                          title="Delete"
                          onClick={event => deleteBookmark(event, index)}
                        >
                          <div className="icon">
                            <FontAwesomeIcon icon={faMinus} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${value.url}`}
                        alt=""
                      />
                    )}
                  </div>
                  {/* TODO: Look into what happens when the name is longer than one line */}
                  <div className="name">{value.name}</div>
                </div>
              </a>
            ) : (
              <a href={`#${index}`} onClick={event => event.preventDefault()}>
                <div className="tab add">
                  <div
                    className="icon"
                    onClick={event => openAddBookmarkPopup(event, index)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                  <div className="name">Add New</div>
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
