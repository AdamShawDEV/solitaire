import { CONSTS, piles, isFoundation, isPile } from "../consts";
import styles from './modules/PileBase.module.css';

 function PileBase({ id, scaleFactor, onSelect }) {
    const positionX = (CONSTS.spacer + piles[id].base.x * CONSTS.spacer) * scaleFactor;
    const positionY = (CONSTS.spacer + piles[id].base.y * CONSTS.spacer) * scaleFactor;

    const bgImage =
        isFoundation(id) ? `foundation-${piles[id].suit}` :
            isPile(id) ? 'pile' :
                id === 'deck' ? 'deck' :
                    'discardPile';

    return (
        <div
            id={id}
            className={styles.stack}
            onClick={(e) => onSelect(e)}
            style={{
                width: CONSTS.cardDimensions.x * scaleFactor,
                height: CONSTS.cardDimensions.y * scaleFactor,
                left: `${positionX}px`,
                top: `${positionY}px`,
                borderRadius: `${10 * scaleFactor}px`,
                backgroundImage: `url('./images/${bgImage}.svg')`,
                backgroundSize: '100%',
            }}
        ></div>
    )
 }

 export default PileBase;