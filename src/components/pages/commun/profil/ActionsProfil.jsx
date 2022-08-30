import React, { useContext, useState } from "react";

import AuthentificationContext from "../../../../contexts/AuthentificationContext";

import config from "./../../../../config/config.json";

import Button from "react-bootstrap/Button";
import { EntypoAddUser, EntypoMail } from "react-entypo";

import axios from "axios";

function ActionsProfil({
  profile,
  style,
  setFormNotificationOpen,
  setFormNotificationMessage,
  setViewedAuthProfile,
  setMessageBoxIsOpen,
}) {
  let { authProfile, authPayload } = useContext(AuthentificationContext);
  const isSelf =
    profile != null && authProfile != null && authProfile.id == profile.id;

  //Variables d'état.
  const [isFollowed, setIsFollowed] = useState(profile.token.suisProfil);

  const followProfile = (e) => {
    axios
      .get(
        `${config.applicationServerURL}follows/post/${isFollowed ? "1" : "0"}&${
          profile.id
        }`,
        { headers: { authorization: `Bearer ${authPayload.token}` } }
      )
      .then((data) => {
        setFormNotificationMessage(
          !isFollowed
            ? "Profil suivi avec succès."
            : "Vous ne suivez plus ce profil."
        );
        if (profile != null && "suis" in profile && "suiviPar" in profile)
          setViewedAuthProfile((val) => {
            return {
              ...val,
              suiviPar: isFollowed ? val.suiviPar - 1 : val.suiviPar + 1,
            };
          });
        setFormNotificationOpen(true);
        setIsFollowed((val) => !val);
      })
      .catch((err) => {
        console.log(err);
        setFormNotificationMessage("Erreur, impossible de suivre ce profil.");
        setFormNotificationOpen(true);
      });
  };

  return !isSelf && profile != null ? (
    <div className="profile-header-buttons" style={{ width: "auto", ...style }}>
      <Button onClick={followProfile}>
        <EntypoAddUser style={{ marginTop: "4px" }} />{" "}
        {!isFollowed ? "Suivre" : "Ne plus suivre"}
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        onClick={(e) => {
          setMessageBoxIsOpen(true);
        }}
        disabled={!authProfile.valide}
      >
        <EntypoMail style={{ marginTop: "4px" }} />
        &nbsp;Envoyer un message
      </Button>
    </div>
  ) : (
    <></>
  );
}

export default ActionsProfil;
