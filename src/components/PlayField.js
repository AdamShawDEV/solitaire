import { useGameState } from "./hooks/gameState/GameStateContext";
import PileBase from "./PileBase";
import Card from "./Card";
import { CONSTS, piles } from "../consts";
import { isCard } from "./hooks/gameState/gameStateUtils";
import { turnOverCard, move, deal } from "./hooks/gameState/actions";
import styles from "./modules/PlayField.module.css";
import { useRef } from "react";

function PlayField({
  scaleFactor,
  selection,
  playEnabled,
  startTimer,
  isTimerRunning,
  setSelection,
}) {
  const { state, dispatch } = useGameState();
  const dragItemRef = useRef(null);
  const dragOverItemRef = useRef(null);

  function onSelect(clickedItem) {
    if (!playEnabled) return;

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

      dispatch(move(card, origin, destination));

      setSelection(null);
    }
  }

  function handleDragStart(cardId) {
    dragItemRef.current = cardId;
    console.log("darg start " + cardId);
  }

  function handleDragEnter(cardId) {
    dragOverItemRef.current = cardId;
    console.log("drag enter " + cardId);
  }

  function handleDragEnd() {
    if (dragItemRef.current === dragOverItemRef.current) return;

    const card = dragItemRef.current;
    const origin = state.cardMap[dragItemRef.current];
    const destination = isCard(dragOverItemRef.current)
      ? state.cardMap[dragOverItemRef.current]
      : dragOverItemRef.current;

    dispatch(move(card, origin, destination));

    dragItemRef.current = null;
    dragOverItemRef.current = null;
    setSelection(null);
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
          handleDragEnter={handleDragEnter}
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
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}

export default PlayField;
