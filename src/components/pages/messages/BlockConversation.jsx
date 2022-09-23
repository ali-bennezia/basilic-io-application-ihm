import React, { useContext } from "react";
import AuthentificationContext from "../../../contexts/AuthentificationContext";

import AvatarProfil from "../commun/profil/AvatarProfil";

function BlockConversation({ convo }) {
  //Contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables.
  const isUserA = authPayload.userId == convo.userA.id;
  const partner = isUserA ? convo.userB : convo.userA;
  const unseenMessages = 1; /* isUserA
    ? convo.unseenMessagesUserA
    : convo.unseenMessagesUserB;*/

  return (
    <>
      <div className="block-conversation">
        <AvatarProfil
          profile={partner._id}
          size={60}
          borderRadius={10}
          style={{ position: "relative", top: "10px", left: "10px" }}
        />
        <div
          style={{
            position: "relative",
            display: "inline-block",
            left: "84px",
            top: "-58px",
            height: "100%",
            width: "auto",
          }}
        >
          <p style={{ display: "inline-block", fontSize: "18px" }}>
            {"nomPublic" in partner
              ? partner.nomPublic
              : partner.nomUtilisateur}
            <br />
            <span
              style={{ color: "grey", fontStyle: "italic", fontSize: "14px" }}
            >
              @{partner.nomUtilisateur}
            </span>
            <br />
            <span style={{ fontSize: "14px" }}>
              {unseenMessages > 0 ? (
                <>
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {`${unseenMessages} nouveau${
                      unseenMessages == 1 ? "" : "x"
                    } message${unseenMessages == 1 ? "" : "s"}`}{" "}
                  </span>{" "}
                  {" • "}
                </>
              ) : (
                ""
              )}
            </span>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default BlockConversation;
