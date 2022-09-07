import React, { useState, useContext } from "react";
import config from "./../../../config/config.json";
import SelectionneurMedias from "./medias/SelectionneurMedias";
import AuthentificationContext from "./../../../contexts/AuthentificationContext";

import { Form, Button } from "react-bootstrap";
import { EntypoChat } from "react-entypo";
import axios from "axios";

function ChampPost({
  setFormNotificationOpen,
  setFormNotificationMessage,
  idPostCible = null,
  onPosted = null,
  style = {},
}) {
  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [medias, setMedias] = useState([]);
  const [post, setPost] = useState("");

  //Callbacks.
  const sendPost = (e) => {
    e.preventDefault();

    if (post == "" && medias.length == 0) {
      if (
        setFormNotificationMessage != undefined &&
        setFormNotificationOpen != undefined
      ) {
        setFormNotificationMessage("Vous ne pouvez pas envoyer un post vide.");
        setFormNotificationOpen(true);
      }
      return;
    }

    let data = new FormData();
    data.append("contenu", post);
    if (idPostCible != null && idPostCible != undefined)
      data.append("reponse", idPostCible);

    for (let m of medias) data.append("medias", m);

    axios
      .post(`${config.applicationServerURL}posts/create`, data, {
        headers: { authorization: `Bearer ${authPayload.token}` },
      })
      .then((data) => {
        setMedias([]);
        setPost("");
        if (
          setFormNotificationMessage != undefined &&
          setFormNotificationOpen != undefined
        ) {
          setFormNotificationMessage("Post envoyé avec succès.");
          setFormNotificationOpen(true);
        }

        if (onPosted != null && onPosted != undefined) onPosted(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (
          setFormNotificationMessage != undefined &&
          setFormNotificationOpen != undefined
        ) {
          setFormNotificationMessage("Erreur. Envoi du post impossible.");
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
        onSubmit={sendPost}
      >
        {" "}
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Discutez !"
          value={post}
          onInput={(e) => setPost(e.target.value)}
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
            Poster
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

export default ChampPost;
