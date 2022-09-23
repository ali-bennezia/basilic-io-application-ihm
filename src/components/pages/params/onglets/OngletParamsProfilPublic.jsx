import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Onglet from "./Onglet.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthentificationContext from "../../../../contexts/AuthentificationContext.jsx";
import axios from "axios";

import "./../../commun/PagesCommun.css";
import "./Onglet.css";
import config from "./../../../../config/config.json";

import { isStringBlank } from "./../../../../utils/sanitation";

import {
  validatePublicName,
  validateProfileDescription,
} from "./../../../../utils/validation";

import Snackbar from "@mui/material/Snackbar";
import { EntypoCheck } from "react-entypo";

function OngletParamsProfilPublic({ tabIndex }) {
  //Variables du contexte d'authentification.
  const {
    authPayload,
    setAuthPayload,
    authProfile,
    setAuthProfile,
    patchAuthProfile,
    logout,
  } = useContext(AuthentificationContext);

  //Navigation.
  const navigate = useNavigate();

  //Variables d'état
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profileBannerFile, setProfileBannerFile] = useState(null);

  const [publicName, setPublicName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);
  const [validForm, setValidForm] = useState(false);

  const [waitingAJAXResponse, setWaitingAJAXResponse] = useState(false);

  const [formNotificationOpen, setFormNotificationOpen] = useState(false);
  const [formNotificationMessage, setFormNotificationMessage] = useState("");

  //Fonction permettant la récupération des informations du profil.
  const fetchProfileData = () => {
    setPublicName(
      authProfile != null && "nomPublic" in authProfile
        ? authProfile.nomPublic
        : ""
    );
    setProfileDescription(
      authProfile != null && "descriptionProfil" in authProfile
        ? authProfile.descriptionProfil
        : ""
    );
    setPublicProfile(
      authProfile != null && "profilPublic" in authProfile
        ? authProfile.profilPublic
        : true
    );
    setValidForm(true);
  };

  //Chargement des informations connues du profil dans les champs dès le montage de cette composante.
  useEffect(fetchProfileData, []);

  //Callback pour toute entrée
  const refreshFullValidation = () => {
    let fullValidation = true;
    fullValidation = fullValidation && !waitingAJAXResponse;

    if (!isStringBlank(publicName))
      fullValidation = fullValidation && validatePublicName(publicName).result;
    if (!isStringBlank(profileDescription))
      fullValidation =
        fullValidation && validateProfileDescription(profileDescription).result;

    setValidForm(fullValidation);
  };
  useEffect(refreshFullValidation, [
    publicName,
    profileDescription,
    publicProfile,
    waitingAJAXResponse,
  ]);

  //Callback pour l'envoi
  const sendFormData = (e) => {
    e.preventDefault();

    if (authPayload == null) {
      logout(setAuthPayload, setAuthProfile);
      setFormNotificationMessage("Erreur, vous n'êtes pas connecté(e).");
      setFormNotificationOpen(true);
      navigate("/connexion");
      return;
    }

    let formData = new FormData();
    let newParams = {
      nomPublic: publicName.trim() == "" ? null : publicName,
      descriptionProfil:
        profileDescription.trim() == "" ? null : profileDescription,
      profilPublic: publicProfile,
    };

    formData.append("newParams", JSON.stringify(newParams));
    if (profilePhotoFile != null)
      formData.append("photoProfil", profilePhotoFile);
    if (profileBannerFile != null)
      formData.append("banniereProfil", profileBannerFile);

    setWaitingAJAXResponse(true);
    axios
      .patch(
        `${config.applicationServerURL}users/params/patch/${authPayload.userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authPayload.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data) => {
        patchAuthProfile({ ...newParams, ...data.data });
        setWaitingAJAXResponse(false);

        setProfilePhotoFile(null);
        setProfileBannerFile(null);

        setFormNotificationMessage("Profil mis à jour avec succès.");
        setFormNotificationOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setWaitingAJAXResponse(false);

        setFormNotificationMessage("Erreur, mise à jour du profil impossible.");
        setFormNotificationOpen(true);
      });
  };

  return (
    <Onglet
      tabPosition={0}
      tabIndex={tabIndex}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="inner-page-container">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.photoProfil"
          >
            <Form.Label>Ma photo de profil</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) =>
                setProfilePhotoFile(
                  e.target.files.length > 0 ? e.target.files[0] : null
                )
              }
              accept="image/png,image/jpeg"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.banniereProfil"
          >
            <Form.Label>Ma bannière de profil</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setProfileBannerFile(
                  e.target.files.length > 0 ? e.target.files[0] : null
                );
              }}
              accept="image/png,image/jpeg"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.nomPublic"
          >
            <Form.Label>Nom public</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le nom publiquement affiché sur votre profil ..."
              value={publicName}
              onInput={(e) => {
                setPublicName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.descriptionProfil"
          >
            <Form.Label>Description du profil</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Entrez la description de votre profil ..."
              value={profileDescription}
              onInput={(e) => {
                setProfileDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.profilPublic"
          >
            <Form.Check
              type="checkbox"
              value={publicProfile}
              label="Profil visible au public"
              defaultChecked={
                authProfile != null && "profilPublic" in authProfile
                  ? authProfile.profilPublic == true
                  : true
              }
              onInput={(e) => {
                setPublicProfile(e.target.checked);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!validForm}
            onClick={(e) => {
              sendFormData(e);
            }}
          >
            Envoyer
          </Button>

          <Snackbar
            open={formNotificationOpen}
            onClose={(e) => setFormNotificationOpen(false)}
            autoHideDuration={6000}
            message={formNotificationMessage}
          />
        </Form>
      </div>
    </Onglet>
  );
}

export default OngletParamsProfilPublic;
