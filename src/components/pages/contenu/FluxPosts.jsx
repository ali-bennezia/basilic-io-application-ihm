import React, { useContext } from "react";
import ChampPost from "./ChampPost";

import "./../commun/PagesCommun.css";

import { Form, Button } from "react-bootstrap";

import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";

function FluxPosts({ showPostField = false }) {
  //Variables du contexte d'authentification.
  const {
    authPayload,
    setAuthPayload,
    authProfile,
    setAuthProfile,
    patchAuthProfile,
    logout,
  } = useContext(AuthentificationContext);

  const postInput = showPostField ? <ChampPost /> : <></>;

  return (
    <div
      style={{
        width: "100%",
        height: "auto",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {postInput}
    </div>
  );
}

export default FluxPosts;
