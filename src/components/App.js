import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import AddNewBookmarkPopup from "./AddNewBookmarkPopup";
import {
  getStoredBookmarks,
  deleteStoredBookmark,
  addStoredBookmark,
  updateStoredBookmark
} from "../chromeHelper";
import { emptyBookmark } from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faWrench,
  faTimesCircle,
  faCog,
  faMinus,
  faPlus,
  faArrowsAlt,
  faLock,
  faUnlock,
  faStar
} from "@fortawesome/free-solid-svg-icons";
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
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

  /**
   * Methods
   */
  // const handleKeyUp = event => {
  //   console.log(event.keyCode);
  // };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const addNewBookmark = async event => {
    event.preventDefault();

    const newBookmarks = await addStoredBookmark(addBookmarkAtIndex, {
      name: newName,
      url: newUrl
    });

    setBookmarks(newBookmarks);
    setAddBookmarkAtIndex(null);
  };

  const editBookmark = async event => {
    event.preventDefault();

    const editBookmarks = await updateStoredBookmark(editBookmarkAtIndex, {
      name: editName,
      url: editUrl
    });

    setBookmarks(editBookmarks);
    setEditBookmarkAtIndex(null);
  };

  const deleteBookmark = async (event, index) => {
    event.preventDefault();

    const updatedBookmarks = await deleteStoredBookmark(index);
    setBookmarks(updatedBookmarks);
  };

  const openAddBookmarkPopup = (event, index) => {
    event.preventDefault();

    setAddBookmarkAtIndex(index);
  };

  const openEditBookmarkPopup = (event, index) => {
    event.preventDefault();

    console.log("TODO: Open Edit Bookmark Popup");
    setEditBookmarkAtIndex(index);
  };

  const handleBookmarkClick = async (event, index) => {
    if (editMode) {
      setEditName(bookmarks[index].name);
      setEditUrl(bookmarks[index].url);
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
        console.log("No bookmarks found, setting empty bookmarks...");
        console.log("Layout:", currentLayout.x, "x", currentLayout.y);

        // TODO: Separate this into a "starter" function and enable a few links by default for the users
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
      <AddNewBookmarkPopup index={addBookmarkAtIndex}></AddNewBookmarkPopup>
      {editBookmarkAtIndex !== null && (
        <div className="popup">
          <div className="window">
            <div className="header">
              <div className="title">Edit Bookmark</div>
              <div
                className="close"
                onClick={() => {
                  setEditBookmarkAtIndex(null);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
            </div>
            <div className="content">
              <form onSubmit={event => editBookmark(event)}>
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={e => setEditName(e.target.value)}
                    value={editName}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="URL"
                    onChange={e => setEditUrl(e.target.value)}
                    value={editUrl}
                    required
                  />
                </div>
                <div>
                  <button>
                    <FontAwesomeIcon icon={faSyncAlt} />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
          <Draggable
            handle=".drag"
            bounds="parent"
            grid={[200, 141.25]} // TODO: Make dynamic
            scale={1}
            disabled={!dragEnabled || !editMode}
            key={index}
            // onStart={this.handleStart}
            // onDrag={this.handleDrag}
            // onStop={this.handleStop}
          >
            <div className="bookmark">
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
                          <FontAwesomeIcon
                            icon={faWrench}
                            className="editIcon"
                          />
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
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default App;
