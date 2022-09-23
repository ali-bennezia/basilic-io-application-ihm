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

function PageMessages() {
  //Variables d'état.
  const [convos, setConvos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  //Contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Callbacks et fonctions.
  const fetchConvos = () => {
    axios
      .get(
        `${config.applicationServerURL}messages/conversations/get/${authPayload.userId}&10`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        setConvos(data.data);
        console.log(data.data);
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
