import { useState } from "react";
import styles from "./modules/Header.module.css";
import TimerDisplay from "./TimerDisplay";
import { undo } from "./hooks/gameState/actions";
import HeaderButton from "./HeaderButton";
import NewGameModal from "./NewGameModal";
import SettingsModal from "./SettingsModal";
import { useGameState } from "./hooks/gameState/GameStateContext";
import Icon from "./Icon";

const OPEN_MODAL = {
  NEW_GAME_MODAL: "NEW_GAME_MODAL",
  SETTINGS_MODAL: "SETTINGS_MODAL",
  NONE: "NONE",
};

function Header({ startNewGame, secondsElapsed, setSelection }) {
  const [openModal, setOpenModal] = useState(OPEN_MODAL.NONE);
  const [settingsButtonHover, setSettingsButtonHover] = useState(false);
  const { state, dispatch } = useGameState();

  function handleUndoBtn() {
    dispatch(undo());
    setSelection(null);
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <span className={styles.title}>Solitaire</span>
          <HeaderButton onClick={() => setOpenModal(OPEN_MODAL.NEW_GAME_MODAL)}>
            <Icon id="new" height="16" width="16" />
            new game
          </HeaderButton>
          <HeaderButton onClick={handleUndoBtn} disabled={state.undoIdx < 0}>
            <Icon id="undo" height="16" width="16" />
            undo
          </HeaderButton>
        </div>
        <TimerDisplay secondsElapsed={secondsElapsed} />
        <button
          className={styles.settingBtn}
          onClick={() => setOpenModal(OPEN_MODAL.SETTINGS_MODAL)}
          onMouseEnter={() => setSettingsButtonHover(true)}
          onMouseLeave={() => setSettingsButtonHover(false)}
        >
          <Icon
            id={settingsButtonHover ? "settingsFill" : "settingsOutline"}
            height="30"
            width="30"
          />
        </button>
      </header>
      {openModal === OPEN_MODAL.SETTINGS_MODAL ? (
        <SettingsModal
          handleClose={() => setOpenModal(OPEN_MODAL.NONE)}
          startNewGame={startNewGame}
        />
      ) : openModal === OPEN_MODAL.NEW_GAME_MODAL ? (
        <NewGameModal
          handleClose={() => setOpenModal(OPEN_MODAL.NONE)}
          startNewGame={startNewGame}
        />
      ) : null}
    </>
  );
}

export default Header;
