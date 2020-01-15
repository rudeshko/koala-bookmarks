import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateStoredBookmark } from "../helpers";

const EditBookmarkPopup = props => {
  /**
   * Define Hooks
   */
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

  /**
   * On mount effect
   */
  useEffect(() => {
    if (props.bookmarks.length > 0 && props.bookmarks[props.index]) {
      const currentBookmark = props.bookmarks[props.index];
      setEditName(currentBookmark.name);
      setEditUrl(currentBookmark.url);
    }
  }, [props.bookmarks, props.index]);

  /**
   * Methods
   */
  const editBookmark = async event => {
    event.preventDefault();
    event.stopPropagation();

    let processedUrl = editUrl;
    if (editUrl.indexOf("https://") !== 0 && editUrl.indexOf("http://") !== 0) {
      processedUrl = "https://" + editUrl;
      setEditUrl(processedUrl);
    }

    const updatedBookmarks = await updateStoredBookmark(props.index, {
      name: editName,
      url: processedUrl
    });

    props.onEdit(updatedBookmarks);
  };

  /**
   * Output the component
   */
  return (
    <Popup
      className="editBookmark"
      visible={props.index !== null}
      title="Edit Bookmark"
      index={props.index}
      onClose={props.onClose}
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
            type="text"
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

EditBookmarkPopup.defaultProps = {};

EditBookmarkPopup.propTypes = {
  index: PropTypes.number.isRequired,
  bookmarks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditBookmarkPopup;
