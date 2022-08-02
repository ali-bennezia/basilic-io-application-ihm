import React, { useState } from "react";
import BasePage from "./commun/BasePage";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./commun/PagesCommun.css";

function PageParams() {
  const [tabIndex, setTabIndex] = useState(0);

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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          TabIndicatorProps={{
            style: {
              background: "#3bd34d",
              backgroundColor: "#3bd34d",
              color: "#3bd34d",
            },
          }}
          indicatorColor={"#3bd34d"}
          value={tabIndex}
          onChange={(event, newValue) => setTabIndex(newValue)}
        >
          <Tab label="Profil public" value={0} />
          <Tab label="Compte d'utilisateur" value={1} />
          <Tab label="Supprimer" value={2} />
        </Tabs>
      </div>
    </BasePage>
  );
}

export default PageParams;
