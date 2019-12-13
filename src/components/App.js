import React, { useState, useEffect } from "react";
import { getStoredBookmarks, deleteStoredBookmark } from "../chromeHelper";
import { emptyBookmark } from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faCog,
  faMinus,
  faPlus,
  faArrowsAlt,
  faLock,
  faUnlock,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import AddBookmarkPopup from "./AddBookmarkPopup";
import EditBookmarkPopup from "./EditBookmarkPopup";
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
  const [upgradeToProEnabled] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentLayout] = useState(layout.LAYOUT_4x4);
  const [addBookmarkAtIndex, setAddBookmarkAtIndex] = useState(null);
  const [editBookmarkAtIndex, setEditBookmarkAtIndex] = useState(null);

  /**
   * Methods
   */
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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
      // setEditName(bookmarks[index].name);
      // setEditUrl(bookmarks[index].url);
      openEditBookmarkPopup(event, index);
    } else {
      return true;
    }
  };

  /**
   * On mount effect
   */
  useEffect(() => {
    const getBookmarks = async () => {
      const stored_bookmarks = await getStoredBookmarks();

      if (!stored_bookmarks || stored_bookmarks.length === 0) {
        // TODO: Separate this into a "starter" function and enable a few links by default for the users
        console.log("No bookmarks found, setting empty bookmarks...");
        console.log("Layout:", currentLayout.x, "x", currentLayout.y);

        const emptyList = [];
        for (var i = 0; i < currentLayout.x * currentLayout.y; i++) {
          emptyList.push(emptyBookmark);
        }

        setBookmarks(emptyList);
      } else {
        setBookmarks(stored_bookmarks);
      }
    };

    getBookmarks();
  }, [lastUpdated, currentLayout.x, currentLayout.y]);

  /**
   * Output the component
   */
  return (
    <div className="container">
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
      <EditBookmarkPopup
        index={editBookmarkAtIndex}
        onEdit={updatedBookmarks => {
          setBookmarks(updatedBookmarks);
          setEditBookmarkAtIndex(null);
        }}
        onClose={() => {
          setEditBookmarkAtIndex(null);
        }}
      ></EditBookmarkPopup>
      <div className="controls">
        <button
          onClick={toggleEditMode}
          title={`Turn ${editMode ? "off" : "on"} Edit Mode`}
        >
          <FontAwesomeIcon icon={editMode ? faUnlock : faLock} />
          Edit Mode
        </button>
        <button onClick={() => {}} title="Open Settings">
          <FontAwesomeIcon icon={faCog} />
          Settings
        </button>
        {upgradeToProEnabled && (
          <button onClick={() => {}} title="Upgrade to Pro">
            <FontAwesomeIcon icon={faStar} />
            Upgrade to Pro
          </button>
        )}
      </div>
      <div className={`bookmarks${editMode ? " editMode" : ""}`}>
        {bookmarks.map((value, index) => (
          <div className="bookmark" key={index}>
            {value.name && value.url ? (
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
