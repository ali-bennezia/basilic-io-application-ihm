import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { AuthentifiedRedirection } from "../redirection/AuthentifiedRedirection";

import {
  EntypoGithub,
  EntypoBrowser,
  EntypoDrive,
  EntypoDatabase,
  EntypoFolderImages,
} from "react-entypo";

import Footer from "./commun/Footer";

import "./commun/PagesCommun.css";
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
    navigate(`/recherche?r=${encodeURI(searchInput)}`);
  };

  return (
    <div className="main-page-organizer">
      <AuthentifiedRedirection to="/flux" />

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
              navigate("/connexion");
            }}
          >
            Se connecter
          </button>
          <button
            className="standard-button menu-join-button"
            onClick={() => {
              navigate("/inscription");
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
          <div className="horizontal-layout-outer">
            <div className="horizontal-layout-inner">
              <img src="/img/logos/expressJS_logo.png" height="175" />
              <img src="/img/logos/mongodb_logo.png" height="75" />
              <img src="/img/logos/nodejs_logo.png" height="150" />
            </div>
          </div>

          <hr className="page-divider" />

          <h1 className="lower-main-subtitle-h1">Comment ?</h1>

          <p className="lower-main-p">
            Le projet est organisé selon les principes d'architecture n-tiers et
            MVC. Par ailleurs, il est divisé en plusieurs microservices répartis
            sur différentes couches.
            <br />
            La communication entre tout ces microservices se fait principalement
            par le biais d'APIs REST.
            <br />
          </p>
          <h5 className="lower-main-subtitle-h5">La couche IHM</h5>
          <p className="lower-main-p">
            La première couche, la plus superficielle, est la couche IHM. Elle
            est basée sur React et permet aux utilisateurs d'intéragir avec le
            réseau.
            <br />
            Elle concerne la partie la plus visible du projet. Elle communique
            par ailleurs avec la seconde couche, la couche métier.
            <br />
          </p>
          <h5 className="lower-main-subtitle-h5">La couche métier</h5>
          <p className="lower-main-p">
            La couche métier est celle sur laquelle se déroulent la plupart des
            traitements. C'est notamment sur cette couche que se trouve
            <br />
            en grande majorité toute la logique qui régis le réseau. Elle est la
            couche principale du projet et celle qui a demandé le plus de temps
            de développement.
            <br />
            Elle fonctionne sur NodeJS, conjointement avec le framework Express.{" "}
            <br />
            Par ailleurs, la communication entre les différentes couches se fait
            principalement par le biais d'APIs REST.
          </p>
          <h5 className="lower-main-subtitle-h5">La couche de données</h5>
          <p className="lower-main-p">
            La couche la plus profonde, la couche de données, contient la base
            de donnée ainsi que les médias.
            <br />
            C'est donc sur cette couche que sont stoquées toutes les
            informations et tout le contenu du réseau, ce qui inclut aussi bien
            les membres que des photos, des vidéos, des posts.
            <br />
            Sur cette couche se trouvent deux serveurs: l'un gérant la base de
            donnée, l'autre gérant les médias.
          </p>
          <h5 className="lower-main-subtitle-h5">Illustration</h5>
          <div className="horizontal-layout-outer">
            <div
              className="horizontal-layout-inner"
              style={{
                padding: "40px",
                width: "38%",
              }}
            >
              <div className="circle-server-illustration">
                <EntypoBrowser
                  className="circle-server-icon"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="circle-server-subtitle">Interface</p>
              </div>

              <div className="circle-server-arrow-container">
                <img src="/img/accueil/fleche-bidir.png" />
              </div>

              <div className="circle-server-illustration">
                <EntypoDrive
                  className="circle-server-icon"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="circle-server-subtitle">Serveur d'application</p>
              </div>

              <div className="circle-server-arrow-container">
                <img src="/img/accueil/fleche-bidir.png" />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <div className="circle-server-illustration">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "-10px",
                      marginTop: "12px",
                    }}
                  >
                    <EntypoDatabase
                      className="circle-server-icon"
                      style={{
                        width: "65%",
                        height: "65%",
                      }}
                    />
                  </div>

                  <p className="circle-server-subtitle">
                    Base de
                    <br />
                    données
                  </p>
                </div>
                <div className="circle-server-illustration">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "-10px",
                      marginTop: "12px",
                    }}
                  >
                    <EntypoFolderImages
                      className="circle-server-icon"
                      style={{
                        width: "65%",
                        height: "65%",
                      }}
                    />
                  </div>

                  <p className="circle-server-subtitle">
                    Serveur de
                    <br />
                    médias
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p id="circle-server-description">
            Ci-dessus, une illustration des trois couches du réseau.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageAccueil;
