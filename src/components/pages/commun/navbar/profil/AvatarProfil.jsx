import React from "react";

import config from "./../../../../../config/config.json";

function AvatarProfil({ profile, size = 70, borderWidth = 6, style = {} }) {
  const photoProfilData =
    profile != null && "photoProfil" in profile
      ? profile.photoProfil.split("/")
      : "";

  const innerSize = size - borderWidth;

  return (
    <div
      style={{
        backgroundColor: "#3bd34d",
        width: `${size.toString()}px`,
        height: `${size.toString()}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "black 0px 0px 3px",
        ...style,
      }}
    >
      <div
        style={{
          width: `${innerSize.toString()}px`,
          height: `${innerSize.toString()}px`,
          backgroundColor: "white",
        }}
      >
        <img
          src={
            "photoProfil" in profile && photoProfilData
              ? `${config.mediaServerURL}medias/${photoProfilData[0]}/get/${photoProfilData[1]}`
              : `img/profile/guest-avatar.jpg`
          }
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default AvatarProfil;
