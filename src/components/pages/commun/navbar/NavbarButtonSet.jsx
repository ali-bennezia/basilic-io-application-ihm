import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthentificationContext from "../../../../contexts/AuthentificationContext";
import { isAuthPayloadValid } from "../../../../utils/authentification";
import "./../PagesCommun.css";
import Button from "@mui/material/Button";
import {
  EntypoGlobe,
  EntypoUser,
  EntypoMessage,
  EntypoCog,
} from "react-entypo";

const menuIconStyle = { width: "20px", height: "20px" };

function NavbarButtonSet() {
  const authProps = useContext(AuthentificationContext);
  const { authProfile } = authProps;

  let userLoggedIn =
    authProps.authPayload != null &&
    isAuthPayloadValid(authProps.authPayload) &&
    authProps.authProfile != null;

  const navigate = useNavigate();

  return (
    <div className="navbar-button-set">
      <Button
        variant="contained"
        tag="one"
        onClick={() => {
          navigate("/flux");
        }}
      >
        <EntypoGlobe style={menuIconStyle} />
        &nbsp; Flux d'activité
      </Button>
      <Button
        variant="contained"
        tag="two"
        disabled={!userLoggedIn}
        onClick={() => {
          navigate("/profil");
        }}
      >
        <EntypoUser style={menuIconStyle} />
        &nbsp; Mon profil
      </Button>
      <Button
        variant="contained"
        tag="one"
        disabled={!userLoggedIn || !authProfile || !authProfile.valide}
        onClick={() => {
          navigate("/messages");
        }}
      >
        <EntypoMessage style={menuIconStyle} />
        &nbsp; Mes messages
      </Button>
      <Button
        variant="contained"
        tag="two"
        disabled={!userLoggedIn}
        onClick={() => {
          navigate("/params");
        }}
      >
        <EntypoCog style={menuIconStyle} />
        &nbsp; Mes paramètres
      </Button>
    </div>
  );
}

export default NavbarButtonSet;
