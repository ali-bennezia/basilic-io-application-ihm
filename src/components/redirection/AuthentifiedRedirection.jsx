import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthentificationContext from "../../contexts/AuthentificationContext";

//Composante permettant la redirection si l'utilisateur est connecté et authentifié.
export default function AuthentifiedRedirection({ to }) {
  const authContextProps = useContext(AuthentificationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (authContextProps.authPayload != null) navigate(to);
  }, []);
  return <></>;
}
