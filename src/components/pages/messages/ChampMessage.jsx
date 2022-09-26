import React, { useState, useContext } from "react";
import config from "./../../../config/config.json";
import SelectionneurMedias from "../contenu/medias/SelectionneurMedias";
import AuthentificationContext from "./../../../contexts/AuthentificationContext";

import { Form, Button } from "react-bootstrap";
import { EntypoChat } from "react-entypo";
import axios from "axios";

function ChampMessage({
  setFormNotificationOpen,
  setFormNotificationMessage,
  idCible = null,
  onSent = null,
  style = {},
}) {
  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [medias, setMedias] = useState([]);
  const [message, setMessage] = useState("");

  //Callbacks.
  const sendMessage = (e) => {
    e.preventDefault();

    if (message == "" && medias.length == 0) {
      if (
        setFormNotificationMessage != undefined &&
        setFormNotificationOpen != undefined
      ) {
        setFormNotificationMessage(
          "Vous ne pouvez pas envoyer un message vide."
        );
        setFormNotificationOpen(true);
      }
      return;
    }

    let data = new FormData();
    data.append(
      "data",
      JSON.stringify({ contenu: message, cibleUserId: idCible })
    );

    /*data.append("contenu", message);
    data.append("cibleUserId", idCible);*/

    for (let m of medias) data.append("medias", m);

    axios
      .post(
        `${config.applicationServerURL}messages/conversations/messages/post`,
        data,
        {
          headers: { authorization: `Bearer ${authPayload.token}` },
        }
      )
      .then((data) => {
        setMedias([]);
        setMessage("");
        if (
          setFormNotificationMessage != undefined &&
          setFormNotificationOpen != undefined
        ) {
          setFormNotificationMessage("Message envoyé avec succès.");
          setFormNotificationOpen(true);
        }

        if (onSent != null && onSent != undefined) onSent(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (
          setFormNotificationMessage != undefined &&
          setFormNotificationOpen != undefined
        ) {
          setFormNotificationMessage("Erreur. Envoi du message impossible.");
          setFormNotificationOpen(true);
        }
      });
  };

  return (
    <div
      className="inner-page-block"
      style={{ height: "auto", padding: "30px", marginTop: "-40px", ...style }}
    >
      <Form
        style={{
          width: "100%",
        }}
        onSubmit={sendMessage}
      >
        {" "}
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Envoyer un message ..."
          value={message}
          onInput={(e) => setMessage(e.target.value)}
        />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Button variant="primary" type="submit">
            <EntypoChat
              style={{ marginTop: "4px", marginRight: "6px", fontSize: "20px" }}
            />
            Envoyer
          </Button>
          <SelectionneurMedias
            setFormNotificationOpen={setFormNotificationOpen}
            setFormNotificationMessage={setFormNotificationMessage}
            medias={medias}
            setMedias={setMedias}
          />
        </div>
      </Form>
    </div>
  );
}

export default ChampMessage;
