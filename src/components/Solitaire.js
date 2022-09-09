import { useEffect, useState } from 'react';
import useWindowDimensions from './hooks/useWindowDimensions';
import useGameState from './hooks/useGameState';
import { CONSTS, piles } from '../consts';
import Header from './Header';

function Card({ id, selected, onSelect, positionX, positionY, style }) {
    const [isMoving, setIsMoving] = useState(false);


    useEffect(() => {
        setIsMoving(true);
        const timerId = setTimeout(() => setIsMoving(false), CONSTS.moveDuration * 1000);

        return () => clearTimeout(timerId);
    }, [positionX, positionY])

    return (
        <div
            id={id}
            className={`card ${selected ? 'selectedCard' : ''}`}
            onClick={(e) => onSelect(e)}
            style={isMoving ? { ...style, zIndex: style.zIndex + CONSTS.numCards } : style}>
        </div>
    )
}

function Solitaire({ startNewGame }) {
    const { state, dispatcher } = useGameState();
    const [selection, setSelection] = useState(null);
    const { windowDimentions } = useWindowDimensions();
    const [scaleFactor, setScaleFactor] = useState(
        Math.min(windowDimentions.width / CONSTS.maxWidth, (windowDimentions.height - CONSTS.headerHeight) / CONSTS.maxHeight, 1));

    useEffect(() => {
        setScaleFactor(Math.min(windowDimentions.width / CONSTS.maxWidth, (windowDimentions.height - CONSTS.headerHeight) / CONSTS.maxHeight, 1));

    }, [windowDimentions]);

    function undo() {
        if (state.undoIdx < 0) return;

        switch (state.undoArray[state.undoIdx].type) {
            case 'move':
                const { card, origin, destination } = state.undoArray[state.undoIdx];
                dispatcher({ type: 'move', card, origin: destination, destination: origin, isUndo: true });
                break;
            case 'turnOverCard':
                const { cardName } = state.undoArray[state.undoIdx];
                dispatcher({ type: 'turnOverCard', cardName, isUndo: true });
                break;
            case 'deal':
                const { actionTaken, numCardsDealt } = state.undoArray[state.undoIdx]
                dispatcher({ type: 'unDeal', actionTaken, numCardsDealt });
                break;
            default:
                console.log('invalid type in undo')
        }

        dispatcher({ type: 'decrementUndo' });
    }

    function onSelect(e) {
        const name = e.target.id;

        // if deck is clicked deal cards
        if (state.cardMap[name] === 'deck' || name === 'deck') {
            dispatcher({
                type: 'deal',
            });
            setSelection(null);
            return;
        }

        // if clicked card is already selected deselect it
        if (selection === name) {
            setSelection(null);
            return;
        }

        // no card card is selected set clicked card as selected
        if (!selection && isCard(name)) {

            if (state.cards[name].face === 'down') {
                const stackName = state.cardMap[name];
                if (state[stackName].findIndex(i => i === name) === state[stackName].length - 1) {
                    dispatcher({
                        type: 'turnOverCard',
                        cardName: name,
                    });
                }
                return;
            } else if (state.cardMap[name] === 'discardPile') {
                setSelection(state.discardPile.at(-1));
                return;
            }
            setSelection(name);
            return;
        } else if (selection) {
            // check if legal move
            const card = selection;
            const origin = state.cardMap[selection];
            const destination = isCard(name) ? state.cardMap[name] : name;

            if (isPile(destination)) {
                if (state[destination].length === 0) {
                    if (state.cards[card].rank === 13) {
                        dispatcher({
                            type: 'move',
                            card,
                            origin,
                            destination,
                        });
                    }
                } else if (state.cards[state[destination].at(-1)].rank === state.cards[card].rank + 1 &&
                    state.cards[state[destination].at(-1)].color !== state.cards[card].color) {
                    dispatcher({
                        type: 'move',
                        card,
                        origin,
                        destination,
                    });
                }
            } else if (isFoundation(destination) && 
            piles[destination].suit === state.cards[card].suit &&
            state.cards[card].rank === state[destination].length + 1) {
                // if (state[destination].length === 0) {
                //     if (state.cards[card].rank === 1) {
                        dispatcher({
                            type: 'move',
                            card,
                            origin,
                            destination,
                        });
                //     }
                // }
                // else if (state.cards[state[destination].at(-1)].rank === state.cards[card].rank - 1 &&
                //     state.cards[state[destination].at(-1)].suit === state.cards[card].suit) {
                //     dispatcher({
                //         type: 'move',
                //         card,
                //         origin,
                //         destination,
                //     });
                // }
            }

            setSelection(null);
        }
    }

    return (
        <>
            <Header startNewGame={startNewGame}
                undo={undo}
                undoDisabled={state.undoIdx < 0}
                state={state} dispatcher={dispatcher} />
            <div className='game' style={{ width: `${CONSTS.maxWidth * scaleFactor}px`, height: `${CONSTS.maxHeight * scaleFactor}px` }}>
                {Object.keys(piles).map((key) => {
                    const positionX = (CONSTS.spacer + piles[key].base.x * CONSTS.spacer) * scaleFactor;
                    const positionY = (CONSTS.spacer + piles[key].base.y * CONSTS.spacer) * scaleFactor;

                    const bgImage =
                        isFoundation(key) ? `foundation-${piles[key].suit}` :
                            isPile(key) ? 'pile' :
                                key === 'deck' ? 'deck' :
                                    'discardPile';

                    console.log(bgImage);

                    return (
                        <div
                            key={key}
                            id={key}
                            className={`stack ${selection === key ? "selectedPile" : ""}`}
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
                })}
                {Object.keys(state.cards).map((cardName) => {
                    const stack = state.cardMap[cardName];
                    const idx = state[stack].findIndex(element => element === cardName);
                    const positionY = (CONSTS.spacer + CONSTS.spacer * piles[stack].base.y + (idx * piles[stack].offset.y)) * scaleFactor;

                    let positionX = 0;
                    if (stack === 'discardPile' && state[stack].length > 3) {
                        positionX = idx > state[stack].length - 4 ? (CONSTS.spacer + CONSTS.spacer * piles[stack].base.x + (3 - (state[stack].length - idx)) * piles[stack].offset.x) * scaleFactor :
                            (CONSTS.spacer + CONSTS.spacer * piles[stack].base.x) * scaleFactor;
                    } else {
                        positionX = (CONSTS.spacer + (idx * piles[stack].offset.x) + (CONSTS.spacer * piles[stack].base.x)) * scaleFactor;
                    }

                    return (
                        <Card key={cardName} id={cardName} selected={selection === cardName} onSelect={onSelect} positionX={positionX} positionY={positionY} style={{
                            width: `${CONSTS.cardDimensions.x * scaleFactor}px`,
                            height: `${CONSTS.cardDimensions.y * scaleFactor}px`,
                            left: `${positionX}px`,
                            top: `${positionY}px`,
                            zIndex: `${idx}`,
                            backgroundColor: `${state.cards[cardName].face === 'down' ? 'purple' : 'red'}`,
                            backgroundImage: `url(${state.cards[cardName].face === 'up' ? `./images/${cardName}.svg` : './images/card-back.svg'})`,
                            backgroundSize: `100%`,
                            borderRadius: `${10 * scaleFactor}px`,
                        }} />
                    )
                })}
            </div>
        </>
    );

}


function isCard(name) {
    return name[1] === '-';
}

function isPile(name) {
    return name.slice(0, 4) === 'pile';
}

function isFoundation(name) {
    return name.slice(0, 4) === 'foun';
}

export default Solitaire;