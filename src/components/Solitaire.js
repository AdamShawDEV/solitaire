import { useEffect, useState } from 'react';
import useWindowDimensions from './hooks/useWindowDimensions';
import useGameState from './hooks/useGameState';
import { CONSTS, GAME_STATE, piles } from '../consts';
import Header from './Header';
import Modal from './Modal';
import styles from './modules/Solitaire.module.css';
import useTimer from './hooks/useTimer';

function Card({ id, selected, onSelect, stack, style, idx }) {
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        setIsMoving(true);
        const timerId = setTimeout(() => setIsMoving(false), CONSTS.moveDuration * 1000);

        return () => clearTimeout(timerId);
    }, [stack])

    return (
        <div
            id={id}
            className={`card ${selected ? 'selectedCard' : ''}`}
            onClick={(e) => onSelect(e)}
            style={{ ...style, zIndex: isMoving ? idx + CONSTS.numCards : idx }}>
        </div>
    )
}

function Solitaire() {
    const { state, dispatcher } = useGameState();
    const [selection, setSelection] = useState(null);
    const { windowDimentions } = useWindowDimensions();
    const [scaleFactor, setScaleFactor] = useState(
        Math.min(windowDimentions.width / CONSTS.maxWidth, (windowDimentions.height - CONSTS.headerHeight) / CONSTS.maxHeight, 1));
    const [playEnabled, setPlayEnabled] = useState(true);
    const { secondsElapsed, resetTimer, startTimer, stopTimer, isTimerRunning } = useTimer(state.elapsedTime);

    useEffect(() => {
        setScaleFactor(Math.min(windowDimentions.width / CONSTS.maxWidth, (windowDimentions.height - CONSTS.headerHeight) / CONSTS.maxHeight, 1));
    }, [windowDimentions]);

    useEffect(() => {
        if (state.gameState === GAME_STATE.WON) {
            stopTimer();
        }
        // eslint-disable-next-line
    }, [state.gameState]);

    // timer points
    if (state.timerIntervalsElapsed < Math.floor(secondsElapsed / 10)) {
        dispatcher({
            type: 'addPoints',
            pointsToAdd: -2,
            elapsedTime: secondsElapsed,
        });
    }

    async function startNewGame() {
        stopTimer();
        resetTimer();
        setSelection(null);
        setPlayEnabled(false);
        dispatcher({ type: 'stackCards' });
        await new Promise(result => setTimeout(result, CONSTS.dealCardsDelay));
        dispatcher({ type: 'dealCards' });
        setPlayEnabled(true);
    }

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

        setSelection(null);
        dispatcher({ type: 'decrementUndo' });
    }

    function onSelect(e) {
        if (!playEnabled) return;
        const clickedItem = e.target.id;

        if (!isTimerRunning) startTimer();

        // if deck is clicked deal cards
        if (state.cardMap[clickedItem] === 'deck' || clickedItem === 'deck') {
            dispatcher({
                type: 'deal',
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
            if (state.cards[clickedItem].face === 'down') {
                const stackName = state.cardMap[clickedItem];
                if (state[stackName].findIndex(i => i === clickedItem) === state[stackName].length - 1) {
                    dispatcher({
                        type: 'turnOverCard',
                        cardName: clickedItem,
                    });
                }
                return;
            } else if (state.cardMap[clickedItem] === 'discardPile') {
                setSelection(state.discardPile.at(-1));
                return;
            }
            setSelection(clickedItem);
            return;
        } else if (selection) {
            // check if legal move
            const card = selection;
            const origin = state.cardMap[selection];
            const destination = isCard(clickedItem) ? state.cardMap[clickedItem] : clickedItem;

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
                dispatcher({
                    type: 'move',
                    card,
                    origin,
                    destination,
                });
            }

            dispatcher({ type: 'checkGameState' });
            setSelection(null);
        }
    }

    return (
        <>
            <Header
                setPlayEnabled={setPlayEnabled}
                undo={undo}
                undoDisabled={state.undoIdx < 0}
                state={state} dispatcher={dispatcher}
                startNewGame={startNewGame}
                secondsElapsed={secondsElapsed}
                playEnabled={playEnabled} />
            <div className='game' style={{ width: `${CONSTS.maxWidth * scaleFactor}px`, height: `${CONSTS.maxHeight * scaleFactor}px` }}>
                <div className={styles.stateDisplay} style={{ fontSize: `${20 * scaleFactor}px` }}>
                    <h2>moves: {state.numMoves}</h2>
                    <h2>points: {state.points}</h2>
                </div>
                {Object.keys(piles).map((key) => {
                    const positionX = (CONSTS.spacer + piles[key].base.x * CONSTS.spacer) * scaleFactor;
                    const positionY = (CONSTS.spacer + piles[key].base.y * CONSTS.spacer) * scaleFactor;

                    const bgImage =
                        isFoundation(key) ? `foundation-${piles[key].suit}` :
                            isPile(key) ? 'pile' :
                                key === 'deck' ? 'deck' :
                                    'discardPile';

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
                    const bgImage = `url(${state.cards[cardName].face === 'up' ? `./images/${cardName}.svg` : `./images/${state.settings.cardBack}-back.svg`})`

                    let positionX = 0;
                    if (stack === 'discardPile' && state[stack].length > 3) {
                        positionX = idx > state[stack].length - 4 ? (CONSTS.spacer + CONSTS.spacer * piles[stack].base.x + (3 - (state[stack].length - idx)) * piles[stack].offset.x) * scaleFactor :
                            (CONSTS.spacer + CONSTS.spacer * piles[stack].base.x) * scaleFactor;
                    } else {
                        positionX = (CONSTS.spacer + (idx * piles[stack].offset.x) + (CONSTS.spacer * piles[stack].base.x)) * scaleFactor;
                    }

                    return (
                        <Card key={cardName} id={cardName} selected={selection === cardName} onSelect={onSelect} stack={stack} idx={idx} style={{
                            width: `${CONSTS.cardDimensions.x * scaleFactor}px`,
                            height: `${CONSTS.cardDimensions.y * scaleFactor}px`,
                            left: `${positionX}px`,
                            top: `${positionY}px`,
                            backgroundColor: `${state.cards[cardName].face === 'down' ? 'purple' : 'red'}`,
                            backgroundImage: bgImage,
                            backgroundSize: `100%`,
                            borderRadius: `${10 * scaleFactor}px`,
                        }} />
                    )
                })}
            </div>
            {state.gameState === GAME_STATE.WON && <Modal>
                <div className={styles.gameWonModal}>
                    <h1>Well Done!</h1>
                    <h2>points: {state.points}</h2>
                    <h2>moves: {state.numMoves}</h2>
                    <h2>games played: {state.statistics.gamesPlayed}</h2>
                    <h2>highScore: {state.statistics.highScore}</h2>
                    <button onClick={startNewGame}>new game</button>
                </div>
            </Modal>}
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