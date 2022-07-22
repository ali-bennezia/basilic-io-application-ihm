import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PageAccueil from "./components/pages/PageAccueil";
import PageInscription from "./components/pages/PageInscription";
import PageConnexion from "./components/pages/PageConnexion";
import { AuthentificationContextProvider } from "./contexts/AuthentificationContext";

function App() {
  useEffect(() => {
    console.log("test");
  });
  return (
    <AuthentificationContextProvider>
      <Router>
        <Routes>
          <Route path="/inscription" element={<PageInscription />} />
          <Route path="/connexion" element={<PageConnexion />} />
          <Route path="/" element={<PageAccueil />} />
        </Routes>
      </Router>
    </AuthentificationContextProvider>
  );
}

export default App;

//       <Route path="/search" element={<PageAccueil />} />
