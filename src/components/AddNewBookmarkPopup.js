import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import "../sass/Popup.scss";

const defaultProps = {};

const AddNewBookmarkPopup = props => {
  /**
   * Define Hooks
   */
  const [data] = useState(Object.assign(defaultProps, props));

  /**
   * Methods
   */
  // --- //

  /**
   * On mount effect
   */
  useEffect(() => {
    console.log("AddNewBookmarkPopup", data);
  });

  /**
   * Output the component
   */
  return <Popup title="Add New Bookmark"></Popup>;
};

export default AddNewBookmarkPopup;
