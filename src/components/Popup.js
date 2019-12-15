import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "../sass/Popup.scss";

const Popup = props => {
  /**
   * Default Props
   */
  const defaultProps = {
    visible: true,
    wide: false,
    title: "Title",
    children: <div className="no_content">No Content</div>,
    onClose: () => {}
  };

  /**
   * Define Hooks
   */
  // ...

  /**
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Methods
   */
  // ...

  /**
   * Output the component
   */
  return (
    props && (
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
    )
  );
};

export default Popup;
