import React, { useContext, useState, useEffect } from "react";

import Post from "./Post";
import ChampPost from "./ChampPost";

import "./../commun/PagesCommun.css";

import { Form, Button } from "react-bootstrap";

import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";

function FluxPosts({
  showPostField = false,
  setFormNotificationOpen,
  setFormNotificationMessage,
  fetchPostsPromise,
  fetchPostsTimelinePromise,
}) {
  //Variables du contexte d'authentification.
  const {
    authPayload,
    setAuthPayload,
    authProfile,
    setAuthProfile,
    patchAuthProfile,
    logout,
  } = useContext(AuthentificationContext);

  //Variables d'état.
  const [posts, setPosts] = useState([]);

  //Initialisation.
  useEffect(() => {
    fetchPostsPromise().then((data) => setPosts(data.data));
  }, []);

  //Constantes.
  const postInput = showPostField ? (
    <ChampPost
      setFormNotificationOpen={setFormNotificationOpen}
      setFormNotificationMessage={setFormNotificationMessage}
    />
  ) : (
    <></>
  );

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
      {posts.map((el, i) => (
        <Post key={i} postData={el} />
      ))}
    </div>
  );
}

export default FluxPosts;
