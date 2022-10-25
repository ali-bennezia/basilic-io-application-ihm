import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Onglet from "./Onglet.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthentificationContext from "../../../../contexts/AuthentificationContext.jsx";
import axios from "axios";

import "./../../commun/PagesCommun.css";
import "./Onglet.css";
import config from "../../../../config/config.json";

import { isStringBlank } from "../../../../utils/sanitation";

import {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
} from "../../../../utils/validation";

import Snackbar from "@mui/material/Snackbar";
import { EntypoCheck } from "react-entypo";

function OngletParamsSupprimer({ tabIndex }) {
  //Variables du contexte d'authentification.
  const {
    authPayload,
    setAuthPayload,
    authProfile,
    setAuthProfile,
    patchAuthProfile,
    logout,
  } = useContext(AuthentificationContext);

  //Navigation.
  const navigate = useNavigate();

  //Variables d'état
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmCurrentPassword, setConfirmCurrentPassword] = useState("");

  const [validForm, setValidForm] = useState(false);

  const [waitingAJAXResponse, setWaitingAJAXResponse] = useState(false);

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  const [askConfirmation, setAskConfirmation] = useState(true);

  //Initialisation au montage du composant.
  useEffect(() => {
    setAskConfirmation(true);
  }, []);

  //Callback pour toute entrée
  const refreshFullValidation = () => {
    let fullValidation = true;
    fullValidation = fullValidation && !waitingAJAXResponse;

    fullValidation =
      fullValidation &&
      currentPassword.trim() !== "" &&
      currentPassword === confirmCurrentPassword;

    setValidForm(fullValidation);
  };
  useEffect(refreshFullValidation, [
    currentPassword,
    confirmCurrentPassword,
    waitingAJAXResponse,
  ]);

  //Callback pour l'envoi
  const sendFormData = (e) => {
    e.preventDefault();

    if (authPayload == null) {
      logout(setAuthPayload, setAuthProfile);
      setFormNotificationMessage("Erreur, vous n'êtes pas connecté(e).");
      setFormNotificationOpen(true);
      navigate("/connexion");
      return;
    }

    let data = {};

    if (
      currentPassword.trim() !== "" &&
      currentPassword === confirmCurrentPassword
    )
      data.motDePasse = currentPassword;
    else return;

    if (askConfirmation === true) {
      setAskConfirmation((val) => !val);
      return;
    }

    setWaitingAJAXResponse(true);
    axios
      .delete(
        `${config.applicationServerURL}users/delete/${authPayload.userId}`,
        {
          data: data,

          headers: {
            Authorization: `Bearer ${authPayload.token}`,
          },
        }
      )
      .then((data) => {
        setWaitingAJAXResponse(false);

        logout(setAuthPayload, setAuthProfile);
        navigate("/connexion");
      })
      .catch((err) => {
        console.log(err);
        setWaitingAJAXResponse(false);

        setFormNotificationMessage("Erreur, suppression du compte impossible.");
        setFormNotificationOpen(true);
        setAskConfirmation(true);
      });
  };

  return (
    <Onglet
      tabPosition={2}
      tabIndex={tabIndex}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="inner-page-container">
        <Form>
          <p className="form-paragraph">
            Veuillez noter que cette action est irréversible. <br />
            Tout compte supprimé ne pourra pas être recupéré. <br />
            Veillez donc à bien être sûr(e) de votre choix.
          </p>

          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.motDePasseActuel"
          >
            <Form.Label>Mot de passe actuel</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez votre mot de passe actuel ..."
              value={currentPassword}
              onInput={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.motDePasseConfirmation"
          >
            <Form.Label>Confirmation du mot de passe actuel</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre mot de passe actuel ..."
              value={confirmCurrentPassword}
              onInput={(e) => {
                setConfirmCurrentPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!validForm}
            onClick={(e) => {
              sendFormData(e);
            }}
          >
            {askConfirmation
              ? "Supprimer mon compte"
              : "Confirmer la suppression de mon compte"}
          </Button>

          <Snackbar
            open={formNotificationOpen}
            onClose={(e) => setFormNotificationOpen(false)}
            autoHideDuration={6000}
            message={formNotificationMessage}
          />
        </Form>
      </div>
    </Onglet>
  );
}

export default OngletParamsSupprimer;
