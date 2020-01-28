import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import Checkbox from "./Checkbox";
import InputNumber from "./InputNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const SettingsPopup = ({ settings, onClose, onSettingsChange }) => {
  /**
   * Define Variables
   */
  const labels = {
    dragEnabled: "Drag to Reorder Bookmarks",
    hotKeysEnabled: "Enable Hot Keys (1-9)",
    hotKeyLabelsEnabled: "Display Hot Key Labels",
    showAddNewPlaceholder: 'Show Placeholder for "Add New"',
    displayLabels: "Display Bookmark Titles"
  };

  const sections = {
    enabledFeatures: [
      "dragEnabled",
      "hotKeysEnabled",
      "hotKeyLabelsEnabled",
      "showAddNewPlaceholder",
      "displayLabels"
    ]
  };

  /**
   * Methods
   */
  const toggleSetting = key => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    newSettings[key] = !newSettings[key];
    onSettingsChange(newSettings);
  };

  const changeSettingValue = (key, value) => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    newSettings[key] = value;
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
      <h1>Visual</h1>
      <div className="setting">
        <div className="label">Icon Radius</div>
        <div className="control">
          <InputNumber
            value={settings.iconRadiusPercentage}
            min={0}
            max={50}
            step={5}
            postfix="%"
            onChange={newValue => {
              changeSettingValue("iconRadiusPercentage", newValue);
            }}
          />
        </div>
      </div>
      <div className="setting">
        <div className="label">Bookmark Label Font Size</div>
        <div className="control">
          <InputNumber
            value={settings.bookmarkLabelFontSizePx}
            min={9}
            max={25}
            postfix="px"
            onChange={newValue => {
              changeSettingValue("bookmarkLabelFontSizePx", newValue);
            }}
          />
        </div>
      </div>
      <div className="setting">
        <div className="label">Bookmark Icon Size</div>
        <div className="control">
          <InputNumber
            value={settings.bookmarkBackgroundSizePx}
            min={20}
            max={70}
            postfix="px"
            onChange={newValue => {
              changeSettingValue("bookmarkBackgroundSizePx", newValue);
            }}
          />
        </div>
      </div>
      <div className="setting">
        <div className="label">Layout</div>
        <div
          className="control"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <InputNumber
            value={settings.layout.x}
            min={3}
            max={6}
            onChange={newValue => {
              changeSettingValue("layout", {
                x: Number.parseInt(newValue),
                y: settings.layout.y
              });
            }}
          />
          {` By `}
          <InputNumber
            value={settings.layout.y}
            min={3}
            max={6}
            onChange={newValue => {
              changeSettingValue("layout", {
                x: settings.layout.x,
                y: Number.parseInt(newValue)
              });
            }}
          />
        </div>
      </div>
      <div className="comingSoon">
        <FontAwesomeIcon icon={faBullhorn} />
        Many more features are Coming Soon...
      </div>
      {/* <div className="upgradeToPro">
        <FontAwesomeIcon icon={faStar} />
        Upgrade to Pro to enable all of the features
      </div> */}
      <div className="version">
        &copy; 2020 Koala Bookmarks | v{settings.version}
      </div>
    </Popup>
  );
};

SettingsPopup.defaultProps = {};

SettingsPopup.propTypes = {
  settings: PropTypes.shape({
    dragEnabled: PropTypes.bool,
    hotKeysEnabled: PropTypes.bool,
    hotKeyLabelsEnabled: PropTypes.bool
    // TODO:
  }),
  onClose: PropTypes.func.isRequired,
  onSettingsChange: PropTypes.func.isRequired
};

export default SettingsPopup;
