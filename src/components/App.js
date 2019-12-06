import React, { useState, useEffect } from "react";
import "../sass/App.scss";

const App = () => {
  /**
   * Define Hooks
   */
  const [hook, setHook] = useState(0);

  /**
   * On mount effect
   */
  useEffect(() => {
    console.log("Ready...");
  }, []);

  /**
   * Output the component
   */
  return (
    <div className="container">
      <div />
    </div>
  );
};

export default App;
