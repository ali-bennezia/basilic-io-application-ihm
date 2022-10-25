import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthentificationContextProvider } from "./contexts/AuthentificationContext";

import Routage from "./Routage";

function App() {
  return (
    <AuthentificationContextProvider>
      <Routage />
    </AuthentificationContextProvider>
  );
}

export default App;
