//React & routeur.
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//Composantes.
import { AuthentifiedRedirection } from "../redirection/AuthentifiedRedirection";

//Composantes packages.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Packages et utilitaires.
import axios from "axios";
import config from "../../config/config.json";

//Style
import "./commun/PagesCommun.css";

function PageClee() {
  //Params.
  const { identifierType, identifier, code } = useParams();

  //Variables d'état.
  const [formError, setFormError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isAFieldEmpty, setIsAFieldEmpty] = useState(true);
  const [doPasswordFieldsCheck, setDoPasswordFieldsCheck] = useState(false);

  const [fetching, setFetching] = useState(false);
  const [successState, setSuccessState] = useState(false);

  //Navigate.
  const navigate = useNavigate();

  //Callbacks.
  const sendRequest = () => {
    setFetching(true);
    axios
      .post(
        `${config.applicationServerURL}auth/recpwd/reinit/${identifierType}&${identifier}&${code}`,
        { newPassword: confirmPassword }
      )
      .then((data) => {
        setFetching(false);
        setSuccessState(true);
      })
      .catch((err) => {
        setFetching(false);
        setFormError("Erreur. Réinitialisation impossible.");
      });
  };

  //Effets.
  useEffect(() => {
    setIsAFieldEmpty(password.trim() === "" || confirmPassword.trim() === "");
  }, [password, confirmPassword]);

  useEffect(() => {
    setDoPasswordFieldsCheck(password === confirmPassword);
  }, [password, confirmPassword]);

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
        <h2>Réinitialisation</h2>

        {successState ? (
          <>
            <p>
              <br />
              Votre mot de passe a été réinitialisé avec succès.
              <br />
              Vous pouvez dès maintenant vous connecter à l'aide
              <br />
              de votre nouveau mot de passe.
            </p>
            <br />
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  navigate("/connexion");
                }}
                className="standard-button"
                style={{ boxShadow: "none" }}
              >
                Aller à la page de connexion
              </Button>
            </span>
          </>
        ) : (
          <Form
            className="basic-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendRequest();
            }}
          >
            <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe ..."
                value={password}
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
              <Form.Label>Confirmation du nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmez votre mot de passe ..."
                value={confirmPassword}
                onInput={(e) => {
                  setConfirmPassword(e.target.value);
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
              disabled={isAFieldEmpty || !doPasswordFieldsCheck || fetching}
            >
              Confirmer
            </Button>
            <div
              className="alert alert-danger"
              role="alert"
              style={{ padding: "4px" }}
              hidden={formError == ""}
            >
              {formError}
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default PageClee;
