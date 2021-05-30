import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppNavBar } from "./AppNavBar";
import { RouteHandler } from "./RouteHandler";

const App = () => {
  const [currentMenu, setCurrentMenu] = useState("home");
  useEffect(() => {
    setCurrentMenu(window.location.pathname.split("/")[1]);
  }, []);

  const handleMenu = (e) => {
    setCurrentMenu(e.key);
  }
  
  return (
    <Router>
      {AppNavBar(handleMenu, currentMenu)}
      <div style={{padding: 20}}>{RouteHandler}</div>
    </Router>
  );
}

export default App;


