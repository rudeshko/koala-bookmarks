import React, { useState, useEffect } from "react";

const Popup = props => {
  useEffect(() => {
    console.log(props);
  });

  return (
    // <div className="popup">
    //   <div className="window">
    //     <div className="header">
    //       <div className="title">Edit Bookmark</div>
    //       <div
    //         className="close"
    //         onClick={() => {
    //           setEditBookmarkAtIndex(null);
    //         }}
    //       >
    //         <FontAwesomeIcon icon={faTimesCircle} />
    //       </div>
    //     </div>
    //     <div className="content">
    //       <form onSubmit={event => editBookmark(event)}>
    //         <div>
    //           <input
    //             type="text"
    //             placeholder="Title"
    //             onChange={e => setEditName(e.target.value)}
    //             value={editName}
    //             required
    //             autoFocus
    //           />
    //         </div>
    //         <div>
    //           <input
    //             type="url"
    //             placeholder="URL"
    //             onChange={e => setEditUrl(e.target.value)}
    //             value={editUrl}
    //             required
    //           />
    //         </div>
    //         <div>
    //           <button>
    //             <FontAwesomeIcon icon={faPlus} />
    //             Update
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};
