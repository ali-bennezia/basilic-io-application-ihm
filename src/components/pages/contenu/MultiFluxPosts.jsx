import React, { useState } from "react";
import FluxPosts from "./FluxPosts";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

/*
    La variable 'tabs' doit contenir un array. Chaque élement dans cet array représente un onglet. Sa structure doit être la suivante:
    {
        name:<nom affiché de l'onglet>
        propsFlux:<props du flux de posts de l'onglet spécifique>
    }
*/

function MultiFluxPosts({ tabs }) {
  //Variables d'état.
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
        {tabs.map((el, i) => {
          return <Tab label={el.name} value={i} key={i} />;
        })}
      </Tabs>
      <span style={{ height: "130px" }} />

      {tabs.length > 0 ? <FluxPosts {...tabs[tabIndex].propsFlux} /> : null}
    </div>
  );
}

export default MultiFluxPosts;
