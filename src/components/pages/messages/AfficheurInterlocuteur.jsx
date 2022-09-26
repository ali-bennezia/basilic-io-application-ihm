import React from "react";

import { Link } from "react-router-dom";

import AvatarProfil from "../commun/profil/AvatarProfil";

/*
    profile doit contenir les données du profil à afficher.
    isSelf est une booléenne indiquant si le compte appartient à l'utilisateur actuellement connecté.
    float est une variable qui doit valoir soit left, soit right, afin de déterminer la disposition de la composante et de ses éléments.
*/

function AfficheurInterlocuteur({ profile, isSelf, float }) {
  return profile != null ? (
    <div style={{ float: float }}>
      <Link to={`/profil/${profile.id}`}>
        <p
          style={{
            display: "inline-block",
            margin: "8px",
            marginRight: "12px",
            verticalAlign: "top",
            textAlign: "end",
            color: "black",
          }}
        >
          {profile.nomPublic || profile.nomUtilisateur} <br />{" "}
          <span style={{ color: "grey", fontStyle: "italic" }}>
            @{profile.nomUtilisateur}
          </span>
        </p>
        <span style={{ display: "inline-block" }}>
          <AvatarProfil profile={profile} size={88} borderRadius={16} />
        </span>
      </Link>
    </div>
  ) : null;
}

export default AfficheurInterlocuteur;
