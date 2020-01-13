import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import Checkbox from "./Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const SettingsPopup = ({ settings, onClose, onSettingsChange }) => {
  /**
   * Define Variables
   */
  const labels = {
    dragEnabled: "Drag to Reorder Bookmarks",
    hotKeysEnabled: "Enable Hot Keys (1-9)",
    hotKeyLabelsEnabled: "Display Hot Key Labels"
  };

  const sections = {
    enabledFeatures: ["dragEnabled", "hotKeysEnabled", "hotKeyLabelsEnabled"]
  };

  /**
   * Methods
   */
  const toggleSetting = key => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    newSettings[key] = !newSettings[key];
    onSettingsChange(newSettings);
  };

  /**
   * Output the component
   */
  return (
    <Popup className="settings" title="Settings" onClose={onClose}>
      <h1>General</h1>
      {sections.enabledFeatures.map(key => (
        <div className="setting" key={key}>
          <div className="label">{labels[key]}</div>
          <div className="control">
            <Checkbox
              value={settings[key]}
              disabled={true}
              onToggle={() => {
                toggleSetting(key);
              }}
            />
          </div>
        </div>
      ))}
      <h1>Layout</h1>
      <div className="setting">
        <div className="label">Layout</div>
        <div className="control text-only">{`${settings.layout.x}x${settings.layout.y}`}</div>
      </div>
      <div className="comingSoon">
        <FontAwesomeIcon icon={faBullhorn} />
        Many more features are Coming Soon...
      </div>
      {/* <div className="upgradeToPro">
        <FontAwesomeIcon icon={faStar} />
        Upgrade to Pro to enable all of the features
      </div> */}
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
  onSettingsChange: PropTypes.func.isRequired
};

export default SettingsPopup;
