import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "../sass/InputNumber.scss";

const InputNumber = ({ min, max, value, postfix, onChange }) => {
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

    onChange(++value);
  };

  const handleClickDown = () => {
    if (value <= min) {
      return false;
    }

    onChange(--value);
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
  // <input
  //   type="number"
  //   min="9"
  //   max="25"
  //   step="1"
  //   value={value}
  //   onChange={e => {
  //     let value = Number.parseInt(e.target.value);
  //     if (!value) {
  //       value = DefaultSettings.bookmarkLabelFontSizePx;
  //     } else if (value < 9) {
  //       value = 9;
  //     } else if (value > 25) {
  //       value = 25;
  //     }

  //     changeSettingValue("bookmarkLabelFontSizePx", value);
  //   }}
  // />
};

InputNumber.defaultProps = {
  postfix: ""
};

InputNumber.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  postfix: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default InputNumber;
