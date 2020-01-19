import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "../sass/InputNumber.scss";

const InputNumber = ({ min, max, step, value, postfix, onChange }) => {
  /**
   * Define Hooks
   */

  /**
   * Methods
   */
  const handleClickUp = () => {
    if (value >= max) {
      return false;
    }

    onChange(value + step); // TODO: Add step instead of 1
  };

  const handleClickDown = () => {
    if (value <= min) {
      return false;
    }

    onChange(value - step); // TODO: Add step instead of 1
  };

  /**
   * Output the component
   */
  return (
    <div className="component inputNumber">
      <div className="value">{value + postfix}</div>
      <div className="controls">
        <div
          className={["control up", value >= max ? "disabled" : ""].join(" ")}
          onClick={() => {
            handleClickUp();
          }}
        >
          <FontAwesomeIcon icon={faCaretUp} />
        </div>
        <div
          className={["control down", value <= min ? "disabled" : ""].join(" ")}
          onClick={() => {
            handleClickDown();
          }}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
    </div>
  );
};

InputNumber.defaultProps = {
  postfix: "",
  step: 1
};

InputNumber.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  postfix: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default InputNumber;
