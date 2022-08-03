import React from "react";
import Onglet from "./Onglet.jsx";
import Form from "react-bootstrap/Form";
import { getAuthProfile } from "../../../../contexts/AuthentificationContext.jsx";

import "./Onglet.css";

function OngletParamsProfilPublic({ tabIndex }) {
  const profile = getAuthProfile();

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
        }}
      >
        <Form>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.photoProfil"
          >
            <Form.Label>Ma photo de profil</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.banniereProfil"
          >
            <Form.Label>Ma bannière de profil</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.nomPublic"
          >
            <Form.Label>Nom public</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le nom publiquement affiché sur votre profil ..."
              value={
                profile != null && "nomPublic" in profile
                  ? profile.nomPublic
                  : ""
              }
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
              value={
                profile != null && "descriptionProfil" in profile
                  ? profile.descriptionProfil
                  : ""
              }
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="paramsForm.ongletPublic.profilPublic"
          >
            <Form.Check
              type="checkbox"
              value={true}
              label="Profil visible au public"
            />
          </Form.Group>
        </Form>
      </div>
    </Onglet>
  );
}

export default OngletParamsProfilPublic;
