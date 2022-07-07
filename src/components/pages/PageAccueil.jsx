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

  //Gestion du fond de vagues.
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

  return (
    <div className="main-page-organizer">
      <div id="waves-background-div" ref={waveBackgroundElement}>
        <div id="title-box-div">
          <img src="img/basilic_titre_mid_res.png" id="main-page-title-img" />
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
            />
            <Button
              variant="outline-secondary"
              id="main-input-search-button"
              onClick={() => {
                navigate(`/search?q=${encodeURI(searchInput)}`);
              }}
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
      </div>
    </div>
  );
}

export default PageAccueil;
