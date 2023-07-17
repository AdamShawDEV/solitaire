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
import Card from "./Card";
import PileBase from "./PileBase";
import useScaleFactor from "./hooks/useScaleFactor";

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

  function onSelect(e) {
    if (!playEnabled) return;
    const clickedItem = e.target.id;

    if (!isTimerRunning) startTimer();

    // if deck is clicked deal cards
    if (state.cardMap[clickedItem] === "deck" || clickedItem === "deck") {
      dispatch(deal());
      setSelection(null);
      return;
    }

    // if clicked card is already selected deselect it
    if (selection === clickedItem) {
      setSelection(null);
      return;
    }

    // no card card is selected
    if (!selection && isCard(clickedItem)) {
      if (state.cards[clickedItem].face === "down") {
        const stackName = state.cardMap[clickedItem];
        if (
          state[stackName].findIndex((i) => i === clickedItem) ===
          state[stackName].length - 1
        ) {
          dispatch(turnOverCard(clickedItem));
        }
        return;
      } else if (state.cardMap[clickedItem] === "discardPile") {
        setSelection(state.discardPile.at(-1));
        return;
      }
      setSelection(clickedItem);
      return;
    } else if (selection) {
      // check if legal move
      const card = selection;
      const origin = state.cardMap[selection];
      const destination = isCard(clickedItem)
        ? state.cardMap[clickedItem]
        : clickedItem;

      if (isPile(destination)) {
        if (state[destination].length === 0) {
          if (state.cards[card].rank === 13) {
            dispatch(move(card, origin, destination));
          }
        } else if (
          state.cards[state[destination].at(-1)].rank ===
            state.cards[card].rank + 1 &&
          state.cards[state[destination].at(-1)].color !==
            state.cards[card].color &&
          state.cards[state[destination].at(-1)].face === "up"
        ) {
          dispatch(move(card, origin, destination));
        }
      } else if (
        isFoundation(destination) &&
        piles[destination].suit === state.cards[card].suit &&
        state.cards[card].rank === state[destination].length + 1
      ) {
        dispatch(move(card, origin, destination));
      }

      dispatch(checkGameState());
      setSelection(null);
    }
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
      <div
        className="game"
        style={{
          width: `${CONSTS.maxWidth * scaleFactor}px`,
          height: `${CONSTS.maxHeight * scaleFactor}px`,
        }}
      >
        <div
          className={styles.stateDisplay}
          style={{ fontSize: `${20 * scaleFactor}px` }}
        >
          <h2>moves: {state.numMoves}</h2>
          <h2>points: {state.points}</h2>
        </div>
        {Object.keys(piles).map((key) => (
          <PileBase
            key={key}
            id={key}
            scaleFactor={scaleFactor}
            onSelect={onSelect}
            selection={selection}
          />
        ))}
        {Object.keys(state.cards).map((cardName) => (
          <Card
            key={cardName}
            id={cardName}
            idx={state[state.cardMap[cardName]].findIndex(
              (element) => element === cardName
            )}
            selected={selection === cardName}
            onSelect={onSelect}
            stack={state.cardMap[cardName]}
            scaleFactor={scaleFactor}
            state={state}
          />
        ))}
      </div>
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
