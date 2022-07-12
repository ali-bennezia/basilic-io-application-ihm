import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { EntypoGithub } from "react-entypo";

import "./PagesCommon.css";
import "./PageAccueil.css";

function PageAccueil() {
  //Valeur d'état du champ d'entrée de recherche, situé sous le logo.
  const [searchInput, setSearchInput] = useState("");

  //Hook de navigation.
  const navigate = useNavigate();

  //Gestion du fond de vagues animées.
  const waveBackgroundElement = useRef();
  useEffect(() => {
    WAVES({
      el: waveBackgroundElement.current,
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: waveBackgroundElement.current.offsetWidth,
      minWidth: waveBackgroundElement.current.offsetHeight,
      scale: 1,
      scaleMobile: 1.0,
      color: 0x2f3c2f,
      shininess: 0.0,
      waveHeight: 3.5,
      waveSpeed: 1.1,
      zoom: 0.2,
    });
  }, []);

  const search = () => {
    navigate(`/search?q=${encodeURI(searchInput)}`);
  };

  return (
    <div className="main-page-organizer">
      <div id="waves-background-div" ref={waveBackgroundElement}>
        <div id="title-box-div">
          <img
            src="img/basilic_titre_mid_res.png"
            id="main-page-title-img"
            alt="Basilic"
          />
          <h2 id="main-subtitle-h2">
            Un réseau social français et open-source.
          </h2>

          <InputGroup size="lg" id="main-seach-div" style={{ top: "40px" }}>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Chercher des pseudos, des mot-clés, etc..."
              value={searchInput}
              onInput={(e) => {
                setSearchInput((val) => {
                  return e.target.value;
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") search();
              }}
            />
            <Button
              variant="outline-secondary"
              id="main-input-search-button"
              onClick={search}
            >
              <p>Surfer</p>
            </Button>
          </InputGroup>

          <div style={{}} className="git-link" id="title-git-link-div">
            <a href="http://github.com/ali-bennezia">
              <EntypoGithub
                color="white"
                style={{ height: "24px", width: "24px" }}
              />
              &nbsp;Github
            </a>
          </div>
        </div>

        <div id="title-menu-container-div">
          <h4 id="menu-join-title">Rejoins-nous !</h4>
          <button
            className="standard-button menu-join-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Se connecter
          </button>
          <button
            className="standard-button menu-join-button"
            onClick={() => {
              navigate("register");
            }}
          >
            S'enregistrer
          </button>
        </div>
      </div>
      <div
        className="lower-main-container"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className="lower-main-section-1">
          <h1 className="lower-main-subtitle-h1">Pourquoi ?</h1>

          <p className="lower-main-p">
            Le projet Basilic a été développé en autonomie dans le cadre d'une
            formation à l'école DORANCO. Il sert également de démonstration.
            <br />
            C'est un réseau social, très similaire à twitter. Il offre plusieurs
            fonctionnalités qui permettent aux utilisateurs d'intéragir.
            <br />
            En ce sens, il met en oeuvre diverses technologies. C'est un projet
            qui repose notamment sur MongoDB/Mongoose, Express, et React.
            <br />
            C'est également un projet open-source. Tout est accessible sur{" "}
            <a className="link-button" href="http://github.com/ali-bennezia">
              Github
            </a>
          </p>
          <h4 className="lower-main-subtitle-h4">
            Quelques unes des technologies employées
          </h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "50%",
              }}
            >
              <img src="/img/logos/expressJS_logo.png" height="175" />
              <img src="/img/logos/mongodb_logo.png" height="75" />
              <img src="/img/logos/nodejs_logo.png" height="150" />
            </div>
          </div>

          <h1 className="lower-main-subtitle-h1">Comment ?</h1>

          <p className="lower-main-p">
            Le projet est organisé selon le principe d'architecture n-tiers.
            <br />
            <h4 className="lower-main-subtitle-h5">La couche IHM</h4>
            <br />
            La première couche, la plus superficielle, est la couche IHM. Elle
            est basée sur React et permet aux utilisateurs d'intéragir avec le
            réseau.
            <br />
            Elle concerne la partie la plus visible du projet. Elle communique
            par ailleurs avec la seconde couche, la couche métier.
            <br />
            <h4 className="lower-main-subtitle-h5">La couche métier</h4>
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageAccueil;
