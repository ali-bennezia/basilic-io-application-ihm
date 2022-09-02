import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "./../../../../config/config.json";

import BasePage from "../../commun/BasePage";
import { UnauthentifiedRedirection } from "../../../redirection/AuthentifiedRedirection";
import { ValidRedirection } from "../../../redirection/ValidInvalidRedirection";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import AuthentificationContext from "../../../../contexts/AuthentificationContext";

import Snackbar from "@mui/material/Snackbar";

function PageValidation() {
  //Utilitaires/Hooks.
  const navigate = useNavigate();

  //Variables du contexte d'authentification.
  const { authPayload, setAuthPayload, setAuthProfile, refreshAuthPayload } =
    useContext(AuthentificationContext);

  //Variables d'état.
  const [mode, setMode] = useState(0);
  const [code, setCode] = useState("");
  const [formError1, setFormError1] = useState("");
  const [formError2, setFormError2] = useState("");

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  //Callbacks.
  const sendCode = (e) => {
    e.preventDefault();

    axios
      .get(`${config.applicationServerURL}users/validation/send/${mode}`, {
        headers: { authorization: `Bearer ${authPayload.token}` },
      })
      .then((data) => {
        setFormError1("");
        setFormNotificationMessage("Code envoyé.");
        setFormNotificationOpen(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 429)
          setFormError1(
            "Trop de requêtes en un cours laps de temps. Veuillez patienter avant de redemander l'envoi d'un code."
          );
        else setFormError1("Erreur interne.");
      });
  };

  const validateCode = (e) => {
    e.preventDefault();

    axios
      .post(
        `${config.applicationServerURL}users/validation/confirm`,
        { code: code },
        {
          headers: { authorization: `Bearer ${authPayload.token}` },
        }
      )
      .then((data) => {
        //Compte validé.
        refreshAuthPayload(authPayload, setAuthPayload, setAuthProfile);
        navigate("/flux");
      })
      .catch((err) => {
        console.log(err);
        setFormError2("Validation impossible.");
      });
  };

  return (
    <BasePage style={{ display: "flex", justifyContent: "center" }}>
      <UnauthentifiedRedirection to="/flux" />
      <ValidRedirection to="/flux" />
      <div
        style={{
          width: "100%",
          height: "auto",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "640px",
            height: "auto",
            border: "1px solid #BABABA",
            borderRadius: "20px",
            marginTop: "90px",
            padding: "40px",
            backgroundColor: "#F2F2F2",
            overflow: "hidden",
          }}
        >
          <h2 style={{ textAlign: "center", marginTop: "-20px" }}>
            Validation
          </h2>
          <Form>
            <div className="mb-3">
              <br />
              <h5>Mode de reception</h5>
              <Form.Check
                inline
                label="E-mail"
                name="mode"
                type="radio"
                onInput={(e) => setMode(0)}
                defaultChecked={true}
              />
              <Form.Check
                inline
                label="SMS"
                name="mode"
                type="radio"
                onInput={(e) => setMode(1)}
              />
              <br />
              <br />
              <Button onClick={sendCode}>Envoyer le code</Button>
              <p className="form-error-label" style={{ marginTop: "10px" }}>
                {formError1}
              </p>
              <h5>J'ai reçu mon code</h5>
              <Form.Group className="mb-3" controlId="formValidationCode">
                <Form.Control
                  type="text"
                  placeholder="Entrez ici le code de validation ..."
                  value={code}
                  onInput={(e) => setCode(e.target.value)}
                />
              </Form.Group>
              <Button onClick={validateCode}>Valider</Button>
              <br />
              <p className="form-error-label" style={{ marginTop: "10px" }}>
                {formError2}
              </p>
            </div>
          </Form>
        </div>
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

export default PageValidation;
