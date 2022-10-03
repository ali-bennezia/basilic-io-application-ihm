//React et routeur.
import React, { useContext, useState } from "react";
import AuthentificationContext from "../../contexts/AuthentificationContext";

//Composantes.
import BasePage from "./commun/BasePage";
import MultiFluxPosts from "./contenu/MultiFluxPosts";

//Composantes de packages.
import Snackbar from "@mui/material/Snackbar";

//Packages et utilitaires.
import config from "./../../config/config.json";
import axios from "axios";

function PageFlux() {
  //Variables d'état.
  const [sbMsg, setSbMsg] = useState("");
  const [sbIsOpen, setSbIsOpen] = useState(false);

  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Configuration de la page.
  const firstFetch = () =>
    axios.get(`${config.applicationServerURL}posts/flux/public/get/10`, {
      headers:
        authPayload != null && authPayload.token != null
          ? { authorization: `Bearer ${authPayload.token}` }
          : {},
    });
  const timestampFetch = (tmsp) =>
    axios.get(
      `${
        config.applicationServerURL
      }posts/flux/public/get/10&${encodeURIComponent(tmsp)}`,
      {
        headers:
          authPayload != null && authPayload.token != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );

  const firstFetchFollow = () =>
    axios.get(`${config.applicationServerURL}posts/flux/follow/get/10`, {
      headers:
        authPayload != null && authPayload.token != null
          ? { authorization: `Bearer ${authPayload.token}` }
          : {},
    });
  const timestampFetchFollow = (tmsp) => {
    console.log(tmsp);
    return axios.get(
      `${
        config.applicationServerURL
      }posts/flux/follow/get/10&${encodeURIComponent(tmsp)}`,
      {
        headers:
          authPayload != null && authPayload.token != null
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      }
    );
  };

  const commonProps = {
    showPostField: true,
    setFormNotificationOpen: setSbIsOpen,
    setFormNotificationMessage: setSbMsg,
  };

  const followsTab = {
    name: "Suivis",
    propsFlux: {
      ...commonProps,
      fetchPostsPromise: firstFetchFollow,
      fetchMorePostsPromise: timestampFetchFollow,
    },
  };

  const globalTab = {
    name: "Global",
    propsFlux: {
      ...commonProps,
      fetchPostsPromise: firstFetch,
      fetchMorePostsPromise: timestampFetch,
    },
  };

  const tabs = authPayload != null ? [followsTab, globalTab] : [globalTab];

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
      <span style={{ height: "40px" }} />
      <MultiFluxPosts tabs={tabs} />
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

export default PageFlux;
