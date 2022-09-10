import { useReducer } from "react";
import { CONSTS, GAME_STATE } from "../../consts";

const InitailCards = {
    'h-1': {
        suit: 'h',
        color: 'red',
        rank: 1,
        face: 'down',
    },
    'h-2': {
        suit: 'h',
        color: 'red',
        rank: 2,
        face: 'down',
    },
    'h-3': {
        suit: 'h',
        color: 'red',
        rank: 3,
        face: 'down',
    },
    'h-4': {
        suit: 'h',
        color: 'red',
        rank: 4,
        face: 'down',
    },
    'h-5': {
        suit: 'h',
        color: 'red',
        rank: 5,
        face: 'down',
    },
    'h-6': {
        suit: 'h',
        color: 'red',
        rank: 6,
        face: 'down',
    },
    'h-7': {
        suit: 'h',
        color: 'red',
        rank: 7,
        face: 'down',
    },
    'h-8': {
        suit: 'h',
        color: 'red',
        rank: 8,
        face: 'down',
    },
    'h-9': {
        suit: 'h',
        color: 'red',
        rank: 9,
        face: 'down',
    },
    'h-10': {
        suit: 'h',
        color: 'red',
        rank: 10,
        face: 'down',
    },
    'h-11': {
        suit: 'h',
        color: 'red',
        rank: 11,
        face: 'down',
    },
    'h-12': {
        suit: 'h',
        color: 'red',
        rank: 12,
        face: 'down',
    },
    'h-13': {
        suit: 'h',
        color: 'red',
        rank: 13,
        face: 'down',
    },
    'd-1': {
        suit: 'd',
        color: 'red',
        rank: 1,
        face: 'down',
    },
    'd-2': {
        suit: 'd',
        color: 'red',
        rank: 2,
        face: 'down',
    },
    'd-3': {
        suit: 'd',
        color: 'red',
        rank: 3,
        face: 'down',
    },
    'd-4': {
        suit: 'd',
        color: 'red',
        rank: 4,
        face: 'down',
    },
    'd-5': {
        suit: 'd',
        color: 'red',
        rank: 5,
        face: 'down',
    },
    'd-6': {
        suit: 'd',
        color: 'red',
        rank: 6,
        face: 'down',
    },
    'd-7': {
        suit: 'd',
        color: 'red',
        rank: 7,
        face: 'down',
    },
    'd-8': {
        suit: 'd',
        color: 'red',
        rank: 8,
        face: 'down',
    },
    'd-9': {
        suit: 'd',
        color: 'red',
        rank: 9,
        face: 'down',
    },
    'd-10': {
        suit: 'd',
        color: 'red',
        rank: 10,
        face: 'down',
    },
    'd-11': {
        suit: 'd',
        color: 'red',
        rank: 11,
        face: 'down',
    },
    'd-12': {
        suit: 'd',
        color: 'red',
        rank: 12,
        face: 'down',
    },
    'd-13': {
        suit: 'd',
        color: 'red',
        rank: 13,
        face: 'down',
    },
    'c-1': {
        suit: 'c',
        color: 'black',
        rank: 1,
        face: 'down',
    },
    'c-2': {
        suit: 'c',
        color: 'black',
        rank: 2,
        face: 'down',
    },
    'c-3': {
        suit: 'c',
        color: 'black',
        rank: 3,
        face: 'down',
    },
    'c-4': {
        suit: 'c',
        color: 'black',
        rank: 4,
        face: 'down',
    },
    'c-5': {
        suit: 'c',
        color: 'black',
        rank: 5,
        face: 'down',
    },
    'c-6': {
        suit: 'c',
        color: 'black',
        rank: 6,
        face: 'down',
    },
    'c-7': {
        suit: 'c',
        color: 'black',
        rank: 7,
        face: 'down',
    },
    'c-8': {
        suit: 'c',
        color: 'black',
        rank: 8,
        face: 'down',
    },
    'c-9': {
        suit: 'c',
        color: 'black',
        rank: 9,
        face: 'down',
    },
    'c-10': {
        suit: 'c',
        color: 'black',
        rank: 10,
        face: 'down',
    },
    'c-11': {
        suit: 'c',
        color: 'black',
        rank: 11,
        face: 'down',
    },
    'c-12': {
        suit: 'c',
        color: 'black',
        rank: 12,
        face: 'down',
    },
    'c-13': {
        suit: 'c',
        color: 'black',
        rank: 13,
        face: 'down',
    },
    's-1': {
        suit: 's',
        color: 'black',
        rank: 1,
        face: 'down',
    },
    's-2': {
        suit: 's',
        color: 'black',
        rank: 2,
        face: 'down',
    },
    's-3': {
        suit: 's',
        color: 'black',
        rank: 3,
        face: 'down',
    },
    's-4': {
        suit: 's',
        color: 'black',
        rank: 4,
        face: 'down',
    },
    's-5': {
        suit: 's',
        color: 'black',
        rank: 5,
        face: 'down',
    },
    's-6': {
        suit: 's',
        color: 'black',
        rank: 6,
        face: 'down',
    },
    's-7': {
        suit: 's',
        color: 'black',
        rank: 7,
        face: 'down',
    },
    's-8': {
        suit: 's',
        color: 'black',
        rank: 8,
        face: 'down',
    },
    's-9': {
        suit: 's',
        color: 'black',
        rank: 9,
        face: 'down',
    },
    's-10': {
        suit: 's',
        color: 'black',
        rank: 10,
        face: 'down',
    },
    's-11': {
        suit: 's',
        color: 'black',
        rank: 11,
        face: 'down',
    },
    's-12': {
        suit: 's',
        color: 'black',
        rank: 12,
        face: 'down',
    },
    's-13': {
        suit: 's',
        color: 'black',
        rank: 13,
        face: 'down',
    },
};

