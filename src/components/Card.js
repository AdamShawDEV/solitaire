import { useState, useEffect } from "react";
import styles from "./modules/Card.module.css";
import { CONSTS, piles } from "../consts";
import { isPile } from "./hooks/gameState/gameStateUtils";
import CardImage from "./CardImage";

function Card({
  id,
  selected,
  onSelect,
  stack,
  state,
  scaleFactor,
  idx,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}) {
  const [zIndex, setZIndex] = useState(idx);

  const handleClick = () => onSelect(id);

  useEffect(() => {
    setZIndex(idx + CONSTS.numCards); // card is moving bring forward to prevent cliping
    const timerId = setTimeout(
      () => setZIndex(idx),
      CONSTS.moveDuration * 1000
    ); // card has finished moving place at correct z index

    return () => {
      clearTimeout(timerId);
      setZIndex(idx + CONSTS.numCards); // if card is about to move bring it forward on the z index
    };
  }, [stack, idx]);

  const isDraggable =
    state.cards[id].face === "up" &&
    (stack !== "discardPile" || state.discardPile.at(-1) === id);

  let positionY = 0;
  if (isPile(stack)) {
    const pileHeight =
      state[stack].length * CONSTS.spacer + CONSTS.cardDimensions.y;
    const pileHeightFactor = Math.min(CONSTS.maxPileHeight / pileHeight, 1);
    positionY =
      (CONSTS.spacer +
        CONSTS.spacer * piles[stack].base.y +
        idx * piles[stack].offset.y * pileHeightFactor) *
      scaleFactor;
  } else {
    positionY =
      (CONSTS.spacer +
        CONSTS.spacer * piles[stack].base.y +
        idx * piles[stack].offset.y) *
      scaleFactor;
  }

  let positionX = 0;
  if (stack === "discardPile" && state[stack].length > 3) {
    positionX =
      idx > state[stack].length - 4
        ? (CONSTS.spacer +
            CONSTS.spacer * piles[stack].base.x +
            (3 - (state[stack].length - idx)) * piles[stack].offset.x) *
          scaleFactor
        : (CONSTS.spacer + CONSTS.spacer * piles[stack].base.x) * scaleFactor;
  } else {
    positionX =
      (CONSTS.spacer +
        idx * piles[stack].offset.x +
        CONSTS.spacer * piles[stack].base.x) *
      scaleFactor;
  }

  return (
    <button
      id={id}
      className={`${styles.card} ${selected ? styles.selectedCard : ""}`}
      onClick={handleClick}
      draggable={isDraggable}
      onDragStart={() => handleDragStart(id)}
      onDragEnter={() => handleDragEnter(id)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
      style={computedStyles(
        scaleFactor,
        isDraggable,
        positionX,
        positionY,
        zIndex
      )}
    >
      <CardImage
        id={
          state.cards[id].face === "up" ? id : `${state.settings.cardBack}-back`
        }
      />
    </button>
  );
}

const computedStyles = (
  scaleFactor,
  isDraggable,
  positionX,
  positionY,
  zIndex
) => ({
  width: `${CONSTS.cardDimensions.x * scaleFactor}px`,
  height: `${CONSTS.cardDimensions.y * scaleFactor}px`,
  left: `${positionX}px`,
  top: `${positionY}px`,
  borderRadius: `${10 * scaleFactor}px`,
  zIndex,
  cursor: isDraggable ? "grab" : "default",
});

export default Card;
