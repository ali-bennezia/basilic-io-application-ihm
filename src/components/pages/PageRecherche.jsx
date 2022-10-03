//React et routeur.
import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AuthentificationContext from "../../contexts/AuthentificationContext";

//Composantes.
import BasePage from "./commun/BasePage";
import FluxPosts from "./contenu/FluxPosts";

//Composantes de packages.
import Snackbar from "@mui/material/Snackbar";

//Packages et utilitaires.
import config from "../../config/config.json";
import axios from "axios";

function PageRecherche() {
  //Variables d'état.
  const [sbMsg, setSbMsg] = useState("");
  const [sbIsOpen, setSbIsOpen] = useState(false);

  //Paramètres d'URL.
  const { query } = useParams();

  //Refs.
  const fluxRef = useRef();

  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Relance de recherches.
  useEffect(() => {
    fluxRef.current.clearPosts();
  }, [query]);

  //Configuration de la page.
  const firstFetch = () =>
    axios.get(
      `${
        config.applicationServerURL
      }posts/flux/search/get/10&${encodeURIComponent(query)}`,
      {
        headers:
          authPayload != null && authPayload.token != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );
  const timestampFetch = (tmsp) =>
    axios.get(
      `${
        config.applicationServerURL
      }posts/flux/search/get/10&${encodeURIComponent(
        tmsp
      )}&${encodeURIComponent(query)}`,
      {
        headers:
          authPayload != null && authPayload.token != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );

  return (
    <BasePage
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      frameStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ height: "80px" }} />
      <FluxPosts
        setFormNotificationMessage={setSbMsg}
        setFormNotificationOpen={setSbIsOpen}
        fetchPostsPromise={firstFetch}
        fetchMorePostsPromise={timestampFetch}
        ref={fluxRef}
      />
      <Snackbar
        message={sbMsg}
        open={sbIsOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSbIsOpen(false);
        }}
      />
    </BasePage>
  );
}

export default PageRecherche;
