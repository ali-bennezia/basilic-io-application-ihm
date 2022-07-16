import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PageAccueil from "./components/pages/PageAccueil";
import PageInscription from "./components/pages/PageInscription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inscription" element={<PageInscription />} />
        <Route path="/" element={<PageAccueil />} />
      </Routes>
    </Router>
  );
}

export default App;

//       <Route path="/search" element={<PageAccueil />} />
