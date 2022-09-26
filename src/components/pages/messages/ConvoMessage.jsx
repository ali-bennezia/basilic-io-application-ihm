import React, { useContext } from "react";

import AuthentificationContext from "../../../contexts/AuthentificationContext";

function ConvoMessage({ messageData, style = {}, username = "" }) {
  //Variables de contexte.
  const { authProfile } = useContext(AuthentificationContext);

  //Constantes.
  const isSelf = messageData.auteur === authProfile.userId;

  console.log(messageData);

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
      </div>
    </div>
  );
}

export default ConvoMessage;
