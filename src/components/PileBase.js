import { CONSTS, piles, isFoundation, isPile } from "../consts";
import CardImage from "./CardImage";
import styles from "./modules/PileBase.module.css";

function PileBase({ id, scaleFactor, onSelect }) {
  const positionX =
    (CONSTS.spacer + piles[id].base.x * CONSTS.spacer) * scaleFactor;
  const positionY =
    (CONSTS.spacer + piles[id].base.y * CONSTS.spacer) * scaleFactor;

  const handleClick = () => onSelect(id);

  const bgImage = isFoundation(id)
    ? `foundation-${piles[id].suit}`
    : isPile(id)
    ? "pile"
    : id === "deck"
    ? "deck"
    : "discardPile";

  return (
    <div
      id={id}
      className={styles.stack}
      onClick={handleClick}
      style={{
        width: CONSTS.cardDimensions.x * scaleFactor,
        height: CONSTS.cardDimensions.y * scaleFactor,
        left: `${positionX}px`,
        top: `${positionY}px`,
        borderRadius: `${10 * scaleFactor}px`,
      }}
    >
      <CardImage id={bgImage} />
    </div>
  );
}

export default PileBase;
