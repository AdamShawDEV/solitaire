import { useState } from "react";
import { useGameState } from "./hooks/gameState/GameStateContext";
import {
  dealCards,
  stackCards,
  turnOverCard,
  move,
  deal,
  checkGameState,
} from "./hooks/gameState/actions";
import {
  CONSTS,
  GAME_STATE,
  piles,
  isCard,
  isPile,
  isFoundation,
} from "../consts";
import Header from "./Header";
import Modal from "./Modal";
import styles from "./modules/Solitaire.module.css";
import useTimer from "./hooks/useTimer";
import useScaleFactor from "./hooks/useScaleFactor";
import PlayField from "./PlayField";

function Solitaire() {
  const { state, dispatch } = useGameState();
  const [selection, setSelection] = useState(null);
  const [playEnabled, setPlayEnabled] = useState(true);
  const { secondsElapsed, resetTimer, startTimer, stopTimer, isTimerRunning } =
    useTimer(state.elapsedTime);
  const scaleFactor = useScaleFactor();

  async function startNewGame() {
    stopTimer();
    resetTimer();
    setSelection(null);
    setPlayEnabled(false);
    dispatch(stackCards());
    await new Promise((result) => setTimeout(result, CONSTS.dealCardsDelay));
    dispatch(dealCards());
    setPlayEnabled(true);
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
      />
      {state.gameState === GAME_STATE.WON && (
        <Modal>
          <div className={styles.gameWonModal}>
            <h1>Well Done!</h1>
            <h2>points: {state.points}</h2>
            <h2>moves: {state.numMoves}</h2>
            <h2>games played: {state.statistics.gamesPlayed}</h2>
            <h2>highScore: {state.statistics.highScore}</h2>
            <button onClick={startNewGame}>new game</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Solitaire;
