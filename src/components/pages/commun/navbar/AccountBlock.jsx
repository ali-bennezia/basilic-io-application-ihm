import React, { useContext } from "react";

import AuthentificationContext from "../../../../contexts/AuthentificationContext";

import { GreaterStencilFunc } from "three";
import "./../PagesCommun.css";

import Button from "@mui/material/Button";

import {
  disconnectUser,
  isAuthPayloadValid,
} from "./../../../../utils/authentification";

import "./../PagesCommun.css";

import { EntypoLogOut, EntypoLogin, EntypoTextDocument } from "react-entypo";

import { useNavigate } from "react-router-dom";

function AccountBlock() {
  const navigate = useNavigate();

  const onClickDisconnect = () => {
    disconnectUser();
    navigate("/");
  };

  const authProps = useContext(AuthentificationContext);
  const profile = authProps.authProfile;

  if (
    authProps.authPayload != null &&
    isAuthPayloadValid(authProps.authPayload) &&
    profile != null
  )
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
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
              >
                <img
                  src={
                    "photoProfil" in profile
                      ? profile.photoProfil
                      : "/img/profile/guest-avatar.jpg"
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "-38px", marginTop: "-10px" }}>
            <p className="navbar-text" style={{ fontSize: "14px" }}>
              {"nomPublic" in profile && profile.nomPublic != null
                ? profile.nomPublic
                : profile.nomUtilisateur}
            </p>
            <p className="navbar-subtext" style={{ marginTop: "-20px" }}>
              {`@${profile.nomUtilisateur}`}
            </p>
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3bd34d",

            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
            textTransform: "none",

            width: "84%",
            height: "30px",
            padding: "8px",
          }}
          onClick={onClickDisconnect}
        >
          <EntypoLogOut /> &nbsp; Se déconnecter
        </Button>
      </div>
    );
  else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <div id="navbar-account-block">
          {" "}
          <p
            className="navbar-text"
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            Vous êtes actuellement anonyme.
          </p>{" "}
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3bd34d",

            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
            textTransform: "none",

            width: "84%",
            height: "30px",
            padding: "8px",
          }}
          onClick={() => {
            navigate("/connexion");
          }}
        >
          <EntypoLogin /> &nbsp; Se connecter
        </Button>

        <Button
          variant="contained"
          style={{
            backgroundColor: "#3bd34d",

            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
            textTransform: "none",

            width: "84%",
            height: "30px",
            padding: "8px",

            marginTop: "20px",
          }}
          onClick={() => {
            navigate("/inscription");
          }}
        >
          <EntypoTextDocument /> &nbsp; S'enregistrer
        </Button>
      </div>
    );
}

export default AccountBlock;
