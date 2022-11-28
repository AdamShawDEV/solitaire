import initialState from "./initialState";

function gameStateInit(initialState) {
  let gameState = {};
  try {
    gameState =
      JSON.parse(localStorage.getItem("solitaireGameState")) ??
      createNewGameState(initialState);
  } catch {
    console.log("unable to parse game state from local storage");
    gameState = createNewGameState(initialState);
  }

  return gameState;
}

function createNewGameState(initialState) {
  let newGameState = { ...initialState };
  newGameState = returnCardsToDeck(newGameState);
  return dealCards(newGameState);
}

function returnCardsToDeck(state) {
  let newGameState = { ...initialState };

  // update games played
  const gamesPlayed = state.statistics.gamesPlayed + 1;

  // shufflecards
  const shuffledDeck = shuffle(initialState.cards);

  // put all cards in the deck
  for (const cardName of shuffledDeck) {
    newGameState = {
      ...newGameState,
      cardMap: { ...newGameState.cardMap, [cardName]: "deck" },
    };
  }
  newGameState = { ...newGameState, deck: [...shuffledDeck] };

  return {
    ...newGameState,
    settings: { ...state.settings },
    statistics: { ...state.statistics, gamesPlayed },
  };
}

function dealCards(currentState) {
  let newGameState = { ...currentState };

  const pileKeys = Object.keys(newGameState).filter(
    (i) => i.slice(0, 4) === "pile"
  );

  let idx1 = 0;
  let idx2 = pileKeys.length;
  const deck = [...newGameState.deck];
  while (idx1 < idx2) {
    for (let i = idx1; i < idx2; i++) {
      const cardName = deck.pop();
      const pileName = pileKeys[i];
      newGameState = {
        ...newGameState,
        [pileName]: [...newGameState[pileName], cardName],
      };
      newGameState = {
        ...newGameState,
        cardMap: { ...newGameState.cardMap, [cardName]: pileName },
      };
      if (i === idx1) {
        newGameState = {
          ...newGameState,
          cards: {
            ...newGameState.cards,
            [cardName]: { ...newGameState.cards[cardName], face: "up" },
          },
        };
      }
    }

    idx1++;
  }

  return { ...newGameState, deck };
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

export {
  createNewGameState,
  reverseDeck,
  shuffle,
  dealCards,
  returnCardsToDeck,
  gameStateInit,
};
