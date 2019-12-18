import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "../sass/Popup.scss";

const Popup = ({ wide, title, children, onClose, className }) => {
  /**
   * Output the component
   */
  return (
    <div
      className={["component popup", className ? className : ""]
        .join(" ")
        .trim()}
    >
      <div className={["window", wide ? "wide" : null].join(" ").trim()}>
        <div className="header">
          <div className="title">{title}</div>
          <div className="close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

Popup.defaultProps = {
  wide: false
};

Popup.propTypes = {
  wide: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Popup;
