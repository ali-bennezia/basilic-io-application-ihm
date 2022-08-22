import React from "react";
import AvatarProfil from "../commun/profil/AvatarProfil";
import BanniereProfil from "../commun/profil/BanniereProfil";
import SuivisProfil from "../commun/profil/SuivisProfil";

import "./../commun/PagesCommun.css";

function EnTeteProfil({ profile }) {
  return (
    <div className="inner-page-block" style={{ height: "300px" }}>
      {profile != null && "banniereProfil" in profile ? (
        <BanniereProfil profile={profile} />
      ) : null}
      <AvatarProfil
        profile={profile}
        size={140}
        style={{ position: "absolute", left: "40px", top: "40px" }}
      />

      <SuivisProfil
        style={{ position: "absolute", right: "20px", top: "135px" }}
        profile={profile}
      />

      <p
        style={{
          position: "absolute",
          left: "200px",
          top: "140px",
          width: "280px",
          height: "100px",
          wordWrap: "break-word",
          overflow: "hidden",
        }}
      >
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
      </p>
    </div>
  );
}

export default EnTeteProfil;
