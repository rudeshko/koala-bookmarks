import React, { useState } from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addStoredBookmark } from "../helpers";

const AddBookmarkPopup = props => {
  /**
   * Define Hooks
   */
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  /**
   * Methods
   */
  const addNewBookmark = async event => {
    event.preventDefault();
    event.stopPropagation();

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
    <Popup className="addBookmark" title="Add New Bookmark" onClose={props.onClose}>
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

AddBookmarkPopup.defaultProps = {};

AddBookmarkPopup.propTypes = {
  index: PropTypes.number.isRequired,
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddBookmarkPopup;
