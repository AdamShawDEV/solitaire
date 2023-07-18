import { useState } from "react";
import styles from "./modules/Header.module.css";
import TimerDisplay from "./TimerDisplay";
import {
  IoArrowUndoSharp,
  IoSettingsOutline,
  IoSparkles,
} from "react-icons/io5";
import {
  turnOverCard,
  move,
  unDeal,
  decrementUndo,
} from "./hooks/gameState/actions";
import HeaderButton from "./HeaderButton";
import NewGameModal from "./NewGameModal";
import SettingsModal from "./SettingsModal";
import { useGameState } from "./hooks/gameState/GameStateContext";

const OPEN_MODAL = {
  NEW_GAME_MODAL: "NEW_GAME_MODAL",
  SETTINGS_MODAL: "SETTINGS_MODAL",
  NONE: "NONE",
};

function Header({ startNewGame, secondsElapsed, setSelection }) {
  const [openModal, setOpenModal] = useState(OPEN_MODAL.NONE);
  const { state, dispatch } = useGameState();

  function undo() {
    if (state.undoIdx < 0) return;

    switch (state.undoArray[state.undoIdx].type) {
      case "move":
        const { card, origin, destination } = state.undoArray[state.undoIdx];
        dispatch(move(card, destination, origin, true));
        break;
      case "turnOverCard":
        const { cardName } = state.undoArray[state.undoIdx];
        dispatch(turnOverCard(cardName, true));
        break;
      case "deal":
        const { actionTaken, numCardsDealt } = state.undoArray[state.undoIdx];
        dispatch(unDeal(actionTaken, numCardsDealt));
        break;
      default:
        console.log("invalid type in undo");
    }

    setSelection(null);
    dispatch(decrementUndo());
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <span className={styles.title}>Solitaire</span>
          <HeaderButton onClick={() => setOpenModal(OPEN_MODAL.NEW_GAME_MODAL)}>
            <IoSparkles />
            new game
          </HeaderButton>
          <HeaderButton onClick={undo} disabled={state.undoIdx < 0}>
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
