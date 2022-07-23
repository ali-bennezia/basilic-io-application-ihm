import React from "react";

import NavbarHaut from "./navbar/NavbarHaut";
import NavbarLateral from "./navbar/NavbarLateral";

import "./PagesCommun.css";

function BasePage({ children, style }) {
  return (
    <div className="main-page-organizer" style={style}>
      <NavbarHaut />
      <NavbarLateral />
      {children}
    </div>
  );
}

export default BasePage;
