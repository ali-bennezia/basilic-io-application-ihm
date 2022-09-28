import React, { useState, useEffect } from "react";
import { useContext } from "react";

import "./BlockConversation";
import BasePage from "../commun/BasePage";
import AuthentificationContext from "../../../contexts/AuthentificationContext";

import "./../commun/PagesCommun.css";

import axios from "axios";
import config from "../../../config/config.json";

import "./PageMessages.css";
import BlockConversation from "./BlockConversation";

import { MoonLoader } from "react-spinners";
import { EntypoCcw } from "react-entypo";

import Button from "react-bootstrap/Button";

function PageMessages() {
  //Variables d'état.
  const [convos, setConvos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [oldestTimestamp, setOldestTimestamp] = useState(null);

  //Contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Callbacks et fonctions.
  const processNewConvos = (newConvos) => {
    if (
      newConvos.length > 0 &&
      convos.length > 0 &&
      convos[convos.length - 1].id === newConvos[0].id
    )
      newConvos.shift();

    setConvos([...convos, ...newConvos]);
    if (newConvos.length > 0)
      setOldestTimestamp(newConvos[newConvos.length - 1].lastSentMessageAt);
  };

  const fetchNewerConvos = () => {
    if (oldestTimestamp === null) return;
    setIsLoading(true);
    axios
      .get(
        `${config.applicationServerURL}messages/conversations/get/${authPayload.userId}&8&${oldestTimestamp}`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        console.log(data);
        processNewConvos(data.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  const fetchConvos = () => {
    if (oldestTimestamp != null) return;
    setIsLoading(true);
    axios
      .get(
        `${config.applicationServerURL}messages/conversations/get/${authPayload.userId}&8`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        processNewConvos(data.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  //Initialisation.
  useEffect(fetchConvos, []);

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
        Messages
      </h1>
      <div
        className="inner-page-container"
        style={{
          marginTop: "40px",
          width: "70%",
          minHeight: "500px",
          maxHeight: "65vh",
          height: "auto",
        }}
      >
        <div style={{ height: "100%", overflowY: "auto" }}>
          {" "}
          {isLoading ? (
            <span
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader color="green" />
            </span>
          ) : !error ? (
            <>
              {convos.map((el, i) => {
                return <BlockConversation key={i} convo={el} />;
              })}

              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "100px",
                }}
              >
                <Button
                  className="standard-button"
                  hidden={isLoading}
                  onClick={(e) => {
                    fetchNewerConvos();
                  }}
                  disabled={isLoading}
                  style={{ boxShadow: "none", height: "44px" }}
                >
                  {" "}
                  <EntypoCcw
                    style={{
                      fontSize: "20px",
                      marginTop: "5px",
                      marginRight: "6px",
                    }}
                  />{" "}
                  Charger plus de conversations
                </Button>

                {isLoading ? <MoonLoader color="green" /> : null}
              </span>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "grey",
                  verticalAlign: "center",
                  textAlign: "center",
                }}
              >
                Erreur. Chargement impossible.
              </p>
            </div>
          )}{" "}
        </div>
      </div>{" "}
    </BasePage>
  );
}

export default PageMessages;
