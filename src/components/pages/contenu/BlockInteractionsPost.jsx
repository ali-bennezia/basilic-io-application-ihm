import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthentificationContext from "../../../contexts/AuthentificationContext";

import { EntypoThumbsUp, EntypoThumbsDown, EntypoChat } from "react-entypo";

import axios from "axios";
import config from "./../../../config/config.json";

const textStyle = { display: "inline-block", fontWeight: "bold" };
const iconStyle = {
  fontSize: "22px",
  marginTop: "-0px",
  marginLeft: "6px",
  marginRight: "6px",
};
const buttonStyle = { border: "none", padding: "0", margin: "0" };

function BlockInteractionsPost({ postData, postResponses = true, style }) {
  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [dislikeOver, setDislikeOver] = useState(false);
  const [likeOver, setLikeOver] = useState(false);

  const [dislikePar, setDislikePar] = useState(postData.dislikePar || false);
  const [likePar, setLikePar] = useState(postData.likePar || false);

  const [likes, setLikes] = useState(postData.like);
  const [dislikes, setDislikes] = useState(postData.dislike);

  //Callbacks.
  const sendActivityRequest = (nature) => {
    if (authPayload == null) return;

    axios
      .post(
        `${config.applicationServerURL}posts/activities/create/${postData._id}&${nature}`,
        {},
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        const decrFunc = dislikePar
          ? () => {
              setDislikes((val) => val - 1);
            }
          : likePar
          ? () => {
              setLikes((val) => val - 1);
            }
          : () => {};
        setLikePar(false);
        setDislikePar(false);
        let func =
          nature === "dislike"
            ? () => {
                setDislikePar(true);
                setDislikes((val) => val + 1);
              }
            : () => {
                setLikePar(true);
                setLikes((val) => val + 1);
              };
        func(true);
        decrFunc();
      });
  };

  const sendActivityDeletionRequest = () => {
    if (authPayload == null) return;

    axios
      .delete(
        `${config.applicationServerURL}posts/activities/delete/${postData._id}`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        const decrFunc = dislikePar
          ? () => {
              setDislikes((val) => val - 1);
            }
          : likePar
          ? () => {
              setLikes((val) => val - 1);
            }
          : () => {};
        decrFunc();
        setLikePar(false);
        setDislikePar(false);
      });
  };

  return (
    <div style={style}>
      {postResponses ? (
        <Link
          className="link"
          to={`/post/${postData._id}`}
          style={{ color: "black" }}
        >
          <EntypoChat style={iconStyle} />
          <p style={{ ...textStyle, marginRight: "30px" }}>
            {postData.reponse} Réponse{postData.reponse == 1 ? "" : "s"}
          </p>
        </Link>
      ) : (
        <></>
      )}
      <button
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (authPayload == null) return;

          setDislikeOver(true);
        }}
        onMouseLeave={(e) => {
          if (authPayload == null) return;

          setDislikeOver(false);
        }}
        onClick={(e) => {
          e.preventDefault();
          if (authPayload == null) return;

          if (dislikePar === true) {
            sendActivityDeletionRequest();
            return;
          }
          sendActivityRequest("dislike");
        }}
      >
        <EntypoThumbsDown
          style={{
            ...iconStyle,
            color: "#8a0000",
            fontSize: dislikePar ? "28px" : `${dislikeOver ? "26" : "22"}px`,
            marginTop:
              dislikePar || false ? "-6px" : `${dislikeOver ? "-1" : "0"}px`,
          }}
        />
      </button>
      <p style={textStyle}>{dislikes}</p>
      <div
        style={{
          display: "inline-block",
          width: "120px",
          height: "8px",
          position: "relative",
          top: "-1px",
          marginLeft: "10px",
          marginRight: "10px",

          background: "rgb(237,237,237)",
          background:
            "linear-gradient(180deg, rgba(227,227,227,1) 0%, rgba(189,189,189,1) 100%)",
        }}
      >
        <div
          style={{
            height: "100%",

            width: `${parseInt((dislikes / (likes + dislikes)) * 100)}%`,
            position: "relative",
            top: "0px",

            background: "rgb(116,0,0)",
            background:
              "linear-gradient(0deg, rgba(116,0,0,1) 0%, rgba(255,0,0,1) 100%)",
          }}
          hidden={postData == null || (likes === 0 && dislikes === 0)}
        />
        <div
          style={{
            height: "100%",
            width: `${parseInt((likes / (likes + dislikes)) * 100)}%`,
            position: "relative",
            top: "-100%",
            float: "right",

            background: "rgb(0,143,5)",
            background:
              "linear-gradient(0deg, rgba(0,143,5,1) 0%, rgba(0,251,75,1) 100%)",
          }}
          hidden={postData == null || (likes === 0 && dislikes === 0)}
        />
      </div>
      <p style={textStyle}>{likes}</p>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (authPayload == null) return;

          setLikeOver(true);
        }}
        onMouseLeave={(e) => {
          if (authPayload == null) return;

          setLikeOver(false);
        }}
        onClick={(e) => {
          e.preventDefault();

          if (authPayload == null) return;

          if (likePar === true) {
            sendActivityDeletionRequest();
            return;
          }
          sendActivityRequest("like");
        }}
      >
        <EntypoThumbsUp
          style={{
            ...iconStyle,
            color: "#067500",
            fontSize: likePar ? "28px" : `${likeOver ? "26" : "22"}px`,
            marginTop: likePar ? "-6px" : `${likeOver ? "-3" : "0"}px`,
          }}
        />{" "}
      </button>
    </div>
  );
}

export default BlockInteractionsPost;
