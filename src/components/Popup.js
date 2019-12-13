import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../sass/Popup.scss";

const defaultProps = {
  visible: false,
  wide: false,
  title: "",
  children: <div className="no_content">No Content</div>,
  onClose: () => {}
};

const Popup = props => {
  /**
   * Define Hooks
   */
  const [data] = useState(Object.assign(defaultProps, props));

  /**
   * Methods
   */
  // ...

  /**
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Output the component
   */
  return (
    data.visible && (
      <div className="popup">
        <div className={["window", data.wide ? "wide" : ""].join(" ")}>
          <div className="header">
            <div className="title">{data.title}</div>
            <div className="close" onClick={data.onClose}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
          </div>
          <div className="content">{data.children}</div>
        </div>
      </div>
    )
  );
};

export default Popup;
