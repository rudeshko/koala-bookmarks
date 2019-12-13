import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import "../sass/Popup.scss";

const defaultProps = { visible: false, onClose: () => {} };

const SettingsPopup = props => {
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
    <Popup
      visible={data.visible}
      wide={true}
      title="Settings"
      index={data.index}
      onClose={data.onClose}
    >
      Settings Popup Content...
    </Popup>
  );
};

export default SettingsPopup;
