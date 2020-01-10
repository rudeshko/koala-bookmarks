import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faLock,
  faCog,
  faWrench
} from "@fortawesome/free-solid-svg-icons";

const NewUserPopup = ({ onClose }) => {
  /**
   * Output the component
   */
  return (
    <Popup className="newUser" title="Welcome!" wide onClose={onClose}>
      <h2>
        Welcome to an extension that allows you to access and manage your
        favorite bookmarks with ease.
        <br />
        <small>Here are some tips to get you started...</small>
      </h2>
      <h3>Accessing your websites</h3>
      <ul>
        <li>
          If you have <b>Hot Keys</b> setting enabled, your first 9 links can be
          opened by pressing a number (1-9) on your keyboard while the extension
          is open. You can disable this feature in{" "}
          <b>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </b>
          .
        </li>
        <li>
          You can set a shortcut to open the extension by going to{" "}
          <b className="link">chrome://extensions/shortcuts</b> and setting a
          value for <b>Activate the extension</b>. For example,{" "}
          <b>Ctrl+1 (Cmd+1)</b> can be used to open the extension while in
          Chrome.
        </li>
        <li>
          If you combine the above two tips, you can access your first websites
          by <b>Ctrl+1 (Cmd+1) + 1...9</b>
        </li>
      </ul>
      <h3>Managing your bookmarks</h3>
      <ul>
        <li>
          To add a new bookmark, click on any empty slot, and a modal will pop
          up where you can enter the Title and the URL.
        </li>
        <li>
          When you enable{" "}
          <b>
            <FontAwesomeIcon icon={faLock} />
            Edit Mode
          </b>{" "}
          you can do the following:
          <ul>
            <li>Drag and Drop bookmarks to change their location</li>
            <li>
              Delete any bookmark by pressing{" "}
              <FontAwesomeIcon icon={faMinusCircle} />
            </li>
            <li>
              Edit any bookmark by pressing <FontAwesomeIcon icon={faWrench} />
            </li>
          </ul>
        </li>
      </ul>
      <h3>Customizing your extension</h3>
      <ul>
        <li>
          When you visit{" "}
          <b>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </b>{" "}
          you can change how your extension looks.
        </li>
        <li>
          This area is under development and many more features are coming very
          soon.
        </li>
      </ul>
    </Popup>
  );
};

NewUserPopup.defaultProps = {};

NewUserPopup.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default NewUserPopup;
