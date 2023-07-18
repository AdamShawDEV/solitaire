import Modal from "./Modal";
import { useGameState } from "./hooks/gameState/GameStateContext";

function GameWonModal() {
  const { state } = useGameState();

  return (
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
  );
}

export default GameWonModal;
