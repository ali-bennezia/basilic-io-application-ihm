import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthentificationContextProvider } from "./contexts/AuthentificationContext";

import PageAccueil from "./components/pages/PageAccueil";

import PageInscription from "./components/pages/PageInscription";
import PageConnexion from "./components/pages/PageConnexion";

import PageFlux from "./components/pages/PageFlux";
import PageProfil from "./components/pages/profil/PageProfil";
import PageMessages from "./components/pages/PageMessages";
import PageParams from "./components/pages/params/PageParams";
import PageValidation from "./components/pages/profil/validation/PageValidation";

function App() {
  return (
    <AuthentificationContextProvider>
      <Router>
        <Routes>
          <Route path="/valider" element={<PageValidation />} />
          <Route path="/flux" element={<PageFlux />} />
          <Route path="/profil" element={<PageProfil />} />
          <Route path="/profil/:userId" element={<PageProfil />} />
          <Route path="/params" element={<PageParams />} />
          <Route path="/messages" element={<PageMessages />} />
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
