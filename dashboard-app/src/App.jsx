import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Details from "./pages/Details";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";
import Header from "./components/header";

const App = () => {
  return (
    <Router>
      <Header/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/details" element={<Details />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

/*
src/
├── components/         // Återanvändbara komponenter (Navbar, Chart, Table)
├── pages/              // Huvudsidor (Overview, Details, Settings)
├── features/           // Redux-slices och API-hantering
├── hooks/              // Custom hooks för delad logik
├── services/           // API-anrop
├── styles/             // CSS/SCSS/Tailwind
├── App.jsx             // Huvudkomponent
├── index.jsx           // Ingångspunkt
*/

// Steg 7: Bygg sidor och integrera data
// =====================================
// - Overview: Visa huvudstatistik med diagram och summeringar.
// - Details: Lista detaljerad data i tabellform, med filter- och sorteringsalternativ.
// - Settings: Låt användare justera visningsinställningar.

// Förslag på sidlayout:
// Overview-sida:
// - Toppdel: Summering av data (Total värde, Antal poster).
// - Mitten: Diagramkomponent (t.ex. linjediagram för utveckling över tid).
// - Botten: Snabblänkar till detaljsidor.

// Details-sida:
// - Toppdel: Filteralternativ för att söka eller sortera data (med Redux state).
// - Mittdel: Tabellkomponent som listar alla data.

// Settings-sida:
// - Formulär för att välja inställningar (t.ex. tema, tidszon, antal poster per sida).

