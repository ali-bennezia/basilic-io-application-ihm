import React, { useEffect, useContext, useState } from "react";
import EnTeteProfil from "./EnTeteProfil";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "./../commun/BasePage";

import { UnauthentifiedRedirection } from "./../../redirection/AuthentifiedRedirection";
import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";
import BoiteDialogue from "../commun/dialogue/BoiteDialogue";

import MultiFluxPosts from "../contenu/MultiFluxPosts";

import MoonLoader from "react-spinners/MoonLoader";
import { EntypoCircleWithCross } from "react-entypo";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./../commun/PagesCommun.css";
import config from "./../../../config/config.json";

import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import SelectionneurMedias from "../contenu/medias/SelectionneurMedias";

import { PageState } from "./../../../utils/utils.js";

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

  //Variables d'état.
  const [pageState, setPageState] = useState(PageState.Loading);
  const [profileContent, setProfileContent] = useState(<></>);

  const [viewedAuthProfile, setViewedAuthProfile] = useState(null);
  const [isSelf, setIsSelf] = useState(true);

  const [messageBoxIsOpen, setMessageBoxIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  const [msgDlgMedias, setMsgDlgMedias] = useState([]);

  //Callback pour l'envoi de message.
  const onClickSendMessage = (e) => {
    e.preventDefault();

    let formData = new FormData();

    let data = { contenu: message, cibleUserId: viewedAuthProfile.id };

    formData.append("data", JSON.stringify(data));
    for (let m of msgDlgMedias) formData.append("medias", m);

    axios
      .post(
        `${config.applicationServerURL}messages/conversations/messages/post`,
        formData,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        setFormNotificationMessage("Message envoyé avec succès.");
        setFormNotificationOpen(true);
        setMessageBoxIsOpen(false);

        setMessage("");
        setMsgDlgMedias([]);
      })
      .catch((err) => {
        console.log(err);
        setFormNotificationMessage("Erreur. Envoi du message impossible.");
        setFormNotificationOpen(true);
        setMessageBoxIsOpen(false);
      });
  };

  //Callback récupération de posts.
  const fetch = (nature) => {
    const viewedUserId = userId
      ? userId
      : authProfile && "id" in authProfile
      ? authProfile.id
      : null;

    return axios.get(
      `${config.applicationServerURL}profiles/posts/${viewedUserId}&${nature}&10`,
      {
        headers:
          authPayload != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );
  };

  const fetchMore = (nature, timestamp) => {
    const viewedUserId = userId
      ? userId
      : authProfile && "id" in authProfile
      ? authProfile.id
      : null;

    return axios.get(
      `${config.applicationServerURL}profiles/posts/${viewedUserId}&${nature}&${timestamp}&10`,
      { headers: { authorization: `Bearer ${authPayload.token}` } }
    );
  };

  const fetchPostsPromise = () => fetch(0);
  const fetchMorePostsPromise = (timestamp) => fetchMore(0, timestamp);

  const fetchMediaPostsPromise = () => fetch(1);
  const fetchMoreMediaPostsPromise = (timestamp) => fetchMore(1, timestamp);

  const fetchResponsePostsPromise = () => fetch(2);
  const fetchMoreResponsePostsPromise = (timestamp) => fetchMore(2, timestamp);

  const initPage = () => {
    const viewedUserId = userId
      ? userId
      : authProfile && "id" in authProfile
      ? authProfile.id
      : null;

    if (viewedUserId == null) {
      navigate("/flux");
      return;
    }

    setIsSelf(authProfile != null && viewedUserId == authProfile.id);

    let cfg = {};
    if (authPayload != null)
      cfg.headers = { authorization: `Bearer ${authPayload.token}` };

    axios
      .get(`${config.applicationServerURL}profiles/get/${viewedUserId}`, cfg)
      .then((data) => {
        setPageState(
          "profilPublic" in data.data &&
            "domaineVisible" in data.data &&
            data.data.domaineVisible === false
            ? PageState.Private
            : PageState.Visible
        );
        setViewedAuthProfile(data.data);
      })
      .catch((err) => {
        console.log(err);
        setPageState(PageState.Error);
        setViewedAuthProfile(null);
      });
  };

  //Initialisation de la page.
  useEffect(initPage, []);
  useEffect(initPage, [userId]);

  const updateProfileContent = () => {
    switch (pageState) {
      case PageState.Loading:
        setProfileContent(
          <div style={{ marginTop: "260px" }}>
            <MoonLoader color="green" />
          </div>
        );
        break;
      case PageState.Private:
        setProfileContent(<p>Profil privé</p>);
        break;
      case PageState.Visible:
        setProfileContent(
          <>
            <EnTeteProfil
              profile={viewedAuthProfile}
              setFormNotificationOpen={setFormNotificationOpen}
              setFormNotificationMessage={setFormNotificationMessage}
              setViewedAuthProfile={setViewedAuthProfile}
              setMessageBoxIsOpen={setMessageBoxIsOpen}
            />
            <MultiFluxPosts
              tabs={[
                {
                  name: "Posts",
                  propsFlux: {
                    showPostField: false,
                    setFormNotificationOpen: setFormNotificationOpen,
                    setFormNotificationMessage: setFormNotificationMessage,
                    fetchPostsPromise: fetchPostsPromise,
                    fetchMorePostsPromise: fetchMorePostsPromise,
                  },
                },
                {
                  name: "Médias",
                  propsFlux: {
                    showPostField: false,
                    setFormNotificationOpen: setFormNotificationOpen,
                    setFormNotificationMessage: setFormNotificationMessage,
                    fetchPostsPromise: fetchMediaPostsPromise,
                    fetchMorePostsPromise: fetchMoreMediaPostsPromise,
                  },
                },
                {
                  name: "Réponses",
                  propsFlux: {
                    showPostField: false,
                    setFormNotificationOpen: setFormNotificationOpen,
                    setFormNotificationMessage: setFormNotificationMessage,
                    fetchPostsPromise: fetchResponsePostsPromise,
                    fetchMorePostsPromise: fetchMoreResponsePostsPromise,
                  },
                },
              ]}
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
      <div
        style={{
          width: "100%",
          height: "auto",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
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
        style={{ height: "auto" }}
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
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              variant="primary"
              type="submit"
              onClick={onClickSendMessage}
              style={{ height: "39px" }}
            >
              Envoyer
            </Button>
            <SelectionneurMedias
              setFormNotificationMessage={setFormNotificationMessage}
              setFormNotificationOpen={setFormNotificationOpen}
              medias={msgDlgMedias}
              setMedias={setMsgDlgMedias}
            />{" "}
          </span>
          <p className="form-error-label">{formError}</p>
        </Form>
      </BoiteDialogue>
    </BasePage>
  );
}

export default PageProfil;
