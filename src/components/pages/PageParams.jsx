import React from "react";
import BasePage from "./commun/BasePage";

import "./commun/PagesCommun.css";

function PageParams() {
  return (
    <BasePage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1 className="page-title" style={{ marginTop: "26px" }}>
        Paramètres
      </h1>
    </BasePage>
  );
}

export default PageParams;
