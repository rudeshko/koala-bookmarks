import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faMinus,
  faPlus,
  faArrowsAlt
} from "@fortawesome/free-solid-svg-icons";

const Bookmark = props => {
  /**
   * Define Hooks
   */
  // ...

  /**
   * On mount effect
   */
  // ...

  /**
   * Methods
   */
  // ...

  /**
   * Output the component
   */
  return (
    <div className="bookmark">
      {props.bookmark !== null ? (
        <a
          href={props.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={event => props.onBookmarkClick(event, props.index)}
        >
          <div className="tab">
            {props.editMode && props.dragEnabled && (
              <div className="drag">
                <FontAwesomeIcon icon={faArrowsAlt} />
              </div>
            )}
            {props.hotKeysEnabled &&
              props.hotkeyLabelsEnabled &&
              props.index < 9 &&
              !props.editMode && (
                <div
                  className="hotkey"
                  title={`Press ${props.index +
                    1} on the keyboard to open the link`}
                >
                  <div className="key">{props.index + 1}</div>
                </div>
              )}
            <div className="icon">
              {props.editMode ? (
                <>
                  <FontAwesomeIcon icon={faWrench} className="editIcon" />
                  <div
                    className="delete"
                    title="Delete"
                    onClick={event =>
                      props.onDeleteBookmark(event, props.index)
                    }
                  >
                    <div className="icon">
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${props.bookmark.url}`}
                  alt=""
                />
              )}
            </div>
            {/* TODO: Look into what happens when the name is longer than one line */}
            <div className="name">{props.bookmark.name}</div>
          </div>
        </a>
      ) : (
        <a href={`#${props.index}`} onClick={event => event.preventDefault()}>
          <div className="tab add">
            <div
              className="icon"
              onClick={event => props.onOpenAddPopup(event, props.index)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="name">Add New</div>
          </div>
        </a>
      )}
    </div>
  );
};

Bookmark.defaultProps = { bookmark: null };

Bookmark.propTypes = {
  bookmark: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  index: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  dragEnabled: PropTypes.bool.isRequired,
  hotKeysEnabled: PropTypes.bool.isRequired,
  hotkeyLabelsEnabled: PropTypes.bool.isRequired,
  onOpenAddPopup: PropTypes.func.isRequired,
  onDeleteBookmark: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired
};

export default Bookmark;
