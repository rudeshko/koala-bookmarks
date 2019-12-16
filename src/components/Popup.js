import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "../sass/Popup.scss";

const Popup = props => {
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
    <div className="popup">
      <div className={["window", props.wide ? "wide" : null].join(" ")}>
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
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Popup;
