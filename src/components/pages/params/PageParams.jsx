import React, { useState } from "react";
import BasePage from "../commun/BasePage";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./../commun/PagesCommun.css";

import OngletParamsProfilPublic from "./onglets/OngletParamsProfilPublic";
import OngletParamsCompteUtilisateur from "./onglets/OngletParamsCompteUtilisateur";

import { UnauthentifiedRedirection } from "./../../redirection/AuthentifiedRedirection";

function PageParams() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <BasePage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UnauthentifiedRedirection to="/connexion" />

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
          <Tab label="Données confidentielles" value={1} />
          <Tab label="Supprimer" value={2} />
        </Tabs>
      </div>
      <OngletParamsProfilPublic tabIndex={tabIndex} />
      <OngletParamsCompteUtilisateur tabIndex={tabIndex} />
    </BasePage>
  );
}

export default PageParams;
