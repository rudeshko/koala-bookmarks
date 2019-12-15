import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateStoredBookmark } from "../chromeHelper";
import Popup from "./Popup";
import "../sass/Popup.scss";

const EditBookmarkPopup = props => {
  /**
   * Default Props
   */
  const defaultProps = {
    index: null,
    bookmarks: [],
    onEdit: () => {},
    onClose: () => {}
  };

  /**
   * Define Hooks
   */
  const [data] = useState(Object.assign(defaultProps, props));
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

  /**
   * On mount effect
   */
  useEffect(() => {
    if (data.bookmarks.length > 0 && data.bookmarks[data.index]) {
      const currentBookmark = data.bookmarks[data.index];
      setEditName(currentBookmark.name);
      setEditUrl(currentBookmark.url);
    }
  }, [data.bookmarks, data.index]);

  /**
   * Methods
   */
  const editBookmark = async event => {
    event.preventDefault();

    const updatedBookmarks = await updateStoredBookmark(data.index, {
      name: editName,
      url: editUrl
    });

    data.onEdit(updatedBookmarks);
  };

  /**
   * Output the component
   */
  return (
    <Popup
      visible={data.index !== null}
      title="Edit Bookmark"
      index={data.index}
      onClose={data.onClose}
    >
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
            <FontAwesomeIcon icon={faCheck} />
            Save
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default EditBookmarkPopup;