const initialState = {
    cards: InitailCards,
    cardMap: {},
    deck: [],
    discardPile: [],
    pile1: [],
    pile2: [],
    pile3: [],
    pile4: [],
    pile5: [],
    pile6: [],
    pile7: [],
    foundationH: [],
    foundationD: [],
    foundationC: [],
    foundationS: [],
    undoIdx: -1,
    undoArray: [],
    points: 0,
    numMoves: 0,
    gameState: GAME_STATE.PLAYING,
    settings: {
        difficulty: 'easy',
        cardBack: '',
    },
    statistics: {
        gamesPlayed: 0,
        gamesWon: 0,
        highScore: 0,
    }
};

function cardMapInit(initialState) {
    let gameState = {};
    try {
        gameState = JSON.parse(localStorage.getItem('solitaireGameState'));
    } catch {
        console.log('unable to parse game state from local storage');
    }

    if (!gameState) {
        gameState = createNewGameState(initialState);
    }

    return gameState;
}

function cardMapReducer(state, action) {
    let newGameState = {};

    switch (action.type) {
        case 'checkGameState':
            const numCardsInFoundations = state.foundationH.length + state.foundationD.length + state.foundationC.length + state.foundationS.length;

            if (numCardsInFoundations === CONSTS.numCards) {
                const gamesPlayed = state.statistics.gamesPlayed + 1;
                const highScore = state.points > state.statistics.highScore ? state.points : state.statistics.highScore
                const gameState = GAME_STATE.WON;

                newGameState = { ...state, gameState, statistics: { ...state.statistics, highScore, gamesPlayed } };
            }
            else {
                newGameState = { ...state };
            }
            break;
        case 'stackCards':
            newGameState = returnCardsToDeck(state);
            break;
        case 'dealCards':
            newGameState = dealCards(state);
            break;
        case 'startNewGame':
            newGameState = createNewGameState(initialState, state);
            break;
        case 'move':
            const { card: selectedCard, origin, destination, isUndo } = action;

            const selectedCardIdx = state[origin].findIndex(card => card === selectedCard);
            const cardsToMove = state[origin].slice(selectedCardIdx);

            const fromArray = state[origin].filter(card => !cardsToMove.includes(card));
            const toArray = [...state[destination], ...cardsToMove];
            let cardMap = { ...state.cardMap };

            cardsToMove.forEach(card =>
                cardMap = { ...cardMap, [card]: destination }
            )

            newGameState = {
                ...state,
                [origin]: fromArray,
                [destination]: toArray,
                cardMap,
                numMoves: isUndo ? state.numMoves - 1 : state.numMoves + 1,
                undoIdx: isUndo ? state.undoIdx : state.undoIdx + 1,
                undoArray: isUndo ? state.undoArray : [...state.undoArray, { type: 'move', origin, destination, card: selectedCard }],
            };
            break;
        case 'deal':
            if (state.deck.length === 0) {    // deck empty
                const newDeck = reverseDeck(state.discardPile);
                let newCards = { ...state.cards };

                // reverse all the cards in the deck
                for (const card of newDeck) {
                    newCards = { ...newCards, [card]: { ...newCards[card], face: 'down' } };
                }

                // update card map
                let newCardMap = { ...state.cardMap };
                newDeck.forEach(card =>
                    newCardMap[card] = 'deck'
                );

                newGameState = {
                    ...state,
                    cards: newCards,
                    cardMap: newCardMap,
                    numMoves: state.numMoves + 1,
                    deck: newDeck,
                    discardPile: [],
                    undoIdx: state.undoIdx + 1,
                    undoArray: [...state.undoArray, { type: 'deal', actionTaken: 'deckReverse' }],
                }
                break;
            }

            const numCardsToDeal = Math.min(state.settings.difficulty === 'easy' ? 1 : 3, state.deck.length);
            const newDeck = state.deck.slice(0, -numCardsToDeal);
            const discardedCards = state.deck.slice(-numCardsToDeal);

            let newCards = { ...state.cards };
            for (const card of discardedCards) {
                newCards = { ...newCards, [card]: { ...newCards[card], face: 'up' } };
            }

            const newDiscardPile = [...state.discardPile, ...reverseDeck(discardedCards)];
            let newCardMap = { ...state.cardMap };
            discardedCards.forEach(card => {
                newCardMap = { ...newCardMap, [card]: 'discardPile' };
            });

            newGameState = {
                ...state,
                cards: newCards,
                cardMap: newCardMap,
                numMoves: state.numMoves + 1,
                deck: newDeck,
                discardPile: newDiscardPile,
                undoIdx: state.undoIdx + 1,
                undoArray: [...state.undoArray, { type: 'deal', actionTaken: 'cardsDelt', numCardsDealt: numCardsToDeal }],
            };
            break;
        case 'turnOverCard': {
            const { cardName, isUndo } = action;
            const newFace = state.cards[cardName].face === 'up' ? 'down' : 'up';
            const newCards = { ...state.cards, [cardName]: { ...state.cards[cardName], face: newFace } };
            newGameState = {
                ...state,
                cards: newCards,
                undoIdx: isUndo ? state.undoIdx : state.undoIdx + 1,
                undoArray: isUndo ? state.undoArray : [...state.undoArray, { type: 'turnOverCard', cardName, }],
            }
            break;
        }
        case 'unDeal': {
            const { actionTaken, numCardsDealt } = action;

            if (actionTaken === 'deckReverse') {
                const discardPile = reverseDeck(state.deck);
                let newCards = { ...state.cards };

                // reverse all the cards in the discardPile
                for (const card of discardPile) {
                    newCards = { ...newCards, [card]: { ...newCards[card], face: 'up' } };
                }

                // update card map
                let newCardMap = { ...state.cardMap };
                discardPile.forEach(card =>
                    newCardMap[card] = 'discardPile'
                );

                newGameState = {
                    ...state,
                    numMoves: state.numMoves - 1,
                    cards: newCards,
                    cardMap: newCardMap,
                    deck: [],
                    discardPile,
                };
                break;
            } else if (actionTaken === 'cardsDelt') {
                console.log('cardsDelt', numCardsDealt);
                const discardPile = state.discardPile.slice(0, -numCardsDealt);
                const returnedCards = state.discardPile.slice(-numCardsDealt);
                console.log(returnedCards);

                let cards = { ...state.cards };
                for (const card of returnedCards) {
                    cards = { ...cards, [card]: { ...cards[card], face: 'down' } };
                }

                const deck = [...state.deck, ...reverseDeck(returnedCards)];

                let cardMap = { ...state.cardMap };

                returnedCards.forEach(card => {
                    cardMap = { ...cardMap, [card]: 'deck' }
                });

                newGameState = {
                    ...state,
                    cards,
                    numMoves: state.numMoves - 1,
                    cardMap,
                    deck,
                    discardPile,
                };
                break;
            }
            break;
        }
        case 'decrementUndo':
            newGameState = {
                ...state,
                undoArray: state.undoArray.slice(0, -1),
                undoIdx: state.undoIdx - 1,
            };
            break;
        case 'settings':
            const { difficulty } = action;
            newGameState = { ...state, settings: { ...state.settings, difficulty, } };
            break;
        default:
            console.log('invalid type in reducer');
    }

    localStorage.setItem('solitaireGameState', JSON.stringify(newGameState));
    return newGameState;
}

