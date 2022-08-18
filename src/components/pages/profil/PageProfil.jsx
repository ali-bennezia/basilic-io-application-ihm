import React, { useEffect, useContext, useState } from "react";
import EnTeteProfil from "./EnTeteProfil";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "./../commun/BasePage";

import { UnauthentifiedRedirection } from "./../../redirection/AuthentifiedRedirection";
import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";

import "./../commun/PagesCommun.css";
import config from "./../../../config/config.json";

import axios from "axios";

const ProfileState = {
  Visible: 0,
  Private: 1,
  Error: 2,
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
  const [pageState, setPageState] = useState(ProfileState.Error);
  const [viewedAuthProfile, setViewedAuthProfile] = useState(null);

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

    axios
      .get(`${config.applicationServerURL}profiles/get/${viewedUserId}`)
      .then((data) => {
        console.log(data.data);
        setViewedAuthProfile(data.data);
      })
      .catch((err) => {
        console.log(err);
        setViewedAuthProfile(null);
      });
  }, []);

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
        <EnTeteProfil profile={viewedAuthProfile} />
      </div>
    </BasePage>
  );
}

export default PageProfil;
