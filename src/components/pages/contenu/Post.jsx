import React from "react";

import AvatarProfil from "./../commun/profil/AvatarProfil";
import BlockInteractionsPost from "./BlockInteractionsPost";
import MediasPost from "./medias/MediasPost";

const mths = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function Post({
  postData,
  setMediaDialogueIsOpen,
  setMediaDialogueSource,
  setMediaDialogueIsVideo,
}) {
  console.log(postData);
  const postDate = new Date(postData.createdAt);

  return (
    <div
      className="inner-page-block"
      style={{ height: "auto", padding: "30px", marginTop: "-20px" }}
    >
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
      <p style={{ marginTop: "20px", overflowWrap: "break-word" }}>
        {postData.contenu}
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
          Posté le {postDate.getDay()} {mths[postDate.getMonth()]}{" "}
          {postDate.getFullYear()} à {postDate.getHours()}h
          {postDate.getMinutes()}
        </p>
        <BlockInteractionsPost postData={postData} />
      </div>
    </div>
  );
}

export default Post;
