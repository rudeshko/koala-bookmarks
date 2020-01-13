import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../sass/Checkbox.scss";

const Checkbox = ({ value, onToggle }) => (
  <div
    className={["component checkbox", value ? "checked" : ""].join(" ").trim()}
    onClick={onToggle}
  >
    {value && <FontAwesomeIcon icon={faCheck} />}
  </div>
);

Checkbox.defaultProps = {};

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Checkbox;
