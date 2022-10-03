import React, { useState, useEffect, useContext } from "react";
import BasePage from "./commun/BasePage";
import Post from "./contenu/Post";
import FluxPosts from "./contenu/FluxPosts";

import AuthentificationContext from "../../contexts/AuthentificationContext";

import { useParams, useNavigate } from "react-router-dom";

import MoonLoader from "react-spinners/MoonLoader";
import Button from "react-bootstrap/Button";

import { EntypoArrowLeft, EntypoCircleWithCross } from "react-entypo";

import { Snackbar } from "@mui/material";

import config from "./../../config/config.json";
import axios from "axios";

const PostState = {
  Loading: 0,
  Visible: 1,
  Private: 2,
  Error: 3,
};

function PagePost() {
  //Hook de navigation.
  const navigate = useNavigate();

  //Paramètres d'URL.
  const { postId } = useParams();

  //Variables de contexte.
  const { authProfile, authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [pageState, setPageState] = useState(PostState.Loading);
  const [pageContent, setPageContent] = useState(null);

  //Variables d'état pour la gestion des données du post.
  const [postData, setPostData] = useState(null);

  //Variables d'état pour la gestion de l'affichage de médias.
  const [mediaDlgIsOpen, setMediaDlgIsOpen] = useState(false);
  const [mediaDlgSrc, setMediaDlgSrc] = useState("");
  const [mediaDlgIsVdo, setMediaDlgIsVdo] = useState(false);

  //Variables d'état pour le contrôle de la Snackbar.
  const [sbarIsOpen, setSbarIsOpen] = useState(false);
  const [sbarMsg, setSbarMsg] = useState("");

  //Fonctions et callbacks.
  const fetchContent = () => {
    axios
      .get(`${config.applicationServerURL}posts/get/${postId}`)
      .then((data) => {
        setPageState(PostState.Visible);
        setPostData(data.data);

        updatePageContent(PostState.Visible, data.data);
      })
      .catch((err) => {
        let newState =
          err.response.status === 403 ? PostState.Private : PostState.Error;
        setPageState(newState);
        setPostData(null);

        updatePageContent(newState, null);
      });
  };

  const fetch = () => {
    return axios.get(
      `${config.applicationServerURL}posts/responses/${postId}&10`,
      {
        headers:
          authPayload != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );
  };

  const fetchMore = (timestamp) => {
    return axios.get(
      `${config.applicationServerURL}posts/responses/${postId}&10&${timestamp}`,
      {
        headers:
          authPayload != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );
  };

  const updatePageContent = (newState = pageState, newPostData = postData) => {
    let pageContent = null;
    switch (newState) {
      case PostState.Loading:
        pageContent = (
          <span
            style={{
              position: "relative",
              right: "150px",
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <MoonLoader color="green" />
          </span>
        );
        break;

      case PostState.Visible:
        pageContent = (
          <>
            <Button
              className="standard-button"
              style={{
                width: "250px",
                height: "42px",
                padding: "0",
                marginBottom: "140px",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <EntypoArrowLeft
                style={{ fontSize: "30px", marginRight: "10px" }}
              />
              Retour
            </Button>
            <Post
              postData={newPostData}
              postResponses={false}
              setMediaDialogueIsOpen={setMediaDlgIsOpen}
              setMediaDialogueSource={setMediaDlgSrc}
              setMediaDialogueIsVideo={setMediaDlgIsVdo}
            />
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              {newPostData.reponse} Réponse{newPostData.reponse == 1 ? "" : "s"}
            </p>
            <FluxPosts
              showPostField={true}
              fetchPostsPromise={fetch}
              fetchMorePostsPromise={fetchMore}
              setFormNotificationOpen={setSbarIsOpen}
              setFormNotificationMessage={setSbarMsg}
              style={{ marginTop: "100px" }}
              loadMoreMsg="Charger plus de réponses"
              idPostCible={postId}
            />
          </>
        );
        break;

      case PostState.Private:
        pageContent = (
          <span
            style={{
              position: "relative",
              right: "150px",
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p style={{ fontWeight: "bold", color: "grey" }}>
              Ce contenu est privé.
            </p>
            <Button
              className="standard-button"
              style={{ width: "250px", height: "42px", padding: "0" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <EntypoArrowLeft
                style={{ fontSize: "30px", marginRight: "10px" }}
              />
              Retour
            </Button>
          </span>
        );

      case PostState.Error:
        pageContent = (
          <span
            style={{
              position: "relative",
              right: "150px",
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontWeight: "bold", color: "grey" }}>
              Erreur. Le contenu auquel vous tentez d'accéder est impossible à
              charger.
            </p>
            <EntypoCircleWithCross
              style={{
                textAlign: "center",
                fontSize: "48px",
                color: "red",
                filter: "drop-shadow(0px 0px 1px black)",
              }}
            />
            <Button
              className="standard-button"
              style={{
                width: "250px",
                height: "42px",
                padding: "0",
                marginTop: "20px",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <EntypoArrowLeft
                style={{ fontSize: "30px", marginRight: "10px" }}
              />
              Retour
            </Button>
          </span>
        );
        break;
      default:
        pageContent = null;
        break;
    }
    setPageContent(pageContent);
  };

  useEffect(fetchContent, [postId]);

  //Initialisation.
  useEffect(fetchContent, []);

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
          paddingTop: "100px",
        }}
      >
        {pageContent}
      </div>
      <Snackbar
        open={sbarIsOpen}
        onClose={(e) => {
          setSbarIsOpen(false);
        }}
        autoHideDuration={6000}
        message={sbarMsg}
      />
    </BasePage>
  );
}

export default PagePost;
