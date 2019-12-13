import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addStoredBookmark } from "../chromeHelper";
import Popup from "./Popup";
import "../sass/Popup.scss";

const defaultProps = {
  index: null,
  onCreate: () => {},
  onClose: () => {}
};

const AddBookmarkPopup = props => {
  /**
   * Define Hooks
   */
  const [data] = useState(Object.assign(defaultProps, props));
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  /**
   * Methods
   */
  const addNewBookmark = async event => {
    event.preventDefault();

    const updatedBookmarks = await addStoredBookmark(data.index, {
      name: newName,
      url: newUrl
    });

    data.onCreate(updatedBookmarks);
  };

  /**
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Output the component
   */
  return (
    <Popup
      visible={data.index !== null}
      title="Add New Bookmark"
      index={data.index}
      onClose={data.onClose}
    >
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
            onChange={e => setNewUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default AddBookmarkPopup;
