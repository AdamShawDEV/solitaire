import { useState } from "react";
import styles from "./modules/Header.module.css";
import TimerDisplay from "./TimerDisplay";
import {
  IoArrowUndoSharp,
  IoSettingsOutline,
  IoSparkles,
} from "react-icons/io5";
import HeaderButton from "./HeaderButton";
import NewGameModal from "./NewGameModal";
import SettingsModal from "./SettingsModal";

const OPEN_MODAL = {
  NEW_GAME_MODAL: "NEW_GAME_MODAL",
  SETTINGS_MODAL: "SETTINGS_MODAL",
  NONE: "NONE",
};

function Header({
  undo,
  undoDisabled,
  state,
  dispatcher,
  startNewGame,
  secondsElapsed,
  playEnabled,
}) {
  const [openModal, setOpenModal] = useState(OPEN_MODAL.NONE);

  return (
    <>
      <header className={styles.header}>
        <div>
          <span className={styles.title}>Solitaire</span>
          <HeaderButton
            onClick={() => setOpenModal(OPEN_MODAL.NEW_GAME_MODAL)}
            playEnabled={playEnabled}
          >
            <IoSparkles />
            new game
          </HeaderButton>
          <HeaderButton onClick={undo} disabled={undoDisabled}>
            <IoArrowUndoSharp />
            undo
          </HeaderButton>
        </div>
        <TimerDisplay secondsElapsed={secondsElapsed} />
        <div
          className={styles.settingBtn}
          onClick={() => setOpenModal(OPEN_MODAL.SETTINGS_MODAL)}
        >
          <IoSettingsOutline />
        </div>
      </header>
      {openModal === OPEN_MODAL.SETTINGS_MODAL ? (
        <SettingsModal
          handleClose={() => setOpenModal(OPEN_MODAL.NONE)}
          state={state}
          dispatcher={dispatcher}
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
