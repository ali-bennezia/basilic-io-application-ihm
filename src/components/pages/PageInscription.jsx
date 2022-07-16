import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./PagesCommun.css";

function PageInscription() {
  return (
    <div
      className="main-page-organizer"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="img/basilic_titre_mid_res.png"
        id="main-page-title-img"
        alt="Basilic"
      />

      <div className="form-container">
        <Form className="basic-form">
          <h2>Inscription</h2>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez ici votre adresse e-mail..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Entrez ici votre numéro de téléphone..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez ici votre nom d'utilisateur..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez ici votre mot de passe..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPasswordConfirm">
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez ici votre mot de passe une seconde fois..."
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Confirmer
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PageInscription;
