import React, { useEffect, useImperativeHandle, useRef } from "react";
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
  const {
    editMode,
    layout,
    settings: { dragEnabled, hotKeysEnabled, hotKeyLabelsEnabled },
    connectDragSource,
    connectDropTarget
  } = props;
  const elementRef = useRef(null);

  // TODO: Does not work dynamically
  if (editMode && dragEnabled) {
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
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Output the component
   */
  return (
    <div
      className={["bookmark", "layout_" + layout.x + "x" + layout.y]
        .join(" ")
        .trim()}
      ref={elementRef}
    >
      {props.bookmark !== null ? (
        <a
          href={props.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          id={`link_${props.index + 1}`}
          onClick={event => props.onBookmarkClick(event, props.index)}
        >
          <div className="tab">
            {hotKeysEnabled &&
              hotKeyLabelsEnabled &&
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
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${props.bookmark.url}`}
                    className="favicon"
                    alt=""
                  />
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
  layout: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
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
