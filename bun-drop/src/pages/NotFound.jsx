import React from "react";
function NotFound() {
  return (
    <>
      <div className="under-navbar"></div>
      <div className="not-found-text z-index-increase">
        <h1>ERROR 404: Not found!</h1>
        <p>
          Make sure to check the URL used is correct <br />
          If this was because of a button press on the website please let us
          know by sending an email: support@bundrop.com
        </p>
      </div>
    </>
  );
}

export default NotFound;
