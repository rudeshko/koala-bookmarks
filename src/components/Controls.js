import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faLock,
  faUnlock,
  faStar,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

import "../sass/Controls.scss";

const Controls = ({ editModeOnClick, editMode, settingsOnClick }) => {
  /**
   * Define Hooks
   */
  const [upgradeToProEnabled] = useState(false);
  const [helpEnabled] = useState(false);

  /**
   * Output the component
   */
  return (
    <div className="controls">
      <div className="left">
        <FontAwesomeIcon icon={faChrome} />
        Koala Bookmarks
      </div>
      <div className="right">
        <button
          onClick={editModeOnClick}
          title={`Turn ${editMode ? "off" : "on"} Edit Mode`}
        >
          <FontAwesomeIcon icon={editMode ? faUnlock : faLock} />
          Edit Mode
        </button>
        <button onClick={settingsOnClick} title="Open Settings">
          <FontAwesomeIcon icon={faCog} />
          Settings
        </button>
        {helpEnabled && (
          <button onClick={() => {}} title="Help and Tips">
            <FontAwesomeIcon icon={faQuestionCircle} />
            Help
          </button>
        )}
        {upgradeToProEnabled && (
          <button onClick={() => {}} title="Upgrade to Pro">
            <FontAwesomeIcon icon={faStar} />
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
};

Controls.defaultProps = {};

Controls.propTypes = {
  editMode: PropTypes.bool.isRequired,
  editModeOnClick: PropTypes.func.isRequired,
  settingsOnClick: PropTypes.func.isRequired
};

export default Controls;
