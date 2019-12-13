import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { updateStoredBookmark } from "../chromeHelper";
import Popup from "./Popup";
import "../sass/Popup.scss";

const defaultProps = {
  index: null,
  onEdit: () => {},
  onClose: () => {}
};

const EditBookmarkPopup = props => {
  /**
   * Define Hooks
   */
  const [data] = useState(Object.assign(defaultProps, props));
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

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
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Output the component
   */
  return (
    <Popup
      visible={data.index !== null}
      title="Edit Bookmark"
      index={data.index}
      onClose={() => {
        console.log("edit component test");
        data.onClose();
      }}
    >
      <form onSubmit={event => editBookmark(event)}>
        <div>
          <input
            type="text"
            placeholder="Title"
            onChange={e => setEditName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="URL"
            required
            onChange={e => setEditUrl(e.target.value)}
          />
        </div>
        <div>
          <button>
            <FontAwesomeIcon icon={faSave} />
            Save
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default EditBookmarkPopup;

/*
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
        <FontAwesomeIcon icon={faSave} />
        Save
      </button>
    </div>
  </form>
</div>
*/
