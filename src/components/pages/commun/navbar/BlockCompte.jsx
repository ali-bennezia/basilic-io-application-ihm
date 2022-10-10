import React, { useContext } from "react";
import AvatarProfil from "../profil/AvatarProfil";

import AuthentificationContext from "../../../../contexts/AuthentificationContext";

import { GreaterStencilFunc } from "three";
import "./../PagesCommun.css";

import Button from "@mui/material/Button";

import { isAuthPayloadValid } from "../../../../utils/authentification";

import "./../PagesCommun.css";

import {
  EntypoLogOut,
  EntypoLogin,
  EntypoTextDocument,
  EntypoCheck,
  EntypoTools,
} from "react-entypo";

import { useNavigate } from "react-router-dom";

import config from "../../../../config/config.json";

function BlockCompte() {
  const navigate = useNavigate();

  let authProps = useContext(AuthentificationContext);
  const { authPayload } = authProps;
  let profile = authProps.authProfile;

  const invalidAccountElement = (
    <>
      {" "}
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

          marginTop: "10px",
        }}
        onClick={(e) => navigate("/valider")}
      >
        <EntypoCheck /> &nbsp; Valider mon compte
      </Button>
      <p
        className="navbar-text"
        style={{
          textAlign: "center",
          fontSize: "16px",
          marginTop: "10px",
          color: "grey",
        }}
      >
        Votre compte n'est pas encore valide. Vous n'avez pas accès à toutes les
        fonctionnalités.
      </p>
    </>
  );

  const onClickDisconnect = () => {
    authProps.logout(authProps.setAuthPayload, authProps.setAuthProfile);
    navigate("/");
  };

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
            <AvatarProfil profile={profile} borderRadius={14} />
          </div>
          <div
            style={{ width: "100px", marginLeft: "-40px", marginTop: "-10px" }}
          >
            <p
              className="navbar-text"
              style={{
                fontSize: "14px",
                maxWidth: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {"nomPublic" in profile && profile.nomPublic != null
                ? profile.nomPublic
                : profile.nomUtilisateur}
            </p>
            <p className="navbar-subtext" style={{ marginTop: "-20px" }}>
              {`@${profile.nomUtilisateur}`}
              {"admin" in authPayload && authPayload.admin === true ? (
                <span style={{ fontSize: "12px" }}>
                  <br />
                  <EntypoTools style={{ fontSize: "14px", marginTop: "0px" }} />
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "6px",
                      marginLeft: "4px",
                    }}
                  >
                    Administrateur
                  </span>
                </span>
              ) : null}
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
        {!authProps.authProfile.valide ? invalidAccountElement : null}
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

export default BlockCompte;
