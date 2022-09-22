import React from "react";

import NavbarHaut from "./navbar/NavbarHaut";
import NavbarLateral from "./navbar/NavbarLateral";

import "./PagesCommun.css";

const outerFrameStyle = {
  width: "100%",
  height: "auto",

  marginLeft: "246px",
  marginTop: "48px",
};

function BasePage({ children, style, frameStyle = {} }) {
  return (
    <div className="main-page-organizer" style={style}>
      <NavbarHaut />
      <NavbarLateral />
      <div style={{ ...outerFrameStyle, ...frameStyle }}>{children}</div>
    </div>
  );
}

export default BasePage;
