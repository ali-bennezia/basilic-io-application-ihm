import React, { useEffect, useContext, useState } from "react";
import EnTeteProfil from "./EnTeteProfil";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "./../commun/BasePage";

import MoonLoader from "react-spinners/MoonLoader";
import { EntypoCircleWithCross } from "react-entypo";

import { UnauthentifiedRedirection } from "./../../redirection/AuthentifiedRedirection";
import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";

import "./../commun/PagesCommun.css";
import config from "./../../../config/config.json";

import axios from "axios";

import Snackbar from "@mui/material/Snackbar";

const ProfileState = {
  Loading: 0,
  Visible: 1,
  Private: 2,
  Error: 3,
};

function PageProfil() {
  //Navigation.
  const navigate = useNavigate();

  //Paramètres d'URL.
  const { userId } = useParams();

  //Variables du contexte d'authentification.
  const {
    authPayload,
    setAuthPayload,
    authProfile,
    setAuthProfile,
    patchAuthProfile,
    logout,
  } = useContext(AuthentificationContext);

  //Variables.
  let viewedUserId = null;

  //Variables d'état.
  const [pageState, setPageState] = useState(ProfileState.Loading);
  const [profileContent, setProfileContent] = useState(<></>);
  const [viewedAuthProfile, setViewedAuthProfile] = useState(null);

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  //Initialisation de la page.
  useEffect(() => {
    viewedUserId = userId
      ? userId
      : authProfile && "id" in authProfile
      ? authProfile.id
      : null;

    if (viewedUserId == null) {
      navigate("/flux");
      return;
    }

    let cfg = {};
    if (authPayload != null)
      cfg.headers = { authorization: `Bearer ${authPayload.token}` };

    axios
      .get(`${config.applicationServerURL}profiles/get/${viewedUserId}`, cfg)
      .then((data) => {
        setPageState(
          "profilPublic" in data.data &&
            data.data.token.domaineVisible === false
            ? ProfileState.Private
            : ProfileState.Visible
        );
        setViewedAuthProfile(data.data);
      })
      .catch((err) => {
        console.log(err);
        setPageState(ProfileState.Error);
        setViewedAuthProfile(null);
      });
  }, []);

  const updateProfileContent = () => {
    switch (pageState) {
      case ProfileState.Loading:
        setProfileContent(
          <div style={{ marginTop: "260px" }}>
            <MoonLoader color="green" />
          </div>
        );
        break;
      case ProfileState.Private:
        setProfileContent(<p>Profil privé</p>);
        break;
      case ProfileState.Visible:
        setProfileContent(
          <>
            <EnTeteProfil
              profile={viewedAuthProfile}
              setFormNotificationOpen={setFormNotificationOpen}
              setFormNotificationMessage={setFormNotificationMessage}
              setViewedAuthProfile={setViewedAuthProfile}
            />
          </>
        );
        break;
      default:
        setProfileContent(
          <div
            className="inner-page-block"
            style={{
              height: "300px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Profil introuvable</h3>
            <p>
              Malheureusement, il est impossible de charger le profil auquel
              vous tentez d'accéder.
            </p>
            <br />
            <EntypoCircleWithCross
              style={{
                textAlign: "center",
                fontSize: "80px",
                color: "red",
                filter: "drop-shadow(0px 0px 1px black)",
              }}
            />
          </div>
        );
        break;
    }
  };

  useEffect(updateProfileContent, [pageState, viewedAuthProfile]);

  return (
    <BasePage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UnauthentifiedRedirection to="/connexion" />

      <div
        style={{
          width: "100%",
          height: "auto",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {profileContent}
      </div>
      <Snackbar
        open={formNotificationOpen}
        onClose={(e) => setFormNotificationOpen(false)}
        autoHideDuration={6000}
        message={formNotificationMessage}
      />
    </BasePage>
  );
}

export default PageProfil;
