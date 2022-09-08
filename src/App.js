import './App.css';
import Solitair from './components/Solitair';
import { useState } from 'react';


function App() {
  const [gameKey, setGameKey] = useState(0);
  
  return (
    <div className="App">
      <Solitair key={gameKey} startNewGame={() => setGameKey(curr => curr + 1)} />
    </div>
  );
}


export default App;
