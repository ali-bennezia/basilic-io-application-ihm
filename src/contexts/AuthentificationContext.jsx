import React, { createContext, useState } from "react";

const AuthentificationContext = createContext();

function AuthentificationContextProvider(props) {
  let savedAuthPayload = localStorage.getItem("authPayload");

  const [authPayload, setAuthPayload] = useState(savedAuthPayload);

  return (
    <AuthentificationContext.Provider
      value={{ authPayload: authPayload, setAuthPayload: setAuthPayload }}
    >
      {props.children}
    </AuthentificationContext.Provider>
  );
}

export { AuthentificationContextProvider };
export default AuthentificationContext;
