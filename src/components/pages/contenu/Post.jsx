import React from "react";
import { Link } from "react-router-dom";

import AvatarProfil from "./../commun/profil/AvatarProfil";
import BlockInteractionsPost from "./BlockInteractionsPost";
import MediasPost from "./medias/MediasPost";

import { parseTimestamp } from "./../../../utils/objects";

function Post({
  postData,
  postResponses = true,
  setMediaDialogueIsOpen,
  setMediaDialogueSource,
  setMediaDialogueIsVideo,
  onPostDeleted,
  setSnackbarIsOpen,
  setSnackbarMessage,
}) {
  return (
    <div
      className="inner-page-block"
      style={{ height: "auto", padding: "30px", marginTop: "-20px" }}
    >
      <Link to={`/profil/${postData.auteur.id}`}>
        <div className="block-part" style={{ width: "280px", height: "40px" }}>
          <AvatarProfil
            profile={postData.auteur}
            size={60}
            borderRadius={10}
            style={{ marginTop: "-10px" }}
          />
          <p
            style={{
              position: "absolute",
              left: "100px",
              top: "-32px",
              width: "200px",
              color: "black",
            }}
          >
            {"nomPublic" in postData.auteur
              ? postData.auteur.nomPublic
              : postData.auteur.nomUtilisateur}
          </p>
          <p
            className="navbar-subtext"
            style={{
              position: "absolute",
              left: "100px",
              top: "-10px",
              width: "200px",
              fontSize: "12px",
            }}
          >
            {`@${postData.auteur.nomUtilisateur}`}
          </p>
        </div>
      </Link>
      <p style={{ marginTop: "20px", overflowWrap: "break-word" }}>
        {postData.contenu}
        {"postCible" in postData && "nomUtilisateurCible" in postData ? (
          <span style={{ fontStyle: "italic", color: "grey" }}>
            <br />
            <br />
            Réponse à{" "}
            <Link
              to={`/post/${postData.postCible}`}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "green" }}>
                @{postData.nomUtilisateurCible}
              </span>
            </Link>
          </span>
        ) : (
          ""
        )}
      </p>
      <MediasPost
        medias={postData.medias}
        setMediaDialogueIsOpen={setMediaDialogueIsOpen}
        setMediaDialogueSource={setMediaDialogueSource}
        setMediaDialogueIsVideo={setMediaDialogueIsVideo}
      />
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "28px",
          marginBottom: "0px",
          padding: "0px",
        }}
      >
        <p style={{ fontStyle: "italic", color: "grey" }}>
          Posté {parseTimestamp(postData.createdAt)}
        </p>
        <BlockInteractionsPost
          postData={postData}
          postResponses={postResponses}
          onPostDeleted={onPostDeleted}
          setSnackbarIsOpen={setSnackbarIsOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
      </div>
    </div>
  );
}

export default Post;
