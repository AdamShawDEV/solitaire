import './App.css';
import Solitaire from './components/Solitaire';
import { useState } from 'react';


function App() {
  const [gameKey, setGameKey] = useState(0);
  
  return (
    <div className="App">
      <Solitaire key={gameKey} startNewGame={() => setGameKey(curr => curr + 1)} />
    </div>
  );
}


export default App;
