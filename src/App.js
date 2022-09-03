import './App.css';
import { useReducer, useState } from 'react';

const CONSTS = {
  cardDimensions: {
    x: 150,
    y: 225,
  },
  spacer: 50,
}

const cards = {
  'h-1': {
    suit: 'h',
    rank: 1,
    face: 'up',
  },
  'h-2': {
    suit: 'h',
    rank: 2,
    face: 'up',
  },
  'h-3': {
    suit: 'h',
    rank: 3,
    face: 'up',
  },
  'h-4': {
    suit: 'h',
    rank: 4,
    face: 'up',
  },
  'h-5': {
    suit: 'h',
    rank: 5,
    face: 'up',
  },
  'h-6': {
    suit: 'h',
    rank: 6,
    face: 'up',
  },
  'h-7': {
    suit: 'h',
    rank: 7,
    face: 'up',
  },
  'h-8': {
    suit: 'h',
    rank: 8,
    face: 'up',
  },
  'h-9': {
    suit: 'h',
    rank: 9,
    face: 'up',
  },
  'h-10': {
    suit: 'h',
    rank: 10,
    face: 'up',
  },
  'h-11': {
    suit: 'h',
    rank: 11,
    face: 'up',
  },
  'h-12': {
    suit: 'h',
    rank: 12,
    face: 'up',
  },
  'd-1': {
    suit: 'd',
    rank: 1,
    face: 'up',
  },
  'd-2': {
    suit: 'd',
    rank: 2,
    face: 'up',
  },
  'd-3': {
    suit: 'd',
    rank: 3,
    face: 'up',
  },
  'd-4': {
    suit: 'd',
    rank: 4,
    face: 'up',
  },
  'd-5': {
    suit: 'd',
    rank: 5,
    face: 'up',
  },
  'd-6': {
    suit: 'd',
    rank: 6,
    face: 'up',
  },
  'd-7': {
    suit: 'd',
    rank: 7,
    face: 'up',
  },
  'd-8': {
    suit: 'd',
    rank: 8,
    face: 'up',
  },
  'd-9': {
    suit: 'd',
    rank: 9,
    face: 'up',
  },
  'd-10': {
    suit: 'd',
    rank: 10,
    face: 'up',
  },
  'd-11': {
    suit: 'd',
    rank: 11,
    face: 'up',
  },
  'd-12': {
    suit: 'd',
    rank: 12,
    face: 'up',
  },
  'c-1': {
    suit: 'c',
    rank: 1,
    face: 'up',
  },
  'c-2': {
    suit: 'c',
    rank: 2,
    face: 'up',
  },
  'c-3': {
    suit: 'c',
    rank: 3,
    face: 'up',
  },
  'c-4': {
    suit: 'c',
    rank: 4,
    face: 'up',
  },
  'c-5': {
    suit: 'c',
    rank: 5,
    face: 'up',
  },
  'c-6': {
    suit: 'c',
    rank: 6,
    face: 'up',
  },
  'c-7': {
    suit: 'c',
    rank: 7,
    face: 'up',
  },
  'c-8': {
    suit: 'c',
    rank: 8,
    face: 'up',
  },
  'c-9': {
    suit: 'c',
    rank: 9,
    face: 'up',
  },
  'c-10': {
    suit: 'c',
    rank: 10,
    face: 'up',
  },
  'c-11': {
    suit: 'c',
    rank: 11,
    face: 'up',
  },
  'c-12': {
    suit: 'c',
    rank: 12,
    face: 'up',
  },
  's-1': {
    suit: 's',
    rank: 1,
    face: 'up',
  },
  's-2': {
    suit: 's',
    rank: 2,
    face: 'up',
  },
  's-3': {
    suit: 's',
    rank: 3,
    face: 'up',
  },
  's-4': {
    suit: 's',
    rank: 4,
    face: 'up',
  },
  's-5': {
    suit: 's',
    rank: 5,
    face: 'up',
  },
  's-6': {
    suit: 's',
    rank: 6,
    face: 'up',
  },
  's-7': {
    suit: 's',
    rank: 7,
    face: 'up',
  },
  's-8': {
    suit: 's',
    rank: 8,
    face: 'up',
  },
  's-9': {
    suit: 's',
    rank: 9,
    face: 'up',
  },
  's-10': {
    suit: 's',
    rank: 10,
    face: 'up',
  },
  's-11': {
    suit: 's',
    rank: 11,
    face: 'up',
  },
  's-12': {
    suit: 's',
    rank: 12,
    face: 'up',
  },
};

