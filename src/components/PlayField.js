import { useGameState } from "./hooks/gameState/GameStateContext";
import PileBase from "./PileBase";
import Card from "./Card";
import { CONSTS, piles, isCard, isPile, isFoundation } from "../consts";
import {
  turnOverCard,
  move,
  deal,
  checkGameState,
} from "./hooks/gameState/actions";
import styles from "./modules/PlayField.module.css";

function PlayField({
  scaleFactor,
  selection,
  playEnabled,
  startTimer,
  isTimerRunning,
  setSelection,
}) {
  const { state, dispatch } = useGameState();

  function onSelect(clickedItem) {
    if (!playEnabled) return;
    // const clickedItem = e.target.id;

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
      {/* draw the base of the piles*/}
      {Object.keys(piles).map((key) => (
        <PileBase
          key={key}
          id={key}
          scaleFactor={scaleFactor}
          onSelect={onSelect}
          selection={selection}
        />
      ))}
      {/* draw the cards */}
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
  );
}

export default PlayField;
