import { useState, useEffect } from "react";
import styles from "./modules/Card.module.css";
import { CONSTS, piles, isPile } from "../consts";

function Card({ id, selected, onSelect, stack, state, scaleFactor, idx }) {
  const [zIndex, setZIndex] = useState(idx);

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

  const bgImage = `url(${
    state.cards[id].face === "up"
      ? `./images/${id}.svg`
      : `./images/${state.settings.cardBack}-back.svg`
  })`;

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
    <div
      id={id}
      className={`${styles.card} ${selected ? styles.selectedCard : ""}`}
      onClick={(e) => onSelect(e)}
      style={{
        width: `${CONSTS.cardDimensions.x * scaleFactor}px`,
        height: `${CONSTS.cardDimensions.y * scaleFactor}px`,
        left: `${positionX}px`,
        top: `${positionY}px`,
        backgroundColor: `${
          state.cards[id].face === "down" ? "purple" : "red"
        }`,
        backgroundImage: bgImage,
        backgroundSize: `100%`,
        borderRadius: `${10 * scaleFactor}px`,
        zIndex,
      }}
    ></div>
  );
}

export default Card;
