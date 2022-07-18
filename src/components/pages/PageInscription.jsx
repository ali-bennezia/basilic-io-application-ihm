import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import BasePage from "./BasePage";

import "./PagesCommun.css";

//Utilitaires:
import {
  validateEmail,
  validateUsername,
  validatePhoneNumber,
  getValidationErrorMessage,
} from "./../../utils/validation";

function PageInscription() {
  //Navigation:
  const navigate = useNavigate();

  //Variables d'état:
  //Valeurs du formulaire:
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [canConfirm, setCanConfirm] = useState(false);

  //Valeurs de la validation du formulaire:
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //Callbacks:
  const onClickAnnuler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onClickConfirmer = (e) => {
    e.preventDefault();

    //TODO: Appel AJAX API d'inscription:

    navigate("/connexion");
  };

  const checkValidation = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "Email":
        let emailValidationResult = validateEmail(fieldValue);
        setEmailError(
          emailValidationResult.result || fieldValue.length == 0
            ? ""
            : getValidationErrorMessage(emailValidationResult.err)
        );
        break;
      case "PhoneNumber":
        let phoneNumberValidationResult = validatePhoneNumber(fieldValue);
        setPhoneNumberError(
          phoneNumberValidationResult.result || fieldValue.length == 0
            ? ""
            : getValidationErrorMessage(phoneNumberValidationResult.err)
        );
        break;
      case "Username":
        let usernameValidationResult = validateUsername(fieldValue);
        setUsernameError(
          usernameValidationResult.result || fieldValue.length == 0
            ? ""
            : getValidationErrorMessage(usernameValidationResult.err)
        );
        break;
      case "Password":
        break;
      case "ConfirmPassword":
        break;
      default:
        break;
    }
  };

  return (
    /*<BasePage
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >*/
    <div
      className="main-page-organizer"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="img/basilic_titre_mid_res.png"
        id="main-page-title-img"
        alt="Basilic"
      />
      <div className="form-container">
        <Form className="basic-form">
          <h2>Inscription</h2>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez ici votre adresse e-mail..."
              value={email}
              onInput={(e) => {
                setEmail((val) => e.target.value);
                checkValidation("Email", e.target.value);
              }}
            />
            <Form.Text className="form-error-label">{emailError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Entrez ici votre numéro de téléphone..."
              value={phoneNumber}
              onInput={(e) => {
                setPhoneNumber((val) => e.target.value);
                checkValidation("PhoneNumber", e.target.value);
              }}
            />
            <Form.Text className="form-error-label">
              {phoneNumberError}
            </Form.Text>
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez ici votre mot de passe une seconde fois..."
              value={confirmPassword}
              onInput={(e) => {
                setConfirmPassword((val) => e.target.value);
                checkValidation("ConfirmPassword", e.target.value);
              }}
            />
            <Form.Text className="form-error-label">
              {confirmPasswordError}
            </Form.Text>
          </Form.Group>

          <Button variant="secondary" type="submit" onClick={onClickAnnuler}>
            Annuler
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={onClickConfirmer}
            disabled={!canConfirm}
          >
            Confirmer
          </Button>
        </Form>
      </div>
    </div> //</BasePage>
  );
}

export default PageInscription;
