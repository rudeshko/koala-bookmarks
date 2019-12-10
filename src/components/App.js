import React, { useState, useEffect } from "react";
import {
  getStoredBookmarks,
  deleteStoredBookmark,
  addStoredBookmark,
  updateStoredBookmark
} from "../chromeHelper";
import { emptyBookmark } from "../variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTimesCircle,
  faCog,
  faMinus,
  faPlus,
  faArrowsAlt,
  faLock,
  faLockOpen
} from "@fortawesome/free-solid-svg-icons";
import "../sass/App.scss";

const App = () => {
  /**
   * Layout Types
   */
  const layout = {
    LAYOUT_4x4: {
      x: 4,
      y: 4
    }
  };

  /**
   * Define Hooks
   */
  const [lastUpdated] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  const [dragEnabled] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentLayout] = useState(layout.LAYOUT_4x4);
  const [addBookmarkAtIndex, setAddBookmarkAtIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  /**
   * Methods
   */
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
    // setEditBookmarkAtIndex(index);
  };

  const handleBookmarkClick = async (event, index) => {
    if (editMode) {
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
      {addBookmarkAtIndex !== null && (
        // TODO: Make into a component
        <div className="popup">
          <div className="window">
            <div className="header">
              <div className="title">Add New Bookmark</div>
              <div
                className="close"
                onClick={() => {
                  setAddBookmarkAtIndex(null);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
            </div>
            <div className="content">
              <form onSubmit={event => addNewBookmark(event)}>
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={e => setNewName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="URL"
                    required
                    onChange={e => setNewUrl(e.target.value)}
                  />
                </div>
                <div>
                  <button>
                    <FontAwesomeIcon icon={faPlus} />
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="controls">
        <button onClick={toggleEditMode} title="Turn on Edit Mode">
          <FontAwesomeIcon icon={editMode ? faLockOpen : faLock} />
          Edit
        </button>
        <button onClick={() => {}} title="Open Settings">
          <FontAwesomeIcon icon={faCog} />
          Settings
        </button>
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
                  {index < 9 && !editMode && (
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
                        <FontAwesomeIcon icon={faPencilAlt} />
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
                        src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                        alt={value.name}
                      />
                    )}
                  </div>
                  <div className="name">{value.name}</div>
                </div>
              </a>
            ) : (
              <a href={`#${index}`}>
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
