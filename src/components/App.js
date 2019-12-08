import React, { useState, useEffect } from "react";
import { getStoredBookmarks, updateStoredBookmarks } from "./chromeHelper";
import "../sass/App.scss";

const App = () => {
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
  const [bookmarks, setBookmarks] = useState([]);
  const [currentLayout] = useState(layout.LAYOUT_4x4);

  /**
   * On mount effect
   */
  useEffect(() => {
    const stored_bookmarks = getStoredBookmarks();

    if (!stored_bookmarks || stored_bookmarks.length === 0) {
      console.log("No bookmarks found, setting empty bookmarks...");
      console.log("Layout:", currentLayout.x, "x", currentLayout.y);

      const emptyBookmark = {
        name: "",
        url: ""
      };

      const list = [];
      for (var i = 0; i < currentLayout.x * currentLayout.y; i++) {
        list.push(emptyBookmark);
      }

      setBookmarks(list);
    }
  }, [lastUpdated, currentLayout.x, currentLayout.y]);

  /**
   * Output the component
   */
  return (
    <div className="container">
      <div className="controls"></div>
      <div className="bookmarks">
        {bookmarks.map((value, index) => (
          <div className="bookmark" key={index}>
            {value.name && value.url ? (
              <div className="tab"></div>
            ) : (
              <div className="blank">
                <div className="add">+</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
