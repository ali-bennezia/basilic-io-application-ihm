//React & routage
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthentificationContext from "../../contexts/AuthentificationContext";

//Componsantes packages:
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Reaptcha from "reaptcha";

//Configuration:
import config from "../../config/config.json";
import privateConfig from "../../config/privateConfig.json";

//Packages & utilitaires:
import {
  validateEmail,
  validateUsername,
  validatePhoneNumber,
  validatePassword,
  getValidationErrorMessage,
} from "../../utils/validation";

import { generatePayloadFromSessionData } from "../../utils/authentification";
import { AuthentifiedRedirection } from "../redirection/AuthentifiedRedirection";

import axios from "axios";

//Style
import "./commun/PagesCommun.css";

function PageConnexion() {
  //Ref
  const captchaRef = useRef();

  //Contexte d'authentification:
  const authContextProps = useContext(AuthentificationContext);

  //Navigation:
  const navigate = useNavigate();

  //Variables d'état:
  //Valeurs du formulaire:
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //Booléenne qui indique si le boutton confirmé est activé ou non.
  const [canConfirm, setCanConfirm] = useState(false);

  //Valeurs de la validation du formulaire:
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formError, setFormError] = useState("");

  //Réponse captcha
  const [captchaValue, setCaptchaValue] = useState("");

  //Callbacks:
  const onClickAnnuler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onClickConfirmer = (e) => {
    e.preventDefault();

    if (!canConfirm) return;

    updateConfirmButtonAccess(false);
    axios
      .post(`${config.applicationServerURL}users/signin`, {
        nomUtilisateur: username,
        motDePasse: password,
        captcha: captchaValue,
      })
      .then((data) => {
        updateConfirmButtonAccess(true);
        setFormError("");
        authContextProps.setAuthPayload(
          generatePayloadFromSessionData(data.data, rememberMe)
        );
        navigate("/flux");
      })
      .catch((err) => {
        captchaRef.current.reset();
        switch (err.response.data) {
          case "Unprocessable Entity":
            setFormError("Vérification incorrecte.");
            break;
          case "Bad Request":
          case "Incorrect Password":
          case "Not Found":
            setFormError("Nom d'utilisateur et/ou mot de passe incorrect(es).");
            break;
          default:
            setFormError("Erreur interne.");
            break;
        }
        console.log(err);
        updateConfirmButtonAccess(true);
      });
  };

  const checkValidation = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "Username":
        let usernameValidationResult = validateUsername(fieldValue);
        setUsernameError(
          usernameValidationResult.result || fieldValue.length == 0
            ? ""
            : getValidationErrorMessage(usernameValidationResult.err)
        );
        break;
      case "Password":
        let passwordValidationResult = validatePassword(fieldValue);
        setPasswordError(
          passwordValidationResult.result || fieldValue.length == 0
            ? ""
            : getValidationErrorMessage(passwordValidationResult.err)
        );
        break;
      default:
        break;
    }
  };

  //Mise a jour de l'état du boutton de confirmation. (Actif/Inactif)
  const updateConfirmButtonAccess = (state = true) => {
    let fullValidation =
      usernameError === passwordError &&
      passwordError === "" &&
      username !== "" &&
      password !== "";
    setCanConfirm((val) => fullValidation && state == true);
  };

  //Lien callback mise à jour du boutton à chaque input.

  useEffect(updateConfirmButtonAccess, [username, password]);

  //Chargement initialisation.

  useEffect(() => {}, []);

  return (
    <div
      className="main-page-organizer"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AuthentifiedRedirection to="/flux" />
      <img
        src="/img/basilic_titre_mid_res.png"
        id="main-page-title-img"
        alt="Basilic"
      />
      <div className="form-container">
        <Form className="basic-form" onSubmit={onClickConfirmer}>
          <h2>Connexion</h2>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez ici votre nom d'utilisateur..."
              value={username}
              onInput={(e) => {
                setUsername((val) => e.target.value);
                checkValidation("Username", e.target.value);
              }}
            />
            <Form.Text className="form-error-label">{usernameError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez ici votre mot de passe..."
              value={password}
              onInput={(e) => {
                setPassword((val) => e.target.value);
                checkValidation("Password", e.target.value);
              }}
            />
            <Form.Text className="form-error-label">{passwordError}</Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formRememberMe"
            style={{ display: "inline-block" }}
          >
            <Form.Check
              type="checkbox"
              label="Rester connecté(e)"
              defaultChecked={rememberMe}
              onInput={(e) => {
                setRememberMe((val) => e.target.checked);
              }}
              style={{ display: "inline-block" }}
            />
          </Form.Group>
          <Link to="/oubli">
            <p
              style={{ display: "inline-block", float: "right" }}
              className="text-link"
            >
              Mot de passe oublié ?
            </p>
          </Link>

          <Button variant="secondary" onClick={onClickAnnuler}>
            Annuler
          </Button>
          <Button variant="primary" disabled={!canConfirm} type="submit">
            Confirmer
          </Button>
          <Reaptcha
            sitekey={privateConfig.captchaSiteKey}
            onVerify={(val) => {
              setCaptchaValue(val);
            }}
            ref={captchaRef}
          />
          <p className="form-error-label">{formError}</p>
        </Form>
      </div>
    </div>
  );
}

export default PageConnexion;
