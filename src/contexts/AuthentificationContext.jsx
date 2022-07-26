import React, { createContext, useState, useEffect } from "react";

//Utilitaires.
import {
  isAuthPayloadValid,
  isAuthPayloadNearingExpiration,
} from "./../utils/authentification";

import config from "./../config/config.json";

import axios from "axios";

const AuthentificationContext = createContext();

var currentAuthPayload = null;
var currentAuthPayloadSetter = null;

var currentAuthProfile = null;
var currentAuthProfileSetter = null;

function refreshAuthProfile() {
  if (currentAuthProfileSetter == null) return;

  let payload = getAuthPayload();
  if (!isAuthPayloadValid(payload)) {
    currentAuthProfileSetter(null);
    return;
  }

  axios
    .get(`${config.applicationServerURL}profiles/get/${payload.userId}`, {
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .then((data) => {
      currentAuthProfileSetter(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function refreshAuthPayload(authPayload, setAuthPayload) {
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
        console.log(err);
      });
  }
}

function saveAuthPayload(authPayload) {
  localStorage.setItem("authPayload", JSON.stringify(authPayload));
  currentAuthPayload = authPayload;
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

function AuthentificationContextProvider(props) {
  //Variables d'état.
  const [authProfile, setAuthProfile] = useState(null);
  const [authPayload, setAuthPayload] = useState(loadAuthPayload());

  currentAuthProfileSetter = setAuthProfile;
  currentAuthPayloadSetter = setAuthPayload;

  //Mises à jour à executer à chaque changement de authProfile.
  useEffect(
    function () {
      currentAuthProfile = authProfile;
    },
    [authProfile]
  );

  /*Charger au montage tout payload déjà connu si valide.
  Aussi, mettre à jour le payload à chaque montage si nécessaire. */
  useEffect(function () {
    setAuthPayload(loadAuthPayload());
    refreshAuthPayload(authPayload, setAuthPayload);
  }, []);

  //Sauvegarder tout nouveau payload.
  useEffect(
    function () {
      saveAuthPayload(authPayload);
      refreshAuthProfile();
    },
    [authPayload]
  );

  return (
    <AuthentificationContext.Provider
      value={{
        authPayload: authPayload,
        setAuthPayload: setAuthPayload,
        authProfile: authProfile,
        setAuthProfile: setAuthProfile,
      }}
    >
      {props.children}
    </AuthentificationContext.Provider>
  );
}

const getAuthPayload = () => currentAuthPayload;
const getAuthPayloadSetter = () => currentAuthPayloadSetter;

const getAuthProfile = () => currentAuthProfile;
const getAuthProfileSetter = () => currentAuthProfileSetter;

export {
  AuthentificationContextProvider,
  getAuthPayload,
  getAuthPayloadSetter,
  saveAuthPayload,
  loadAuthPayload,
  getAuthProfile,
  getAuthProfileSetter,
};
export default AuthentificationContext;
