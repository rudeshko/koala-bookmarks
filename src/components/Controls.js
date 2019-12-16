import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faLock,
  faUnlock,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import "../sass/Controls.scss";

const Controls = props => {
  /**
   * Define Hooks
   */
  const [upgradeToProEnabled] = useState(true); // TODO: Will be a setting

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
    <div className="controls">
      <button
        onClick={props.editModeOnClick}
        title={`Turn ${props.editMode ? "off" : "on"} Edit Mode`}
      >
        <FontAwesomeIcon icon={props.editMode ? faUnlock : faLock} />
        Edit Mode
      </button>
      <button onClick={props.settingsOnClick} title="Open Settings">
        <FontAwesomeIcon icon={faCog} />
        Settings
      </button>
      {upgradeToProEnabled && (
        <button onClick={() => {}} title="Upgrade to Pro">
          <FontAwesomeIcon icon={faStar} />
          Upgrade to Pro
        </button>
      )}
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
