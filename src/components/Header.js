import { useState } from "react";
import { CONSTS } from "../consts";
import Modal from "./Modal";
import styles from "./modules/Header.module.css";
import TimerDisplay from "./TimerDisplay";
import {
  IoArrowUndoSharp,
  IoSettingsOutline,
  IoSparkles,
} from "react-icons/io5";
import { settings } from "./hooks/gameState/actions";

function NewGameButton({ startNewGame, playEnabled }) {
  const [newGameModalOpen, setNewGameModalOpen] = useState();

  const newGame = () => {
    startNewGame();
    setNewGameModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setNewGameModalOpen(true)} disabled={!playEnabled}>
        <IoSparkles />
        new game
      </button>
      {newGameModalOpen && (
        <Modal>
          <div className={styles.modal}>
            <h1>Start New Game?</h1>
            <div>
              <button onClick={newGame}>yes</button>
              <button onClick={() => setNewGameModalOpen(false)}>cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function Header({
  undo,
  undoDisabled,
  state,
  dispatcher,
  startNewGame,
  secondsElapsed,
  playEnabled,
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(state.settings.difficulty);
  const [cardBack, setCardBack] = useState(state.settings.cardBack);

  function onSettingsBtnClick() {
    setDifficulty(state.settings.difficulty);

    setSettingsOpen(true);
  }

  function onCancelBtnClick() {
    setDifficulty(state.settings.difficulty);

    setSettingsOpen(false);
  }

  function onFormSubmint(e) {
    e.preventDefault();

    dispatcher(settings(difficulty, cardBack));

    if (state.settings.difficulty !== difficulty) startNewGame();

    setSettingsOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <span className={styles.title}>Solitaire</span>
          <NewGameButton
            startNewGame={startNewGame}
            playEnabled={playEnabled}
          />
          <button onClick={undo} disabled={undoDisabled}>
            <IoArrowUndoSharp />
            undo
          </button>
        </div>
        <TimerDisplay secondsElapsed={secondsElapsed} />
        <div className={styles.settingBtn} onClick={onSettingsBtnClick}>
          <IoSettingsOutline />
        </div>
      </header>
      {settingsOpen && (
        <Modal>
          <div className={styles.modal}>
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
                <button onClick={onCancelBtnClick}>cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Header;
