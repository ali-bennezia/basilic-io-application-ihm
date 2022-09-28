import React, { useState, useEffect } from "react";
import { useContext } from "react";

import { useParams } from "react-router-dom";

import "./BlockConversation";
import BasePage from "../commun/BasePage";
import AuthentificationContext from "../../../contexts/AuthentificationContext";

import "./../commun/PagesCommun.css";

import axios from "axios";
import config from "../../../config/config.json";

import { MoonLoader } from "react-spinners";
import Snackbar from "@mui/material/Snackbar";

import Button from "react-bootstrap/Button";
import { EntypoCcw } from "react-entypo";

import { PageState } from "./../../../utils/utils.js";
import AfficheurInterlocuteur from "./AfficheurInterlocuteur";
import ConvoMessage from "./ConvoMessage";
import ChampMessage from "./ChampMessage";

import MediaDialogue from "./../commun/dialogue/MediaDialogue";

const titleTextStyle = { display: "inline-block", fontSize: "24px" };

function PageConversation() {
  //Paramètres d'URL.
  const { userIdA, userIdB } = useParams();

  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [pageState, setPageState] = useState(PageState.Loading);

  const [userProfile, setUserProfile] = useState(null);
  const [partnerProfile, setPartnerProfile] = useState(null);

  const [messages, setMessages] = useState([]);

  const [latestMessageTimestamp, setLatestMessageTimestamp] = useState(null);

  const [isSbOpen, setIsSbOpen] = useState(false);
  const [sbMessage, setSbMessage] = useState("");

  const [fetchingNewerMessages, setFetchingNewerMessages] = useState(true);

  const [mediaDialogueIsOpen, setMediaDialogueIsOpen] = useState(false);
  const [mediaDialogueIsVideo, setMediaDialogueIsVideo] = useState(false);
  const [mediaDialogueSource, setMediaDialogueSource] = useState("");
  const [mediaDialogueIsPrivate, setMediaDialogueIsPrivate] = useState(false);

  //Fonctions et callbacks.
  const loadMoreMessages = () => {
    if (fetchingNewerMessages === true || latestMessageTimestamp === null)
      return;
    setFetchingNewerMessages(true);

    let promise = axios
      .get(
        `${config.applicationServerURL}messages/conversations/messages/get/${userIdA}&${userIdB}&10&${latestMessageTimestamp}`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        processOldMessages(data.data);
        setFetchingNewerMessages(false);
      })
      .catch((err) => {
        console.log(err);
        setSbMessage("Impossible de charger plus de messages.");
        setIsSbOpen(true);
        setFetchingNewerMessages(false);
      });
  };

  const processOldMessages = (msgs) => {
    if (msgs.length == 0) return;
    let newestReceivedId = msgs[0]._id;
    let oldestKnownId = messages.length > 0 ? messages[0]._id : null;

    if (newestReceivedId === oldestKnownId) msgs.shift();

    if (msgs.length > 0)
      setLatestMessageTimestamp(msgs[msgs.length - 1].createdAt);

    setMessages([...msgs.reverse(), ...messages]);
  };

  const processNewMessages = (msgs) => {
    if (msgs.length === 0) return;
    if (messages.length === 0) {
      setLatestMessageTimestamp(msgs[msgs.length - 1].createdAt);
    }

    setMessages([...messages, ...msgs.reverse()]);
  };

  const fetchProfile = (id, setter) => {
    axios
      .get(`${config.applicationServerURL}profiles/get/${id}`, {
        headers: { authorization: `Bearer ${authPayload.token}` },
      })
      .then((data) => {
        setter(data.data);
        setPageState(PageState.Visible);
        setFetchingNewerMessages(false);
      })
      .catch((err) => {
        console.log(err);
        setPageState(PageState.Error);
      });
  };

  const fetchContent = () => {
    let promise = axios
      .get(
        `${config.applicationServerURL}messages/conversations/messages/get/${userIdA}&${userIdB}&10`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        let userIdASetter =
            userIdA === authPayload.userId ? setUserProfile : setPartnerProfile,
          userIdBSetter =
            userIdB === authPayload.userId ? setUserProfile : setPartnerProfile;

        fetchProfile(userIdA, userIdASetter);
        fetchProfile(userIdB, userIdBSetter);

        processOldMessages(data.data);
      })
      .catch((err) => {
        console.log(err);
        setPageState(PageState.Error);
      });
  };

  //Initialisation.
  useEffect(fetchContent, []);

  return (
    <BasePage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      frameStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="page-title" style={{ marginTop: "26px" }}>
        Conversation
      </h1>
      <div
        className="inner-page-container"
        style={{
          marginTop: "40px",
          width: "70%",
          paddingBottom: "0px",
          marginBottom: "50px",
          height: "auto",
        }}
      >
        {(() => {
          switch (pageState) {
            case PageState.Loading:
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "50px",
                  }}
                >
                  <MoonLoader color="green" />
                </div>
              );
            case PageState.Error:
              return (
                <p
                  style={{
                    textAlign: "center",
                    color: "grey",
                    fontStyle: "italic",
                    padding: "50px",
                  }}
                >
                  Erreur. Chargement impossible.
                </p>
              );
            case PageState.Visible:
              return userProfile != null && partnerProfile != null ? (
                <>
                  <AfficheurInterlocuteur
                    profile={partnerProfile}
                    float="right"
                  />
                  <div
                    style={{
                      marginTop: "120px",
                      maxHeight: "800px",
                      overflowY: "auto",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        className="standard-button"
                        hidden={fetchingNewerMessages}
                        onClick={(e) => {
                          loadMoreMessages();
                        }}
                        disabled={fetchingNewerMessages}
                        style={{ boxShadow: "none" }}
                      >
                        {" "}
                        <EntypoCcw
                          style={{
                            fontSize: "20px",
                            marginTop: "5px",
                            marginRight: "6px",
                          }}
                        />{" "}
                        Charger plus de messages
                      </Button>

                      {fetchingNewerMessages ? (
                        <MoonLoader color="green" />
                      ) : null}
                    </span>

                    {messages.map((el, i) => {
                      return (
                        <ConvoMessage
                          messageData={el}
                          key={i}
                          username={
                            el.auteur === userProfile.id
                              ? userProfile.nomPublic ||
                                userProfile.nomUtilisateur
                              : partnerProfile.nomPublic ||
                                partnerProfile.nomUtilisateur
                          }
                          setMediaDialogueIsOpen={setMediaDialogueIsOpen}
                          setMediaDialogueIsVideo={setMediaDialogueIsVideo}
                          setMediaDialogueSource={setMediaDialogueSource}
                          setMediaDialogueIsPrivate={setMediaDialogueIsPrivate}
                        />
                      );
                    })}
                  </div>

                  <ChampMessage
                    setFormNotificationOpen={setIsSbOpen}
                    setFormNotificationMessage={setSbMessage}
                    idCible={partnerProfile.id}
                    style={{
                      width: "100%",
                      marginLeft: "25px",
                      marginRight: "0px",
                      marginTop: "50px",
                    }}
                    onSent={(newMsg) => {
                      processNewMessages([newMsg]);
                    }}
                  />
                </>
              ) : null;
          }
        })()}
      </div>{" "}
      <Snackbar
        open={isSbOpen}
        onClose={(e) => {
          setIsSbOpen(false);
        }}
        autoHideDuration={6000}
        message={sbMessage}
      />
      <MediaDialogue
        isVideo={mediaDialogueIsVideo}
        src={mediaDialogueSource}
        isOpen={mediaDialogueIsOpen}
        setIsOpen={setMediaDialogueIsOpen}
        isPrivate={mediaDialogueIsPrivate}
      />
    </BasePage>
  );
}

export default PageConversation;
