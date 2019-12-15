import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const SettingsPopup = props => {
  /**
   * Default Props
   */
  const defaultProps = { visible: false, onClose: () => {} };

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
    <Popup wide={true} title="Settings" onClose={props.onClose}>
      Settings Popup Content...
    </Popup>
  );
};

export default SettingsPopup;
