import React, {
  useContext,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import Post from "./Post";
import ChampPost from "./ChampPost";
import MediaDialogue from "./../commun/dialogue/MediaDialogue";
import AuthentificationContext from "../../../contexts/AuthentificationContext.jsx";

import "./../commun/PagesCommun.css";

import Button from "react-bootstrap/Button";
import MoonLoader from "react-spinners/MoonLoader";

import { EntypoCcw } from "react-entypo";

const FluxPosts = forwardRef((props, ref) => {
  //Props.
  let {
    showPostField = false,
    setFormNotificationOpen,
    setFormNotificationMessage,
    fetchPostsPromise,
    fetchMorePostsPromise,
    style = {},
    loadMoreMsg = null,
    idPostCible = null,
  } = props;

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

  const [latestFetchPromise, setLatestFetchPromise] = useState(null);

  const [lastSelectedMediaSource, setLastSelectedMediaSource] = useState("");
  const [lastSelectedMediaIsVideo, setLastSelectedMediaIsVideo] =
    useState(false);
  const [mediaDialogueIsOpen, setMediaDialogueIsOpen] = useState(false);

  const [latestPostTimestamp, setLatestPostTimestamp] = useState(null);

  const [hasScrollLoaded, setHasScrollLoaded] = useState(false);

  //Fonctions et callbacks.
  const appendNewPosts = (newestPosts) => {
    if (newestPosts.length > 0) {
      setPosts((posts) => [...newestPosts, ...posts]);
    }
  };

  const updateLatestTimestamp = (latestPosts) => {
    if (latestPosts.length > 0)
      setLatestPostTimestamp(latestPosts[latestPosts.length - 1].createdAt);
  };

  const ceaseLoading = () => {
    if (latestFetchPromise != null) {
      if (latestFetchPromise.isPending())
        latestFetchPromise.reject("Chargement annulé.");
      setLatestFetchPromise(null);
      setFetchingNewerPosts(false);
    }
  };

  const loadMorePosts = () => {
    if (fetchingNewerPosts === true) return;

    if (posts.length == 0) {
      fetchInitialPosts();
      return;
    }

    ceaseLoading();

    const newPromise = fetchMorePostsPromise(latestPostTimestamp);
    setFetchingNewerPosts(true);
    newPromise
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
        setLatestFetchPromise(null);
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
        setLatestFetchPromise(null);
      });
    setLatestFetchPromise(newPromise);
  };

  const fetchInitialPosts = () => {
    setLatestPostTimestamp(Date.now());
    const newPromise = fetchPostsPromise();
    setFetchingNewerPosts(true);
    newPromise
      .then((data) => {
        setPosts(data.data);
        setFetchingNewerPosts(false);
        updateLatestTimestamp(data.data);
        setLatestFetchPromise(null);
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
        setLatestFetchPromise(null);
      });
    setLatestFetchPromise(newPromise);
  };

  window.onscroll = function (e) {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !fetchingNewerPosts &&
      !hasScrollLoaded &&
      (this.pScroll || 0) < this.scrollY
    ) {
      loadMorePosts();
      setHasScrollLoaded(true);
    } else {
      setHasScrollLoaded(false);
    }

    this.pScroll = this.scrollY;
  };

  //Initialisation.
  useEffect(fetchInitialPosts, []);

  //Constantes.
  const postInput = showPostField ? (
    <ChampPost
      setFormNotificationOpen={setFormNotificationOpen}
      setFormNotificationMessage={setFormNotificationMessage}
      idPostCible={idPostCible}
      onPosted={(newPost) => {
        appendNewPosts([newPost]);
      }}
    />
  ) : (
    <></>
  );

  //Extension de l'instance du composant.
  useImperativeHandle(ref, () => {
    return {
      clearPosts(newFetchCallback = null) {
        if (newFetchCallback != null) fetchPostsPromise = newFetchCallback;

        ceaseLoading();
        setLatestPostTimestamp(Date.now());
        setHasScrollLoaded(false);
        setPosts([]);
        fetchInitialPosts();
      },
    };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "auto",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...style,
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
        disabled={fetchingNewerPosts}
      >
        {" "}
        <EntypoCcw
          style={{ fontSize: "20px", marginTop: "5px", marginRight: "6px" }}
        />{" "}
        {loadMoreMsg ? loadMoreMsg : "Charger plus de posts"}
      </Button>
    </div>
  );
});

export default FluxPosts;
