import React, { useState } from "react";

import config from "./../../../../config/config.json";

import MoonLoader from "react-spinners/MoonLoader";

function BanniereProfil({ profile }) {
  const banniereProfilData =
    profile != null && "banniereProfil" in profile
      ? profile.banniereProfil.split("/")
      : "";

  //Variables d'état.
  const [isLoaded, setIsLoaded] = useState(
    banniereProfilData === "" ? true : false
  );

  return (
    <>
      {profile != null ? (
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
          hidden={!isLoaded}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          paddingTop: "50px",
        }}
        hidden={isLoaded}
      >
        <MoonLoader color="green" />
      </div>
    </>
  );
}

export default BanniereProfil;
