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
  const [authPayload, setAuthPayload] = useState(loadAuthPayload());

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
    },
    [authPayload]
  );

  return (
    <AuthentificationContext.Provider
      value={{ authPayload: authPayload, setAuthPayload: setAuthPayload }}
    >
      {props.children}
    </AuthentificationContext.Provider>
  );
}

const getAuthPayload = () => currentAuthPayload;

export { AuthentificationContextProvider, getAuthPayload, saveAuthPayload };
export default AuthentificationContext;
