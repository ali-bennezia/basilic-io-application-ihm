import React, { createContext, useState, useEffect } from "react";

//Utilitaires.
import {
  isAuthPayloadValid,
  isAuthPayloadNearingExpiration,
} from "../utils/authentification";

import config from "../config/config.json";

import axios from "axios";

const AuthentificationContext = createContext();

function refreshAuthProfile(
  authPayload,
  setAuthPayload,
  authProfile,
  setAuthProfile
) {
  if (!isAuthPayloadValid(authPayload)) {
    setAuthProfile(null);
    return;
  }

  axios
    .get(`${config.applicationServerURL}profiles/get/${authPayload.userId}`, {
      headers: { Authorization: `Bearer ${authPayload.token}` },
    })
    .then((data) => {
      setAuthProfile(data.data);
    })
    .catch((err) => {
      logout(setAuthPayload, setAuthProfile);
      console.log(err);
    });
}

function logout(setAuthPayload, setAuthProfile) {
  setAuthPayload(null);
  setAuthProfile(null);
}

function refreshAuthPayload(authPayload, setAuthPayload, setAuthProfile) {
  if (authPayload != null && isAuthPayloadNearingExpiration(authPayload)) {
    //Appel AJAX permettant de mettre à jour le payload d'authentification.
    axios
      .post(`${config.applicationServerURL}auth/token/refresh`, {
        token: authPayload.token,
      })
      .then((data) => {
        setAuthPayload(data.data);
      })
      .catch((err) => {
        logout(setAuthPayload, setAuthProfile);
        console.log(err);
      });
  }
}

function saveAuthPayload(authPayload) {
  localStorage.setItem("authPayload", JSON.stringify(authPayload));
}

function saveAuthProfile(authProfile) {
  localStorage.setItem("authProfile", JSON.stringify(authProfile));
}

function loadAuthPayload() {
  let savedAuthPayload =
    localStorage.getItem("authPayload") != null
      ? JSON.parse(localStorage.getItem("authPayload"))
      : null;

  if (savedAuthPayload != null)
    savedAuthPayload.issuedAt = new Date(savedAuthPayload.issuedAt);

  savedAuthPayload = isAuthPayloadValid(savedAuthPayload)
    ? savedAuthPayload
    : null;

  return savedAuthPayload;
}

function loadAuthProfile() {
  let savedAuthProfile =
    localStorage.getItem("authProfile") != null
      ? JSON.parse(localStorage.getItem("authProfile"))
      : null;

  return savedAuthProfile;
}

function AuthentificationContextProvider(props) {
  //Variables d'état.
  const [authProfile, setAuthProfile] = useState(loadAuthProfile());
  const [authPayload, setAuthPayload] = useState(loadAuthPayload());

  /*Charger au montage tout payload déjà connu si valide.
  Aussi, mettre à jour le payload à chaque montage si nécessaire. */
  useEffect(function () {
    setAuthPayload(loadAuthPayload());
    refreshAuthPayload(authPayload, setAuthPayload, setAuthProfile);
  }, []);

  //Sauvegarder tout nouveau payload.
  useEffect(
    function () {
      saveAuthPayload(authPayload);
      refreshAuthProfile(
        authPayload,
        setAuthPayload,
        authProfile,
        setAuthProfile
      );
    },
    [authPayload]
  );

  //Envoyer des informations additionnelles au profil actuel, si il existe.
  const patchAuthProfile = (data) => {
    let newPrf = { ...(authProfile != null ? authProfile : {}), ...data };
    for (let p in data)
      if (data[p] === null || data[p] === undefined) delete newPrf[p];

    console.log(newPrf);
    setAuthProfile(newPrf);
  };

  //Sauvegarder tout nouveau profil.
  useEffect(
    function () {
      saveAuthProfile(authProfile);
    },
    [authProfile]
  );

  return (
    <AuthentificationContext.Provider
      value={{
        authPayload: authPayload,
        setAuthPayload: setAuthPayload,
        authProfile: authProfile,
        setAuthProfile: setAuthProfile,
        patchAuthProfile: patchAuthProfile,
        logout: logout,
        refreshAuthPayload: refreshAuthPayload,
        refreshAuthProfile: refreshAuthProfile,
      }}
    >
      {props.children}
    </AuthentificationContext.Provider>
  );
}

export { AuthentificationContextProvider };
export default AuthentificationContext;
