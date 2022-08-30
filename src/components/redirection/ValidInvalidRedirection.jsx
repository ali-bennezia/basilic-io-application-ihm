import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthentificationContext from "../../contexts/AuthentificationContext";

//Composante permettant la redirection si l'utilisateur est connecté, authentifié, et validé.
function ValidRedirection({ to }) {
  const authContextProps = useContext(AuthentificationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (
      authContextProps.authProfile != null &&
      authContextProps.authProfile.valide === true
    )
      navigate(to);
  }, []);
  return <></>;
}

//Composante permettant la redirection si l'utilisateur n'est pas connecté sur un compte valide.
function InvalidRedirection({ to }) {
  const authContextProps = useContext(AuthentificationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (
      authContextProps.authProfile == null ||
      authContextProps.authProfile.valide == false
    )
      navigate(to);
  }, []);
  return <></>;
}

export { ValidRedirection, InvalidRedirection };
