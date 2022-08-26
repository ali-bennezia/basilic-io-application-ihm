import React, { useEffect, useContext, useState } from "react";
import EnTeteProfil from "./EnTeteProfil";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "./../commun/BasePage";

import { UnauthentifiedRedirection } from "./../../redirection/AuthentifiedRedirection";
import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";
import BoiteDialogue from "../commun/dialogue/BoiteDialogue";

import MoonLoader from "react-spinners/MoonLoader";
import { EntypoCircleWithCross } from "react-entypo";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./../commun/PagesCommun.css";
import config from "./../../../config/config.json";

import axios from "axios";

import Snackbar from "@mui/material/Snackbar";

const ProfileState = {
  Loading: 0,
  Visible: 1,
  Private: 2,
  Error: 3,
};

function PageProfil() {
  //Navigation.
  const navigate = useNavigate();

  //Paramètres d'URL.
  const { userId } = useParams();

  //Variables du contexte d'authentification.
  const {
    authPayload,
    setAuthPayload,
    authProfile,
    setAuthProfile,
    patchAuthProfile,
    logout,
  } = useContext(AuthentificationContext);

  //Variables.
  let viewedUserId = null;

  //Variables d'état.
  const [pageState, setPageState] = useState(ProfileState.Loading);
  const [profileContent, setProfileContent] = useState(<></>);
  const [viewedAuthProfile, setViewedAuthProfile] = useState(null);

  const [messageBoxIsOpen, setMessageBoxIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  //Callback pour l'envoi de message.
  const onClickSendMessage = (e) => {
    console.log("envoi");
  };

  //Initialisation de la page.
  useEffect(() => {
    viewedUserId = userId
      ? userId
      : authProfile && "id" in authProfile
      ? authProfile.id
      : null;

    if (viewedUserId == null) {
      navigate("/flux");
      return;
    }

    let cfg = {};
    if (authPayload != null)
      cfg.headers = { authorization: `Bearer ${authPayload.token}` };

    axios
      .get(`${config.applicationServerURL}profiles/get/${viewedUserId}`, cfg)
      .then((data) => {
        setPageState(
          "profilPublic" in data.data &&
            data.data.token.domaineVisible === false
            ? ProfileState.Private
            : ProfileState.Visible
        );
        setViewedAuthProfile(data.data);
      })
      .catch((err) => {
        console.log(err);
        setPageState(ProfileState.Error);
        setViewedAuthProfile(null);
      });
  }, []);

  const updateProfileContent = () => {
    switch (pageState) {
      case ProfileState.Loading:
        setProfileContent(
          <div style={{ marginTop: "260px" }}>
            <MoonLoader color="green" />
          </div>
        );
        break;
      case ProfileState.Private:
        setProfileContent(<p>Profil privé</p>);
        break;
      case ProfileState.Visible:
        setProfileContent(
          <>
            <EnTeteProfil
              profile={viewedAuthProfile}
              setFormNotificationOpen={setFormNotificationOpen}
              setFormNotificationMessage={setFormNotificationMessage}
              setViewedAuthProfile={setViewedAuthProfile}
              setMessageBoxIsOpen={setMessageBoxIsOpen}
            />
          </>
        );
        break;
      default:
        setProfileContent(
          <div
            className="inner-page-block"
            style={{
              height: "300px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Profil introuvable</h3>
            <p>
              Malheureusement, il est impossible de charger le profil auquel
              vous tentez d'accéder.
            </p>
            <br />
            <EntypoCircleWithCross
              style={{
                textAlign: "center",
                fontSize: "80px",
                color: "red",
                filter: "drop-shadow(0px 0px 1px black)",
              }}
            />
          </div>
        );
        break;
    }
  };

  useEffect(updateProfileContent, [pageState, viewedAuthProfile]);

  return (
    <BasePage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UnauthentifiedRedirection to="/connexion" />

      <div
        style={{
          width: "100%",
          height: "auto",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {profileContent}
      </div>
      <Snackbar
        open={formNotificationOpen}
        onClose={(e) => setFormNotificationOpen(false)}
        autoHideDuration={6000}
        message={formNotificationMessage}
      />
      <BoiteDialogue
        title="Envoyer un message"
        isOpen={messageBoxIsOpen}
        setIsOpen={setMessageBoxIsOpen}
      >
        <Form
          className="basic-form"
          style={{ width: "100%", marginTop: "-14px" }}
        >
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Entrez ici votre message..."
              value={message}
              onInput={(e) => {
                setMessage((val) => e.target.value);
              }}
              style={{ height: "186px" }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onClickSendMessage}>
            Envoyer
          </Button>
          <p className="form-error-label">{formError}</p>
        </Form>
      </BoiteDialogue>
    </BasePage>
  );
}

export default PageProfil;
