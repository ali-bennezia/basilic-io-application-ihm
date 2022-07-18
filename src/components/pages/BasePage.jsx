import React from "react";

import NavbarHaut from "./NavbarHaut";

import "./PagesCommun.css";

function BasePage({ children, style }) {
  return (
    <div className="main-page-organizer" style={style}>
      <NavbarHaut />
      {children}
    </div>
  );
}

export default BasePage;
