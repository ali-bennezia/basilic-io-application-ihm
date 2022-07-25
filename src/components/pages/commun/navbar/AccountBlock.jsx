import React from "react";
import { GreaterStencilFunc } from "three";
import "./../PagesCommun.css";

import Button from "@mui/material/Button";

import { isUserAuthentified } from "./../../../../utils/authentification";

function AccountBlock() {
  if (isUserAuthentified())
    return (
      <div id="navbar-account-block">
        <div>
          <div
            style={{
              backgroundColor: "#3bd34d",
              width: "54px",
              height: "54px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "black 0px 0px 3px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "white",
              }}
            ></div>
          </div>
        </div>
        <div style={{ marginLeft: "14px" }}>
          <p className="navbar-text" style={{ fontSize: "14px" }}>
            Connecté(e) en tant que .......
          </p>
          <Button variant="contained" style={{ fontSize: "10px" }}>
            Se déconnecter
          </Button>
        </div>
      </div>
    );
  else return <div id="navbar-account-block"></div>;
}

export default AccountBlock;
