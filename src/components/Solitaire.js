import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";
import useGameState from "./hooks/useGameState";
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

function Solitaire() {
  const { state, dispatcher } = useGameState();
  const [selection, setSelection] = useState(null);
  const { windowDimentions } = useWindowDimensions();
  const [playEnabled, setPlayEnabled] = useState(true);
  const { secondsElapsed, resetTimer, startTimer, stopTimer, isTimerRunning } =
    useTimer(state.elapsedTime);
  const scaleFactor = Math.min(
    windowDimentions.width / CONSTS.maxWidth,
    (windowDimentions.height - CONSTS.headerHeight) / CONSTS.maxHeight,
    1
  );

  // if game over stop timer
  useEffect(() => {
    if (state.gameState === GAME_STATE.WON) {
      stopTimer();
    }
    // eslint-disable-next-line
  }, [state.gameState]);

  // timer points
  if (state.timerIntervalsElapsed < Math.floor(secondsElapsed / 10)) {
    dispatcher({
      type: "addPoints",
      pointsToAdd: -2,
      elapsedTime: secondsElapsed,
    });
  }

  async function startNewGame() {
    stopTimer();
    resetTimer();
    setSelection(null);
    setPlayEnabled(false);
    dispatcher({ type: "stackCards" });
    await new Promise((result) => setTimeout(result, CONSTS.dealCardsDelay));
    dispatcher({ type: "dealCards" });
    setPlayEnabled(true);
  }

  function undo() {
    if (state.undoIdx < 0) return;

    switch (state.undoArray[state.undoIdx].type) {
      case "move":
        const { card, origin, destination } = state.undoArray[state.undoIdx];
        dispatcher({
          type: "move",
          card,
          origin: destination,
          destination: origin,
          isUndo: true,
        });
        break;
      case "turnOverCard":
        const { cardName } = state.undoArray[state.undoIdx];
        dispatcher({ type: "turnOverCard", cardName, isUndo: true });
        break;
      case "deal":
        const { actionTaken, numCardsDealt } = state.undoArray[state.undoIdx];
        dispatcher({ type: "unDeal", actionTaken, numCardsDealt });
        break;
      default:
        console.log("invalid type in undo");
    }

    setSelection(null);
    dispatcher({ type: "decrementUndo" });
  }

  function onSelect(e) {
    if (!playEnabled) return;
    const clickedItem = e.target.id;

    if (!isTimerRunning) startTimer();

    // if deck is clicked deal cards
    if (state.cardMap[clickedItem] === "deck" || clickedItem === "deck") {
      dispatcher({
        type: "deal",
      });
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
          dispatcher({
            type: "turnOverCard",
            cardName: clickedItem,
          });
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
            dispatcher({
              type: "move",
              card,
              origin,
              destination,
            });
          }
        } else if (
          state.cards[state[destination].at(-1)].rank ===
            state.cards[card].rank + 1 &&
          state.cards[state[destination].at(-1)].color !==
            state.cards[card].color &&
          state.cards[state[destination].at(-1)].face === "up"
        ) {
          dispatcher({
            type: "move",
            card,
            origin,
            destination,
          });
        }
      } else if (
        isFoundation(destination) &&
        piles[destination].suit === state.cards[card].suit &&
        state.cards[card].rank === state[destination].length + 1
      ) {
        dispatcher({
          type: "move",
          card,
          origin,
          destination,
        });
      }

      dispatcher({ type: "checkGameState" });
      setSelection(null);
    }
  }

  return (
    <>
      <Header
        setPlayEnabled={setPlayEnabled}
        undo={undo}
        undoDisabled={state.undoIdx < 0}
        state={state}
        dispatcher={dispatcher}
        startNewGame={startNewGame}
        secondsElapsed={secondsElapsed}
        playEnabled={playEnabled}
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
