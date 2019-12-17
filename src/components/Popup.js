import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "../sass/Popup.scss";

const Popup = props => {
  /**
   * Destructure the props
   */
  const { className } = props;

  /**
   * Output the component
   */
  return (
    <div className={["popup", className ? className : ""].join(" ").trim()}>
      <div className={["window", props.wide ? "wide" : null].join(" ").trim()}>
        <div className="header">
          <div className="title">{props.title}</div>
          <div className="close" onClick={props.onClose}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

Popup.defaultProps = {
  visible: true,
  wide: false
};

Popup.propTypes = {
  visible: PropTypes.bool,
  wide: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Popup;
