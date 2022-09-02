import React from "react";
import AvatarProfil from "../commun/profil/AvatarProfil";
import BanniereProfil from "../commun/profil/BanniereProfil";
import DescriptionProfil from "../commun/profil/DescriptionProfil";
import SuivisProfil from "../commun/profil/SuivisProfil";

import "./../commun/PagesCommun.css";

import ActionsProfil from "../commun/profil/ActionsProfil";

function EnTeteProfil({
  profile,
  setFormNotificationOpen,
  setFormNotificationMessage,
  setViewedAuthProfile,
  setMessageBoxIsOpen,
}) {
  return (
    <div className="inner-page-block" style={{ height: "300px" }}>
      {profile != null ? <BanniereProfil profile={profile} /> : null}
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
          top: "130px",
          fontWeight: "bolder",
          fontSize: "20px",
        }}
      >
        {profile != null && "nomPublic" in profile
          ? profile.nomPublic
          : "nomUtilisateur" in profile
          ? profile.nomUtilisateur
          : ""}
      </p>

      <p
        style={{
          position: "absolute",
          left: "200px",
          top: "158px",
          fontSize: "14px",
          color: "grey",
        }}
      >
        {profile != null && "nomUtilisateur" in profile
          ? "@" + profile.nomUtilisateur
          : ""}
      </p>

      <DescriptionProfil
        profile={profile}
        style={{
          position: "absolute",
          left: "200px",
          top: "180px",
        }}
      />

      <ActionsProfil
        style={{ position: "absolute", right: "20px", bottom: "20px" }}
        profile={profile}
        setFormNotificationOpen={setFormNotificationOpen}
        setFormNotificationMessage={setFormNotificationMessage}
        setViewedAuthProfile={setViewedAuthProfile}
        setMessageBoxIsOpen={setMessageBoxIsOpen}
      />
    </div>
  );
}

export default EnTeteProfil;
