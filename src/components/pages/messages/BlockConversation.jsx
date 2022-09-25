import React, { useContext } from "react";
import AuthentificationContext from "../../../contexts/AuthentificationContext";

import AvatarProfil from "../commun/profil/AvatarProfil";

import { parseTimestamp } from "./../../../utils/objects";

import {EntypoQuote} from "react-entypo";

import {Icon} from "@iconify/react";
import quoteIcon from "@iconify/icons-entypo/quote";

function BlockConversation({ convo }) {
  //Contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables.
  const isUserA = authPayload.userId == convo.userA.id;
  const partner = isUserA ? convo.userB : convo.userA;
  const unseenMessages =  isUserA
    ? convo.unseenMessagesUserA
    : convo.unseenMessagesUserB;

  return (
    <>
      <div className="block-conversation" data-alert={unseenMessages>0}>
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
            maxWidth: "45%",
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontSize: "18px",
            }}
          >
            {"nomPublic" in partner
              ? partner.nomPublic
              : partner.nomUtilisateur}
            <br />
            <span
              style={{ color: "grey", fontStyle: "italic", fontSize: "14px" }}
            >
              @{partner.nomUtilisateur}
            </span>
          </p>
          <br />
          <p
            style={{
              display: "inline-block",
              position: "relative",
              top: "-16px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "50%",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {unseenMessages > 0 ? (
                <>
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {`${unseenMessages} nouveau${
                      unseenMessages == 1 ? "" : "x"
                    } message${unseenMessages == 1 ? "" : "s"}`}{" "}
                  </span>{" "}
                  <span style={{ color: "grey", fontStyle: "italic" }}>
                    {"lastSentMessageAt" in convo
                      ? ' • '
                      : ""}
                  </span>
                </>
              ) : (
                ""
              )}
                <span style={{ color: "grey", fontStyle: "italic" }}>
                  {"lastSentMessageAt" in convo
                    ? `Dernier message ${parseTimestamp(
                        convo.lastSentMessageAt
                      )}`
                    : ""}
                </span>
            </span>
          </p>
        </div>

        {"lastSentMessage" in convo ? 
        <>
          <EntypoQuote style={{fontSize:"38px", position: "relative", bottom:"88px", right:"-755px", color:"#d9d9d9"}} />
          <Icon icon={quoteIcon} hFlip={true} style={{position:"relative", fontSize:"40px", left:"270px", top:"-120px", color:"#d9d9d9"}} />
        </>
         : null}
        

        <p
          style={{
            position: "relative",
            display: "inline-block",
            float:"right",
            right:"0px",
            top: "-58px",
            height: "100%",
            width: "45%",
            margin:"0",
            paddingRight:"8px",

            textAlign:"end",

            fontStyle:"italic",
            color:`${unseenMessages > 0 ? "black" : "grey"}`,
            overflow:"hidden",
            maxHeight:"4.8em"
          }}
        >
         {"lastSentMessage" in convo ? convo.lastSentMessage : "Aucun message ..."}

        </p>

      </div>
      <hr style={{width:"100%", position:"relative", top:"-44px"}} />
    </>
  );
}

export default BlockConversation;
