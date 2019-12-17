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

const Bookmark = React.forwardRef((props, ref) => {
  /**
   * Define Hooks
   */
  const { editMode, dragEnabled, connectDragSource, connectDropTarget } = props;
  const elementRef = useRef(null);

  if (editMode && dragEnabled) {
    connectDropTarget(elementRef);
    connectDragSource(elementRef);
  }

  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current
  }));

  /**
   * Output the component
   */
  return (
    <div className="bookmark" ref={elementRef}>
      {props.bookmark !== null ? (
        <a
          href={props.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={event => props.onBookmarkClick(event, props.index)}
        >
          <div className="tab">
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
            {editMode && dragEnabled && (
              <div className="drag">
                <FontAwesomeIcon icon={faArrowsAlt} />
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
});

export default DropTarget(
  "bookmark",
  {
    hover(props, monitor, component) {
      const node = component.getNode();
      if (!component || !node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      props.onMoveBookmark(dragIndex, hoverIndex);
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

Bookmark.defaultProps = { bookmark: null };

Bookmark.propTypes = {
  bookmark: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  index: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    dragEnabled: PropTypes.bool,
    hotKeysEnabled: PropTypes.bool,
    hotKeyLabelsEnabled: PropTypes.bool
  }),
  onOpenAddPopup: PropTypes.func.isRequired,
  onDeleteBookmark: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onMoveBookmark: PropTypes.func.isRequired
};
