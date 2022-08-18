import React from "react";

import config from "./../../../../config/config.json";

function BanniereProfil({ profile }) {
  const banniereProfilData =
    profile != null && "banniereProfil" in profile
      ? profile.banniereProfil.split("/")
      : "";

  return profile != null && "banniereProfil" in profile ? (
    <img
      className="profile-banner"
      style={{
        position: "absolute",
        width: "100%",
        height: "125px",
        left: "0px",
        top: "0px",
      }}
      src={
        profile != null && "banniereProfil" in profile && banniereProfilData
          ? `${config.mediaServerURL}medias/${banniereProfilData[0]}/get/${banniereProfilData[1]}`
          : config.defaultBanner
      }
    />
  ) : (
    <></>
  );
}

export default BanniereProfil;
