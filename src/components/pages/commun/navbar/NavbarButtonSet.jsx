import React, { useContext } from "react";

import AuthentificationContext from "../../../../contexts/AuthentificationContext";
import { isAuthPayloadValid } from "../../../../utils/authentification";
import "./../PagesCommun.css";
import Button from "@mui/material/Button";

function NavbarButtonSet() {
  const authProps = useContext(AuthentificationContext);

  let userLoggedIn =
    authProps.authPayload != null &&
    isAuthPayloadValid(authProps.authPayload) &&
    authProps.authProfile != null;

  return (
    <div className="navbar-button-set">
      <Button variant="contained" tag="one">
        Flux d'activité
      </Button>
      <Button variant="contained" tag="two" disabled={!userLoggedIn}>
        Mon profil
      </Button>
      <Button variant="contained" tag="one" disabled={!userLoggedIn}>
        Mes messages
      </Button>
      <Button variant="contained" tag="two" disabled={!userLoggedIn}>
        Mes paramètres
      </Button>
    </div>
  );
}

export default NavbarButtonSet;
