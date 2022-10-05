//React & routeur.
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

//Composantes.
import { AuthentifiedRedirection } from "../redirection/AuthentifiedRedirection";

//Composantes packages.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Packages et utilitaires.
import axios from "axios";
import config from "../../config/config.json";
import {
  validateEmail,
  validateUsername,
  validatePhoneNumber,
} from "../../utils/validation";

//Style
import "./commun/PagesCommun.css";

function PageOubli() {
  //Variables d'état.
  const [infoSelect, setInfoSelect] = useState("1");

  const [infoLabel, setInfoLabel] = useState("Nom d'utilisateur");
  const [infoPlaceholder, setInfoPlaceholder] = useState(
    "Entrez ici votre nom d'utilisateur ..."
  );
  const [infoValue, setInfoValue] = useState("");
  const [infoValidation, setInfoValidation] = useState({ result: false });
  const [infoValidationResult, setInfoValidationResult] = useState(false);
  const [infoError, setInfoError] = useState("");

  const [meanState, setMeanState] = useState(true); //False = SMS, sinon E-mail.

  const [smsCode, setSMSCode] = useState("");

  const [fetching, setFetching] = useState(false);
  const [showPostSendMessage, setShowPostSendMessage] = useState(false);

  //Navigate.
  const navigate = useNavigate();

  //Callbacks.
  const requestSendCode = () => {
    setFetching(true);

    let infoArr = ["nomUtilisateur", "numeroTelephone", "email"];
    let body = {};
    body[infoArr[parseInt(infoSelect) - 1]] = infoValue;

    axios
      .post(
        `${config.applicationServerURL}auth/recpwd/send&${
          meanState === true ? 0 : 1
        }`,
        body
      )
      .then((data) => {
        setFetching(false);
        setShowPostSendMessage(true);
      })
      .catch((err) => {
        setInfoError("Confirmation du code impossible.");
        setFetching(false);
      });
  };

  const requestProcessSMSCode = () => {
    navigate(`/entree/${parseInt(infoSelect) - 1}&${infoValue}&${smsCode}`);
  };

  const refreshValidationData = () => {
    switch (infoSelect) {
      case "1":
        setInfoValidation(validateUsername(infoValue));
        break;
      case "2":
        setInfoValidation(validatePhoneNumber(infoValue));
        break;
      default:
        setInfoValidation(validateEmail(infoValue));
        break;
    }
  };

  //Effets.
  useEffect(
    (e) => {
      switch (infoSelect) {
        case "1":
          setInfoLabel("Nom d'utilisateur");
          setInfoPlaceholder("Entrez ici votre nom d'utilisateur ...");
          break;
        case "2":
          setInfoLabel("Numéro de téléphone");
          setInfoPlaceholder("Entrez ici votre numéro de téléphone ...");
          break;
        default:
          setInfoLabel("Adresse e-mail");
          setInfoPlaceholder("Entrez ici votre adresse e-mail ...");
          break;
      }
      refreshValidationData();
    },
    [infoSelect]
  );

  useEffect(refreshValidationData, [infoValue]);

  useEffect(() => {
    setInfoValidationResult(infoValidation.result);
  }, [infoValidation]);

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
        {showPostSendMessage ? (
          <>
            {" "}
            <h2>Mot de passe oublié</h2>
            <br />
            {meanState === true ? (
              <p>
                Vous devriez d'ici peu recevoir votre lien de confirmation via
                e-mail.
              </p>
            ) : (
              <Form
                className="basic-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  requestProcessSMSCode();
                }}
              >
                <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
                  <Form.Label>Code SMS recu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le code recu ..."
                    onInput={(e) => {
                      setSMSCode(e.target.value);
                    }}
                    value={smsCode}
                  />
                  <Form.Text className="form-error-label">{}</Form.Text>
                </Form.Group>

                <Button
                  variant="secondary"
                  onClick={(e) => {
                    navigate("/connexion");
                  }}
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={smsCode.length === 0}
                >
                  Confirmer
                </Button>
              </Form>
            )}
          </>
        ) : (
          <Form
            className="basic-form"
            onSubmit={(e) => {
              e.preventDefault();
              requestSendCode();
            }}
          >
            <h2>Mot de passe oublié</h2>

            <p>
              Selectionnez une information afin de pouvoir identifier votre
              compte, choisissez où recevoir le code, puis cliquez sur
              Confirmer.
              <br />
              <br />
              Si les informations sont correctes, vous devriez recevoir un code
              par le moyen spécifié (SMS/E-mail).
            </p>

            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Label>Identifier mon compte par</Form.Label>
              <Form.Select
                value={infoSelect}
                onChange={(e) => {
                  setInfoSelect(e.target.value);
                }}
              >
                <option>Sélectionnez une option</option>
                <option value="1">Mon nom d'utilisateur</option>
                <option value="2">Mon numéro de téléphone</option>
                <option value="3">Mon adresse e-mail</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
              <Form.Label>{infoLabel}</Form.Label>
              <Form.Control
                type="text"
                placeholder={infoPlaceholder}
                onInput={(e) => {
                  setInfoValue(e.target.value);
                }}
                value={infoValue}
              />
              <Form.Text className="form-error-label">{}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Recevoir le code par</Form.Label>
              <br />
              <Form.Check
                inline
                label="SMS"
                type="radio"
                name="mean"
                checked={!meanState}
                onChange={(e) => {
                  setMeanState(false);
                }}
              />
              <Form.Check
                inline
                label="E-mail"
                type="radio"
                name="mean"
                checked={meanState === true}
                onChange={(e) => {
                  setMeanState(true);
                }}
              />
            </Form.Group>
            <br />

            <Button
              variant="secondary"
              onClick={(e) => {
                navigate("/connexion");
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={fetching || !infoValidationResult}
            >
              Confirmer
            </Button>
            <div
              className="alert alert-danger"
              role="alert"
              style={{ padding: "4px" }}
              hidden={infoError == ""}
            >
              {infoError}
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default PageOubli;
