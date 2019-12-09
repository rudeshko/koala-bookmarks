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
  faCog,
  faTimes,
  faPlus
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
  const [bookmarks, setBookmarks] = useState([]);
  const [currentLayout] = useState(layout.LAYOUT_4x4);
  const [addBookmarkAtIndex, setAddBookmarkAtIndex] = useState(null);

  /**
   * Methods
   */
  const toggleEditMode = () => {
    setEditMode(!editMode);
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

  /**
   * On mount effect
   */
  useEffect(() => {
    const getBookmarks = async () => {
      const stored_bookmarks = await getStoredBookmarks();

      if (!stored_bookmarks || stored_bookmarks.length === 0) {
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
      {addBookmarkAtIndex !== null && (
        // TODO: Make into a component
        <div className="popup">
          <div className="window">
            <h1>Add New Bookmark</h1>
            <form onSubmit={event => event.preventDefault()}>
              <div>
                <input type="text" placeholder="Title" autoFocus />
              </div>
              <div>
                <input type="text" placeholder="URL" />
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
      )}
      <div className="controls">
        <button onClick={toggleEditMode}>
          <FontAwesomeIcon icon={faPencilAlt} />
          Edit
        </button>
        <button onClick={() => {}}>
          <FontAwesomeIcon icon={faCog} />
          Settings
        </button>
      </div>
      <div className={`bookmarks${editMode ? " editMode" : ""}`}>
        {bookmarks.map((value, index) => (
          <div className="bookmark" key={index}>
            {value.name && value.url ? (
              <a href={value.url} target="_blank" rel="noopener noreferrer">
                <div className="tab">
                  <div className="icon">
                    <img
                      src={`http://www.google.com/s2/favicons?domain=${value.url}`}
                      alt={value.name}
                    />
                    {editMode && (
                      <div
                        className="delete"
                        title="Delete"
                        onClick={event => deleteBookmark(event, index)}
                      >
                        <div className="icon">
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                      </div>
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
