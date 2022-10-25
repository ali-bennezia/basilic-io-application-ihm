import React, { useContext, useState } from "react";

import AuthentificationContext from "../../../contexts/AuthentificationContext";

import MediasPost from "./../contenu/medias/MediasPost";

function ConvoMessage({
  messageData,
  style = {},
  username = "",
  setMediaDialogueIsOpen,
  setMediaDialogueSource,
  setMediaDialogueIsVideo,
  setMediaDialogueIsPrivate,
}) {
  //Variables de contexte.
  const { authProfile } = useContext(AuthentificationContext);

  //Variables d'état.
  const [medias, setMedias] = useState(messageData.medias);

  //Constantes.
  const isSelf = messageData.auteur == authProfile.id;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "90%",
          minHeight: "20px",
          height: "auto",

          marginTop: "40px",
          minHeight: "50px",
          paddingBottom: "14px",

          borderRadius: "10px",

          backgroundColor: isSelf ? "#adebad" : "#ccf5ff",
          border: `${isSelf ? "#84e184" : "#99ebff"} solid 1px`,

          ...style,
        }}
      >
        <p style={{ fontSize: "10px", marginLeft: "6px", marginTop: "2px" }}>
          {username}
        </p>
        <p
          style={{
            margin: "4px",
            marginLeft: "8px",
            marginRight: "8px",
            overflowWrap: "break-word",
          }}
        >
          {messageData.contenu}
        </p>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <MediasPost
            medias={medias}
            setMediaDialogueIsOpen={setMediaDialogueIsOpen}
            setMediaDialogueSource={setMediaDialogueSource}
            setMediaDialogueIsVideo={setMediaDialogueIsVideo}
            setMediaDialogueIsPrivate={setMediaDialogueIsPrivate}
            style={{ width: "68%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ConvoMessage;
