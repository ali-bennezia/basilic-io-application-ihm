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

function OngletParamsCompteUtilisateur({ tabIndex }) {
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmCurrentPassword, setConfirmCurrentPassword] = useState("");

  const [validForm, setValidForm] = useState(false);

  const [waitingAJAXResponse, setWaitingAJAXResponse] = useState(false);

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  //Callback pour toute entrée
  const refreshFullValidation = () => {
    let fullValidation = true;
    fullValidation = fullValidation && !waitingAJAXResponse;

    if (!isStringBlank(phoneNumber))
      fullValidation =
        fullValidation && validatePhoneNumber(phoneNumber).result;

    if (!isStringBlank(email))
      fullValidation = fullValidation && validateEmail(email).result;

    if (!isStringBlank(password))
      fullValidation = fullValidation && validatePassword(password).result;

    fullValidation =
      fullValidation &&
      currentPassword.trim() !== "" &&
      currentPassword === confirmCurrentPassword;

    fullValidation =
      fullValidation &&
      !(
        email.trim() === "" &&
        phoneNumber.trim() === "" &&
        password.trim() === ""
      );

    setValidForm(fullValidation);
  };
  useEffect(refreshFullValidation, [
    phoneNumber,
    email,
    password,
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

    let data = { newData: {} };

    if (phoneNumber.trim() !== "") data.newData.numeroTelephone = phoneNumber;
    if (email.trim() !== "") data.newData.email = email;
    if (password.trim() !== "") data.newData.password = password;
    if (
      currentPassword.trim() !== "" &&
      currentPassword === confirmCurrentPassword
    )
      data.motDePasse = currentPassword;
    else return;

    setWaitingAJAXResponse(true);
    axios
      .patch(
        `${config.applicationServerURL}users/patch/${authPayload.userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authPayload.token}`,
          },
        }
      )
      .then((data) => {
        setWaitingAJAXResponse(false);

        setFormNotificationMessage(
          "Données confidentielles mises à jour avec succès."
        );
        setFormNotificationOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setWaitingAJAXResponse(false);

        setFormNotificationMessage(
          "Erreur, mise à jour des données confidentielles impossible."
        );
        setFormNotificationOpen(true);
      });
  };

  return (
    <Onglet
      tabPosition={1}
      tabIndex={tabIndex}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "640px",
          height: "620px",
          border: "1px solid #BABABA",
          borderRadius: "20px",
          marginTop: "20px",
          padding: "40px",
          backgroundColor: "#F2F2F2",
        }}
      >
        <Form>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.numeroTelephone"
          >
            <Form.Label>Nouveau numéro de téléphone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez un nouveau numéro de téléphone ..."
              value={phoneNumber}
              onInput={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.email"
          >
            <Form.Label>Nouvelle adresse e-mail</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez une nouvelle adresse e-mail ..."
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.motDePasse"
          >
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez un nouveau mot de passe ..."
              value={password}
              onInput={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <hr />
          <br />
          <br />

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
            Envoyer
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

export default OngletParamsCompteUtilisateur;
