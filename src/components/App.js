import React, { useState, useEffect } from "react";
import { getStoredBookmarks, deleteStoredBookmark } from "../chromeHelper";
import "../sass/App.scss";
import { emptyBookmark } from "../variables";

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

  /**
   * Methods
   */
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const deleteBookmark = async (event, index) => {
    const updatedBookmarks = deleteStoredBookmark(index);

    setBookmarks(updatedBookmarks);

    event.preventDefault();
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
      <div className="controls">
        <button onClick={toggleEditMode}>Edit</button>
        <button onClick={() => {}}>Settings</button>
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
                        <div className="icon">x</div>
                      </div>
                    )}
                  </div>
                  <div className="name">{value.name}</div>
                </div>
              </a>
            ) : (
              <a href={`#${index}`}>
                <div className="tab blank">
                  <div className="icon">+</div>
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
