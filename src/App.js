import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageAccueil from "./components/pages/PageAccueil";

function App() {
  //<div className="App">
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageAccueil />} />
      </Routes>
    </Router>
  );
}

export default App;
