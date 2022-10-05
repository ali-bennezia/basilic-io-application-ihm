//React & routeur.
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//Composantes.
import { AuthentifiedRedirection } from "../redirection/AuthentifiedRedirection";

//Composantes packages.
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import MoonLoader from "react-spinners/MoonLoader";

//Packages et utilitaires.
import axios from "axios";
import config from "../../config/config.json";

//Style
import "./commun/PagesCommun.css";

function PageEntree() {
  //Params.
  const { identifierType, identifier, key } = useParams();

  //Variables d'état.
  const [fetching, setFetching] = useState(true);
  const [errorState, setErrorState] = useState(false);

  //Navigate.
  const navigate = useNavigate();

  //Callbacks.
  const sendRequest = () => {
    axios
      .post(
        `${config.applicationServerURL}auth/recpwd/entry&${identifierType}&${identifier}&${key}`
      )
      .then((data) => {
        let code = data.data;
        setFetching(false);
        navigate(`/cleeauth/${identifierType}&${identifier}&${code}`);
      })
      .catch((err) => {
        setErrorState(true);
        setFetching(false);
        console.log(err);
      });
  };

  //Effets.
  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div
      className="main-page-organizer"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AuthentifiedRedirection to="/flux" />
      <img
        src="/img/basilic_titre_mid_res.png"
        id="main-page-title-img"
        alt="Basilic"
      />
      <div
        className="form-container"
        style={fetching ? { padding: "80px" } : {}}
      >
        {fetching ? (
          <MoonLoader color="green" />
        ) : (
          <>
            <p>Erreur. Confirmation impossible.</p>
            <br />
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  navigate("/oubli");
                }}
                className="standard-button"
              >
                Retour
              </Button>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default PageEntree;
