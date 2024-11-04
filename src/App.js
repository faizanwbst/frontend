import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dominoes from "./Components/Dominoes.jsx";
import Games from "./Components/game/Game/Games.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import CreateGame from "./Components/game/Game/CreateGame.jsx";
import GameScreen from "./Components/game/Game/GameScreen.jsx";

function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Dominoes />}/> */}
            <Route path="/" element={<Games />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/game" element={<GameScreen />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
