import { useState } from "react";
import Modal from "./Modal";
import { CONSTS } from "../consts";
import { settings } from "./hooks/gameState/actions";
import useGameState from "./hooks/gameState/useGameState";

function SettingsModal({ handleClose, startNewGame, state, dispatcher }) {
  const [difficulty, setDifficulty] = useState(state.settings.difficulty);
  const [cardBack, setCardBack] = useState(state.settings.cardBack);

  function onFormSubmint(e) {
    e.preventDefault();

    dispatcher(settings(difficulty, cardBack));

    if (state.settings.difficulty !== difficulty) startNewGame();

    handleClose();
  }

  return (
    <Modal>
      <div>
        {/* className={styles.modal}> */}
        <h1>Settings</h1>
        <form onSubmit={(e) => onFormSubmint(e)}>
          <label>Difficulty: </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">easy: draw 1</option>
            <option value="hard">hard: draw 3</option>
          </select>
          <label>Card Backs: </label>
          <select
            value={cardBack}
            onChange={(e) => setCardBack(e.target.value)}
          >
            {CONSTS.cardBacks.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <div>
            <button>submit</button>
            <button onClick={handleClose}>cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default SettingsModal;