const stacks = {
  deck: {
    base: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 0,
      y: 5,
    },
  },
  pile1: {
    base: {
      x: 9,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },
  pile2: {
    base: {
      x: 13,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },
  pile3: {
    base: {
      x: 17,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },
  pile4: {
    base: {
      x: 21,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },
  pile5: {
    base: {
      x: 25,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },
  pile6: {
    base: {
      x: 29,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },
  pile7: {
    base: {
      x: 33,
      y: 0,
    },
    offset: {
      x: 0,
      y: 25,
    },
  },

}

const initialState = {
  cardMap: {},
  deck: [],
  pile1: [],
  pile2: [],
  pile3: [],
  pile4: [],
  pile5: [],
  pile6: [],
  pile7: [],
}

function cardMapInit(initialState) {
  let newState = {...initialState};

  // shufflecards

  // put all cards in the deck
  for (const cardName in cards) {
    newState = {...newState, cardMap: {...newState.cardMap, [cardName]: 'deck' }};
    newState = {...newState, deck: [...newState.deck, cardName]};
  }

  // deal the cards from deck
  const pileKeys = Object.keys(newState).slice(2);

  let idx1 = 0;
  let idx2 = pileKeys.length;
  while (idx1 < idx2) {
    for (let i = idx1; i < idx2; i++) {
      const cardName = newState.deck.pop();
      const pileName = pileKeys[i];
      newState = {...newState, [pileName]: [...newState[pileName], cardName]};
      newState = {...newState, cardMap: {...newState.cardMap, [cardName]: pileName}};
    }

    idx1++;
  }

  return newState;
}

function cardMapReducer(state, action) {
  let newState = {...state};

  switch (action.type) {
    case 'move':
      const cardName = action.card;
      const from = state.cardMap[cardName];
      const to = isCard(action.destination) ? state.cardMap[action.destination] : action.destination;

      const fromArray = state[from].filter(i => i !== cardName);
      const toArray = [...state[to], cardName];

      const cardMap = {...state.cardMap};
      cardMap[cardName] = to;

      newState = {
        ...newState,
        [from]: fromArray,
        [to]: toArray,
        cardMap,
      };

      return newState;
    default:
      console.log('invalid type in reducer');
  }
  return state;
}


function App() {
  const [state, dispatcher] = useReducer(cardMapReducer, initialState, cardMapInit);
  const [selection, setSelection] = useState(null);

  function onSelect(e) {
    const name = e.target.id;

    // if clicked card is selected deselect it
    if (selection == name) {
      setSelection(null);
      return;
    }

    let newSelection = null;

    if (!selection && isCard(name)) {
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

  return (
    <div className="App">
      {Object.keys(stacks).map((key) => {
        const positionX = CONSTS.spacer + stacks[key].base.x * CONSTS.spacer;
        const positionY = CONSTS.spacer;

        return (
          <div
            key={key}
            id={key}
            className={`stack ${selection === key ? "selectedPile" : ""}`}
            onClick={(e) => onSelect(e)}
            style={{
              width: CONSTS.cardDimensions.x,
              height: CONSTS.cardDimensions.y,
              left: `${positionX}px`,
              top: `${positionY}px`,
            }}
          >{key}</div>
        )
      })}
      {Object.keys(cards).map((cardName) => {
        const stack = state.cardMap[cardName];
        const positionX = CONSTS.spacer + (CONSTS.spacer * stacks[stack].base.x);
        const idx = state[stack].findIndex(element => element === cardName);
        const positionY = CONSTS.spacer + (idx * stacks[stack].offset.y);

        return (
          <div
            key={cardName}
            id={cardName}
            className={`card ${selection === cardName ? 'selectedCard' : ''}`}
            onClick={(e) => onSelect(e)}
            style={{
              width: `${CONSTS.cardDimensions.x}px`,
              height: `${CONSTS.cardDimensions.y}px`,
              left: `${positionX}px`,
              top: `${positionY}px`,
              zIndex: `${idx}`
            }}>
            {cardName + " " + cards[cardName].face}
          </div>
        )
      })}
    </div>
  );
}

function isCard(name) {
  return name[1] === '-';
}

export default App;
