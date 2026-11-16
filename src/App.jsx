
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Bestiary from "./pages/Bestiary";
import LootGenerator from "./pages/LootGenerator";
import DiceTray from "./pages/DiceTray";

function App() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home onNavigate={setActivePage} />;

      case "bestiary":
        return <Bestiary />;

      case "loot":
        return <LootGenerator />;

      case "dice":
        return <DiceTray />;

      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="main-container">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
