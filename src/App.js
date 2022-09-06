import './App.css';
import { useReducer, useState } from 'react';
import useWindowDimensions from './components/hooks/useWindowDimensions';

const CONSTS = {
  cardDimensions: {
    x: 150,
    y: 225,
  },
  spacer: 50,
  moveSpeed: 1,
}


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
};

const piles = {
  deck: {
    base: {
      x: 0,
      y: 0,
    },
    offset: {
      x: .5,
      y: .5,
    },
  },
  discardPile: {
    base: {
      x: 5,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    }
  },
  pile1: {
    base: {
      x: 9,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },
  pile2: {
    base: {
      x: 13,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },
  pile3: {
    base: {
      x: 17,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },
  pile4: {
    base: {
      x: 21,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },
  pile5: {
    base: {
      x: 25,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },
  pile6: {
    base: {
      x: 29,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },
  pile7: {
    base: {
      x: 33,
      y: 0,
    },
    offset: {
      x: 0,
      y: 45,
    },
  },

}

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
  settings: {
    difficulty: 'easy',
  }
}

function cardMapInit(initialState) {
  let newState = { ...initialState };

  // shufflecards
  const shuffledDeck = shuffle(initialState.cards);

  // put all cards in the deck
  for (const cardName of shuffledDeck) {
    newState = { ...newState, cardMap: { ...newState.cardMap, [cardName]: 'deck' } };
  }
  newState = { ...newState, deck: [...shuffledDeck] };

  // deal the cards from deck
  const pileKeys = Object.keys(newState).slice(4, 11);

  let idx1 = 0;
  let idx2 = pileKeys.length;
  while (idx1 < idx2) {
    for (let i = idx1; i < idx2; i++) {
      const cardName = newState.deck.pop();
      const pileName = pileKeys[i];
      newState = { ...newState, [pileName]: [...newState[pileName], cardName] };
      newState = { ...newState, cardMap: { ...newState.cardMap, [cardName]: pileName } };
      if (i === idx1) {
        newState = { ...newState, cards: { ...newState.cards, [cardName]: { ...newState.cards[cardName], face: 'up' } } };
      }
    }

    idx1++;
  }

  return newState;
}

function cardMapReducer(state, action) {
  switch (action.type) {
    case 'move':
      const cardName = action.card;
      const from = state.cardMap[cardName];
      const to = isCard(action.destination) ? state.cardMap[action.destination] : action.destination;

      // if is legal move
      if ((state[to].length === 0 && state.cards[cardName].value === 12) || 
      (state.cards[state[to].at(-1)].rank === state.cards[cardName].rank + 1 &&
      state.cards[state[to].at(-1)].color !== state.cards[cardName].color - 1)) {

        const fromArray = state[from].filter(i => i !== cardName);
        const toArray = [...state[to], cardName];

        const cardMap = { ...state.cardMap };
        cardMap[cardName] = to;

        return {
          ...state,
          [from]: fromArray,
          [to]: toArray,
          cardMap,
        };
      }
      break;
    case 'deal':
      console.log('deck');
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

        return {
          ...state,
          cards: newCards,
          cardMap: newCardMap,
          deck: newDeck,
          discardPile: [],
        }

      }

      let numCardsToDeal = Math.min(state.settings.difficulty === 'easy' ? 1 : 3, state.deck.length);
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

      return {
        ...state,
        cards: newCards,
        cardMap: newCardMap,
        deck: newDeck,
        discardPile: newDiscardPile,
      };
    case 'turnOverNewCard': {
      const newCards = { ...state.cards, [action.cardName]: { ...state.cards[action.cardName], face: 'up' } };
      return {
        ...state,
        cards: newCards,
      }
    }
    default:
      console.log('invalid type in reducer');
  }
  return state;
}


function App() {
  const [state, dispatcher] = useReducer(cardMapReducer, initialState, cardMapInit);
  const [selection, setSelection] = useState(null);
  const { windowDimentions } = useWindowDimensions();

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

    // if clicked card is selected deselect it
    if (selection === name) {
      setSelection(null);
      return;
    }

    let newSelection = null;

    if (!selection && isCard(name)) {
      if (state.cards[name].face === 'down') {
        const stackName = state.cardMap[name];
        if (state[stackName].findIndex(i => i === name) === state[stackName].length - 1) {
          dispatcher({
            type: 'turnOverNewCard',
            cardName: name,
          });
        }
        return;
      }
      newSelection = name;
    } else {
      if (selection) {
        dispatcher({
          type: 'move',
          card: selection,
          destination: name,
        });
        newSelection = null;
      }
    }

    setSelection(newSelection);
  }

  // console.log(state);

  const scaleFactor = Math.min((windowDimentions.width / 38) / CONSTS.spacer, 1);

  return (
    <div className="App">
      {Object.keys(piles).map((key) => {
        const positionX = (CONSTS.spacer + piles[key].base.x * CONSTS.spacer) * scaleFactor;
        const positionY = (CONSTS.spacer + piles[key].base.y * CONSTS.spacer) * scaleFactor;

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
            }}
          >{key}</div>
        )
      })}
      {Object.keys(state.cards).map((cardName) => {
        const stack = state.cardMap[cardName];
        const idx = state[stack].findIndex(element => element === cardName);
        const positionX = (CONSTS.spacer + (idx * piles[stack].offset.x) + (CONSTS.spacer * piles[stack].base.x)) * scaleFactor;

        let positionY = 0;
        if (stack === 'discardPile' && state[stack].length > 3) {
          positionY = idx > state[stack].length - 4 ? (CONSTS.spacer + (3 - (state[stack].length - idx)) * piles[stack].offset.y) * scaleFactor :
            CONSTS.spacer * scaleFactor;
        } else {
          positionY = (CONSTS.spacer + (idx * piles[stack].offset.y)) * scaleFactor;
        }

        return (
          <div
            key={cardName}
            id={cardName}
            className={`card ${selection === cardName ? 'selectedCard' : ''}`}
            onClick={(e) => onSelect(e)}
            style={{
              width: `${CONSTS.cardDimensions.x * scaleFactor}px`,
              height: `${CONSTS.cardDimensions.y * scaleFactor}px`,
              left: `${positionX}px`,
              top: `${positionY}px`,
              zIndex: `${idx}`,
              backgroundColor: `${state.cards[cardName].face === 'down' ? 'purple' : 'red'}`,
              backgroundImage: `url(${state.cards[cardName].face === 'up' ? `./images/h-${state.cards[cardName].rank}.svg` : './images/card-back.svg'})`,
              backgroundSize: `100%`,
              borderRadius: `${10 * scaleFactor}px`,
            }}>
            {state.cards[cardName].face === 'up' && cardName + " " + state.cards[cardName].face}
          </div>
        )
      })}
    </div>
  );
}

function isCard(name) {
  return name[1] === '-';
}

function shuffle(cards) {
  let deck = Object.keys(cards);
  const numCards = deck.length;

  for (let i = 0; i < numCards; i++) {
    const idx1 = Math.floor(Math.random() * numCards);
    const idx2 = Math.floor(Math.random() * numCards);

    const temp = deck[idx1];
    deck[idx1] = deck[idx2];
    deck[idx2] = temp;
  }

  return deck;
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

export default App;
