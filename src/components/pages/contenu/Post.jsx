import React from "react";

import AvatarProfil from "./../commun/profil/AvatarProfil";
import MediasPost from "./medias/MediasPost";

function Post({
  postData,
  setMediaDialogueIsOpen,
  setMediaDialogueSource,
  setMediaDialogueIsVideo,
}) {
  console.log(postData);
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
    </div>
  );
}

export default Post;
