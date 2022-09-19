import React, { useContext, useState, useEffect } from "react";

import Post from "./Post";
import ChampPost from "./ChampPost";
import MediaDialogue from "./../commun/dialogue/MediaDialogue";
import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";

import "./../commun/PagesCommun.css";

import Button from "react-bootstrap/Button";
import MoonLoader from "react-spinners/MoonLoader";

import { EntypoCcw } from "react-entypo";

function FluxPosts({
  showPostField = false,
  setFormNotificationOpen,
  setFormNotificationMessage,
  fetchPostsPromise,
  fetchMorePostsPromise,
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
  const [fetchingNewerPosts, setFetchingNewerPosts] = useState(true);

  const [lastSelectedMediaSource, setLastSelectedMediaSource] = useState(null);
  const [lastSelectedMediaIsVideo, setLastSelectedMediaIsVideo] =
    useState(false);
  const [mediaDialogueIsOpen, setMediaDialogueIsOpen] = useState(false);

  const [latestPostTimestamp, setLatestPostTimestap] = useState(null);

  //Fonctions.
  const updateLatestTimestamp = (latestPosts) => {
    if (latestPosts.length > 0)
      setLatestPostTimestap(latestPosts[latestPosts.length - 1].createdAt);
  };

  const loadMorePosts = () => {
    fetchMorePostsPromise(latestPostTimestamp)
      .then((data) => {
        let newPosts = data.data;
        if (
          newPosts.length > 0 &&
          posts.length > 0 &&
          newPosts[0]._id === posts[posts.length - 1]._id
        )
          newPosts.shift();

        setPosts([...posts, ...newPosts]);
        setFetchingNewerPosts(false);

        updateLatestTimestamp(newPosts);
      })
      .catch((err) => {
        if (
          setFormNotificationMessage != undefined &&
          setFormNotificationOpen != undefined
        ) {
          setFormNotificationMessage("Erreur. Chargement de posts impossible.");
          setFormNotificationOpen(true);
        }
        setFetchingNewerPosts(false);
      });
  };

  //Initialisation.
  useEffect(() => {
    setLatestPostTimestap(Date.now());
    fetchPostsPromise()
      .then((data) => {
        setPosts(data.data);
        setFetchingNewerPosts(false);

        updateLatestTimestamp(data.data);
      })
      .catch((err) => {
        if (
          setFormNotificationMessage != undefined &&
          setFormNotificationOpen != undefined
        ) {
          setFormNotificationMessage("Erreur. Chargement de posts impossible.");
          setFormNotificationOpen(true);
        }
        setFetchingNewerPosts(false);
      });
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
      <MediaDialogue
        isVideo={lastSelectedMediaIsVideo}
        src={lastSelectedMediaSource}
        isOpen={mediaDialogueIsOpen}
        setIsOpen={setMediaDialogueIsOpen}
      />

      {postInput}
      {posts.map((el, i) => (
        <Post
          key={i}
          postData={el}
          setMediaDialogueIsOpen={setMediaDialogueIsOpen}
          setMediaDialogueSource={setLastSelectedMediaSource}
          setMediaDialogueIsVideo={setLastSelectedMediaIsVideo}
        />
      ))}
      {fetchingNewerPosts ? <MoonLoader color="green" /> : <></>}

      <Button
        className="standard-button"
        hidden={fetchingNewerPosts}
        onClick={(e) => {
          loadMorePosts();
        }}
      >
        {" "}
        <EntypoCcw
          style={{ fontSize: "20px", marginTop: "5px", marginRight: "6px" }}
        />{" "}
        Charger plus de posts
      </Button>
    </div>
  );
}

export default FluxPosts;
