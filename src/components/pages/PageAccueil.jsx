import React, { useEffect, useRef } from "react";
import "./PagesCommon.css";
import "./PageAccueil.css";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

function PageAccueil() {
  const monElement = useRef();
  useEffect(() => {
    WAVES({
      el: monElement.current,
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: monElement.current.offsetWidth,
      minWidth: monElement.current.offsetHeight,
      scale: 1,
      scaleMobile: 1.0,
      color: 0x2f3c2f,
      shininess: 0.0,
      waveHeight: 3.5,
      waveSpeed: 1.1,
      zoom: 0.2,
    });
    console.log(monElement.current.getAttribute("width"));
  }, []);

  return (
    <div className="main-page-organizer">
      <div id="waves-background-div" ref={monElement}>
        <div id="title-box-div">
          <img src="img/basilic_titre_mid_res.png" id="main-page-title-img" />
          <h2 id="main-subtitle-h2">
            Un réseau social français et open-source.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PageAccueil;
