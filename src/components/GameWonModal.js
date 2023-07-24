import styles from "./modules/GameWonModal.module.css";
import Modal from "./Modal";
import { useGameState } from "./hooks/gameState/GameStateContext";
import Button from "./Button";

function GameWonModal({ startNewGame }) {
  const { state } = useGameState();

  return (
    <Modal>
      <div className={styles.gameWonModal}>
        <h1>Well Done!</h1>
        <h2>points: {state.points}</h2>
        <h2>moves: {state.numMoves}</h2>
        <h2>games played: {state.statistics.gamesPlayed}</h2>
        <h2>highScore: {state.statistics.highScore}</h2>
        <Button onClick={startNewGame}>new game</Button>
      </div>
    </Modal>
  );
}

export default GameWonModal;