function useGameState() {
    const [state, dispatcher] = useReducer(cardMapReducer, initialState, cardMapInit);

    return { state, dispatcher };
}

function shuffle(cards) {
    let shuffledCards = Object.keys(cards);
    const numCards = shuffledCards.length;

    for (let i = 0; i < numCards; i++) {
        const idx1 = Math.floor(Math.random() * numCards);
        const idx2 = Math.floor(Math.random() * numCards);

        const temp = shuffledCards[idx1];
        shuffledCards[idx1] = shuffledCards[idx2];
        shuffledCards[idx2] = temp;
    }

    return shuffledCards;
}

function reverseDeck(deck) {
    let reversedDeck = [];

    let idx = deck.length - 1;
    while (idx >= 0) {
        reversedDeck.push(deck[idx]);
        idx--;
    }

    return reversedDeck;
}

function returnCardsToDeck(state) {
    let newGameState = { ...initialState };

    // shufflecards
    const shuffledDeck = shuffle(initialState.cards);

    // put all cards in the deck
    for (const cardName of shuffledDeck) {
        newGameState = { ...newGameState, cardMap: { ...newGameState.cardMap, [cardName]: 'deck' } };
    }
    newGameState = { ...newGameState, deck: [...shuffledDeck] };

    return { ...newGameState, settings: { ...state.settings }, statistics: state.statistics };
}

