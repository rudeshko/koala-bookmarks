import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addStoredBookmark } from "../chromeHelper";
import Popup from "./Popup";
import "../sass/Popup.scss";

const AddBookmarkPopup = props => {
  /**
   * Default Props
   */
  const defaultProps = {
    index: null,
    onCreate: () => {},
    onClose: () => {}
  };

  /**
   * Define Hooks
   */
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  /**
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Methods
   */
  const addNewBookmark = async event => {
    event.preventDefault();

    const updatedBookmarks = await addStoredBookmark(props.index, {
      name: newName,
      url: newUrl
    });

    props.onCreate(updatedBookmarks);
  };

  /**
   * Output the component
   */
  return (
    <Popup title="Add New Bookmark" onClose={props.onClose}>
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
