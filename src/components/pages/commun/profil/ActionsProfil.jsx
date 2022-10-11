import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthentificationContext from "../../../../contexts/AuthentificationContext";

import config from "./../../../../config/config.json";

import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
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
  //Navigation.
  const navigate = useNavigate();

  //Variables de contexte.
  let { authProfile, authPayload } = useContext(AuthentificationContext);
  const isSelf =
    profile != null && authProfile != null && authProfile.id == profile.id;

  //Variables d'état.
  const [isFollowed, setIsFollowed] = useState(
    profile != null && "token" in profile && profile.token.suisProfil === true
  );

  const [adminFetching, setAdminFetching] = useState(false);

  //Callbacks
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

  const sendDeletionRequest = () => {
    if (adminFetching === true) return;
    setAdminFetching(true);

    axios
      .delete(`${config.applicationServerURL}users/delete/${profile.id}`, {
        headers:
          authPayload != null && "token" in authPayload
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      })
      .then((data) => {
        setAdminFetching(false);
        setFormNotificationMessage("Profil supprimé avec succès.");
        setFormNotificationOpen(true);
        navigate("/flux");
      })
      .catch((err) => {
        console.log(err);
        setAdminFetching(false);
        setFormNotificationMessage("Suppression impossible.");
        setFormNotificationOpen(true);
      });
  };

  return (
    <div className="profile-header-buttons" style={{ width: "auto", ...style }}>
      {authPayload != null && authPayload.admin === true ? (
        <>
          <Dropdown>
            <Dropdown.Toggle variant="warning" disabled={adminFetching}>
              Administration
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  sendDeletionRequest();
                }}
              >
                Supprimer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          &nbsp;&nbsp;&nbsp;
        </>
      ) : null}
      {!isSelf && profile != null ? (
        <>
          <Button onClick={followProfile} disabled={authProfile == null}>
            <EntypoAddUser style={{ marginTop: "4px" }} />{" "}
            {!isFollowed ? "Suivre" : "Ne plus suivre"}
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            onClick={(e) => {
              setMessageBoxIsOpen(true);
            }}
            disabled={authProfile == null || !authProfile.valide}
          >
            <EntypoMail style={{ marginTop: "4px" }} />
            &nbsp;Envoyer un message
          </Button>
        </>
      ) : null}
    </div>
  );
}

export default ActionsProfil;