function dealCards(currentState) {
    let newGameState = { ...currentState };

    const pileKeys = Object.keys(newGameState).slice(4, 11);

    let idx1 = 0;
    let idx2 = pileKeys.length;
    const deck = [...newGameState.deck];
    while (idx1 < idx2) {
        for (let i = idx1; i < idx2; i++) {
            const cardName = deck.pop();
            const pileName = pileKeys[i];
            newGameState = { ...newGameState, [pileName]: [...newGameState[pileName], cardName] };
            newGameState = { ...newGameState, cardMap: { ...newGameState.cardMap, [cardName]: pileName } };
            if (i === idx1) {
                newGameState = { ...newGameState, cards: { ...newGameState.cards, [cardName]: { ...newGameState.cards[cardName], face: 'up' } } };
            }
        }

        idx1++;
    }

    return { ...newGameState, deck };
}

function createNewGameState(initialState, currentState = null) {
    let newGameState = { ...initialState };

    // shufflecards
    const shuffledDeck = shuffle(initialState.cards);

    // put all cards in the deck
    for (const cardName of shuffledDeck) {
        newGameState = { ...newGameState, cardMap: { ...newGameState.cardMap, [cardName]: 'deck' } };
    }
    newGameState = { ...newGameState, deck: [...shuffledDeck] };

    // deal the cards from deck
    const pileKeys = Object.keys(newGameState).slice(4, 11);

    let idx1 = 0;
    let idx2 = pileKeys.length;
    while (idx1 < idx2) {
        for (let i = idx1; i < idx2; i++) {
            const cardName = newGameState.deck.pop();
            const pileName = pileKeys[i];
            newGameState = { ...newGameState, [pileName]: [...newGameState[pileName], cardName] };
            newGameState = { ...newGameState, cardMap: { ...newGameState.cardMap, [cardName]: pileName } };
            if (i === idx1) {
                newGameState = { ...newGameState, cards: { ...newGameState.cards, [cardName]: { ...newGameState.cards[cardName], face: 'up' } } };
            }
        }

        idx1++;
    }

    return currentState ? { ...newGameState, settings: currentState.settings, statistics: currentState.statistics } : newGameState;
}

export default useGameState;