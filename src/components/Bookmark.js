import React, { useState, useEffect } from "react";

const Bookmark = props => {
  /**
   * Default Props
   */
  const defaultProps = {
    value: {},
    index: null
  };

  /**
   * Define Hooks
   */
  const [data] = useState(Object.assign(defaultProps, props));

  /**
   * On mount effect
   */
  useEffect(() => {});

  /**
   * Methods
   */
  // ...

  /**
   * Output the component
   */
  return null;
};

export default Bookmark;
