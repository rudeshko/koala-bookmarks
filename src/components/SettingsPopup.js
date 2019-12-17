import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const SettingsPopup = props => {
  /**
   * Define Variables
   */
  const labels = {
    dragEnabled: "Dragging Bookmarks",
    hotKeysEnabled: "Hot Keys",
    hotKeyLabelsEnabled: "Hot Key Labels"
  };

  /**
   * Methods
   */
  const toggleSetting = key => {
    console.log("Toggling", key);
  };

  /**
   * Destructure the props
   */
  const { settings, onClose, onSettingChange } = props;

  /**
   * Output the component
   */
  return (
    <Popup wide={true} className="settings" title="Settings" onClose={onClose}>
      {Object.keys(settings).map(key => (
        <div className="setting" key={key}>
          <div className="label">{labels[key]}</div>
          <div className="control">
            <FontAwesomeIcon
              icon={settings[key] ? faCheckCircle : faCircle}
              onClick={() => toggleSetting(key)}
            />
          </div>
        </div>
      ))}
      {/* <FontAwesomeIcon icon={faCheckCircle} /> */}
    </Popup>
  );
};

SettingsPopup.defaultProps = {};

SettingsPopup.propTypes = {
  settings: PropTypes.shape({
    dragEnabled: PropTypes.bool,
    hotKeysEnabled: PropTypes.bool,
    hotKeyLabelsEnabled: PropTypes.bool
  }),
  onClose: PropTypes.func.isRequired,
  onSettingChange: PropTypes.func.isRequired
};

export default SettingsPopup;
