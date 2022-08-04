import React, { useState, useEffect } from "react";
import Onglet from "./Onglet.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuthProfile } from "../../../../contexts/AuthentificationContext.jsx";

import "./../../commun/PagesCommun.css";
import "./Onglet.css";

import { isStringBlank } from "./../../../../utils/sanitation";

import {
  validatePublicName,
  validateProfileDescription,
} from "./../../../../utils/validation";

function OngletParamsProfilPublic({ tabIndex }) {
  const profile = getAuthProfile();

  //Variables d'état
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profileBannerFile, setProfileBannerFile] = useState(null);

  const [publicName, setPublicName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);
  const [validForm, setValidForm] = useState(false);

  //Fonction permettant la récupération des informations du profil.
  const fetchProfileData = () => {
    setPublicName(
      profile != null && "nomPublic" in profile ? profile.nomPublic : ""
    );
    setProfileDescription(
      profile != null && "descriptionProfil" in profile
        ? profile.descriptionProfil
        : ""
    );
    setPublicProfile(
      profile != null && "profilPublic" in profile ? profile.profilPublic : true
    );
    setValidForm(true);
  };

  //Chargement des informations connues du profil dans les champs dès le montage de cette composante.
  useEffect(() => {
    fetchProfileData();
  }, []);

  //Callback pour toute entrée
  const onAnyInput = () => {
    let fullValidation = true;

    if (!isStringBlank(publicName))
      fullValidation = fullValidation && validatePublicName(publicName).result;
    if (!isStringBlank(profileDescription))
      fullValidation =
        fullValidation && validateProfileDescription(profileDescription).result;

    setValidForm(fullValidation);
  };
  useEffect(onAnyInput, [publicName, profileDescription, publicProfile]);

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
      <div
        style={{
          width: "640px",
          height: "580px",
          border: "1px solid #BABABA",
          borderRadius: "20px",
          marginTop: "20px",
          padding: "40px",
          backgroundColor: "#F2F2F2",
        }}
      >
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
                profile != null && "profilPublic" in profile
                  ? profile.profilPublic == true
                  : true
              }
              onInput={(e) => {
                setPublicProfile(e.target.checked);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!validForm}>
            Envoyer
          </Button>
        </Form>
      </div>
    </Onglet>
  );
}

export default OngletParamsProfilPublic;
