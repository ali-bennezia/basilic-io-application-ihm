import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageAccueil from "./components/pages/PageAccueil";

import PageInscription from "./components/pages/PageInscription";
import PageConnexion from "./components/pages/PageConnexion";

import PageFlux from "./components/pages/PageFlux";
import PageProfil from "./components/pages/profil/PageProfil";
import PageMessages from "./components/pages/messages/PageMessages";
import PageConversation from "./components/pages/messages/PageConversation";
import PageParams from "./components/pages/params/PageParams";
import PageValidation from "./components/pages/profil/validation/PageValidation";
import PagePost from "./components/pages/PagePost";

import AuthentificationContext from "./contexts/AuthentificationContext";

import config from "./config/config.json";

function Routage() {
  return (
    <Router>
      <Routes>
        <Route path="/post/:postId" element={<PagePost />} />
        <Route path="/valider" element={<PageValidation />} />
        <Route path="/flux" element={<PageFlux />} />
        <Route path="/profil" element={<PageProfil />} />
        <Route path="/profil/:userId" element={<PageProfil />} />
        <Route path="/params" element={<PageParams />} />
        <Route path="/messages" element={<PageMessages />} />
        <Route
          path="/conversation/:userIdA&:userIdB"
          element={<PageConversation />}
        />
        <Route path="/inscription" element={<PageInscription />} />
        <Route path="/connexion" element={<PageConnexion />} />
        <Route path="/" element={<PageAccueil />} />
      </Routes>
    </Router>
  );
}

export default Routage;
