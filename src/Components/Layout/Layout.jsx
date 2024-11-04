import React from "react";
import "./Layout.css"; 

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="scrollable-content">
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
