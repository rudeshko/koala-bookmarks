import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import Checkbox from "./Checkbox";

const SettingsPopup = ({ settings, onClose, onSettingsChange }) => {
  /**
   * Define Variables
   */
  const labels = {
    dragEnabled: "Drag to Reorder Bookmarks",
    hotKeysEnabled: "Hot Keys",
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
      Coming Soon...
      <h1>Visual</h1>
      Coming Soon...
      <h1>Layout</h1>
      Coming Soon...
      <h1>Visual</h1>
      Coming Soon...
      <h1>Layout</h1>
      Coming Soon...
      <h1>Visual</h1>
      Coming Soon...
      <h1>Layout</h1>
      Coming Soon...
      <h1>Visual</h1>
      Coming Soon...
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
