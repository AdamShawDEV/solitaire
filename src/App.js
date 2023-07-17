import "./App.css";
import Solitaire from "./components/Solitaire";
import GameStateProvider from "./components/hooks/gameState/GameStateContext";

function App() {
  return (
    <div className="App">
      <GameStateProvider>
        <Solitaire />
      </GameStateProvider>
    </div>
  );
}

export default App;
