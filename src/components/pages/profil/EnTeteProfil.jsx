import React from "react";
import AvatarProfil from "./../commun/navbar/profil/AvatarProfil";

import "./../commun/PagesCommun.css";

function EnTeteProfil(profile) {
  return (
    <div className="inner-page-block" style={{ height: "300px" }}>
      <img
        style={{
          position: "absolute",
          width: "100%",
          height: "125px",
          left: "0px",
          top: "0px",
        }}
      />
      <AvatarProfil
        profile={profile}
        size={140}
        style={{ position: "absolute", left: "40px", top: "40px" }}
      />
    </div>
  );
}

export default EnTeteProfil;
