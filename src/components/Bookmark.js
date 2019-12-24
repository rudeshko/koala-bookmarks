import React, { useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faMinus,
  faPlus,
  faArrowsAlt
} from "@fortawesome/free-solid-svg-icons";

const Bookmark = React.forwardRef(
  (
    {
      bookmark,
      settings,
      layout,
      index,
      editMode,
      onOpenAddPopup,
      onDeleteBookmark,
      onBookmarkClick,
      connectDragSource,
      connectDropTarget
    },
    ref
  ) => {
    /**
     * Define Hooks
     */
    const elementRef = useRef(null);
    if (editMode && settings.dragEnabled) {
      connectDropTarget(elementRef);
      connectDragSource(elementRef);
    } else {
      connectDropTarget(null);
      connectDragSource(null);
    }

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));

    /**
     * Output the component
     */
    return (
      <div
        className={["bookmark"].join(" ").trim()}
        ref={elementRef}
        style={{
          width: 100 / layout.x + "%",
          height: 100 / layout.y + "%"
        }}
      >
        {bookmark ? (
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`link_${index + 1}`}
            onClick={event => onBookmarkClick(event, index)}
          >
            <div className="tab">
              {settings.hotKeysEnabled &&
                settings.hotKeyLabelsEnabled &&
                index < 9 &&
                !editMode && (
                  <div
                    className="hotkey"
                    title={`Press ${index +
                      1} on the keyboard to open the link`}
                  >
                    <div className="key">{index + 1}</div>
                  </div>
                )}
              {editMode && settings.dragEnabled && (
                <div className="drag">
                  <FontAwesomeIcon icon={faArrowsAlt} />
                </div>
              )}
              <div className="icon">
                {editMode ? (
                  <>
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
                      className="favicon"
                      alt=""
                    />
                    <FontAwesomeIcon icon={faWrench} className="editIcon" />
                    <div
                      className="delete"
                      title="Delete"
                      onClick={event => onDeleteBookmark(event, index)}
                    >
                      <div className="icon">
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
                    alt=""
                  />
                )}
              </div>
              <div className="name">{bookmark.name}</div>
            </div>
          </a>
        ) : (
          <a href={`#${index}`} onClick={event => event.preventDefault()}>
            <div className="tab add">
              <div
                className="icon"
                onClick={event => onOpenAddPopup(event, index)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className="name">Add New</div>
            </div>
          </a>
        )}
      </div>
    );
  }
);

export default DropTarget(
  "bookmark",
  {
    hover({ index, onMoveBookmark }, monitor, component) {
      const node = component.getNode();
      if (!component || !node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      onMoveBookmark(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    "bookmark",
    {
      beginDrag: ({ bookmark, index }) => ({
        bookmark,
        index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Bookmark)
);

Bookmark.defaultProps = { bookmark: null, settings: null };

Bookmark.propTypes = {
  bookmark: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  settings: PropTypes.shape({
    dragEnabled: PropTypes.bool,
    hotKeysEnabled: PropTypes.bool,
    hotKeyLabelsEnabled: PropTypes.bool
  }),
  layout: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
  index: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  onOpenAddPopup: PropTypes.func.isRequired,
  onDeleteBookmark: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onMoveBookmark: PropTypes.func.isRequired
};
