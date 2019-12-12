import React, { useState, useEffect } from "react";
import "../sass/Popup.scss";

const defaultProps = {
  title: ""
};

const Popup = props => {
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
    console.log("Popup", data);
  });

  /**
   * Output the component
   */
  return (
    <></>
    // <div className="popup">
    //   <div className="window">
    //     <div className="header">
    //       <div className="title">{data.title}</div>
    //       <div
    //         className="close"
    //         onClick={() => {
    //           setAddBookmarkAtIndex(null);
    //         }}
    //       >
    //         <FontAwesomeIcon icon={faTimesCircle} />
    //       </div>
    //     </div>
    //     <div className="content">
    //       <form onSubmit={event => addNewBookmark(event)}>
    //         <div>
    //           <input
    //             type="text"
    //             placeholder="Title"
    //             onChange={e => setNewName(e.target.value)}
    //             required
    //             autoFocus
    //           />
    //         </div>
    //         <div>
    //           <input
    //             type="url"
    //             placeholder="URL"
    //             required
    //             onChange={e => setNewUrl(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <button>
    //             <FontAwesomeIcon icon={faPlus} />
    //             Add
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Popup;
