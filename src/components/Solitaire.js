import { useState } from "react";
import { useGameState } from "./hooks/gameState/GameStateContext";
import { dealCards, stackCards } from "./hooks/gameState/actions";
import { CONSTS, GAME_STATE } from "../consts";
import Header from "./Header";
// import styles from "./modules/Solitaire.module.css";
import useTimer from "./hooks/useTimer";
import useScaleFactor from "./hooks/useScaleFactor";
import PlayField from "./PlayField";
import GameWonModal from "./GameWonModal";

function Solitaire() {
  const { state, dispatch } = useGameState();
  const [selection, setSelection] = useState(null);
  const [playEnabled, setPlayEnabled] = useState(true);
  const { secondsElapsed, resetTimer, startTimer, stopTimer, isTimerRunning } =
    useTimer(state.elapsedTime);
  const scaleFactor = useScaleFactor();

  function startNewGame() {
    const startNewGameAsync = async () => {
      stopTimer();
      resetTimer();
      setSelection(null);
      setPlayEnabled(false);
      dispatch(stackCards());
      await new Promise((result) => setTimeout(result, CONSTS.dealCardsDelay));
      dispatch(dealCards());
      setPlayEnabled(true);
    };

    startNewGameAsync();
  }

  return (
    <>
      <Header
        setPlayEnabled={setPlayEnabled}
        startNewGame={startNewGame}
        secondsElapsed={secondsElapsed}
        playEnabled={playEnabled}
        setSelection={setSelection}
      />
      <PlayField
        scaleFactor={scaleFactor}
        selection={selection}
        startTimer={startTimer}
        isTimerRunning={isTimerRunning}
        playEnabled={playEnabled}
        setSelection={setSelection}
      />
      {state.gameState === GAME_STATE.WON && (
        <GameWonModal startNewGame={startNewGame} />
      )}
    </>
  );
}

export default Solitaire;
