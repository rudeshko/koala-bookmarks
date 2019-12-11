import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const AddNewBookmarkPopup = props => {
  useEffect(() => {
    console.log("AddNewBookmarkPopup", props);
  });

  return <Popup title="Add New Bookmark"></Popup>;
};

export default AddNewBookmarkPopup;
