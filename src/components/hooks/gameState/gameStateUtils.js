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

function move(state, selectedCard, origin, destination, isUndo) {
  const selectedCardIdx = state[origin].findIndex(
    (card) => card === selectedCard
  );
  const cardsToMove = state[origin].slice(selectedCardIdx);

  const fromArray = state[origin].filter((card) => !cardsToMove.includes(card));
  const toArray = [...state[destination], ...cardsToMove];
  let cardMap = { ...state.cardMap };

  cardsToMove.forEach(
    (card) => (cardMap = { ...cardMap, [card]: destination })
  );

  let points = state.points;
  if (destination.slice(0, 4) === "foun") {
    points = points + 10;
  } else if (origin.slice(0, 4) === "foun") {
    points = isUndo ? points - 10 : points - 15;
  } else if (
    destination.slice(0, 4) === "pile" &&
    origin.slice(0, 4) === "pile"
  ) {
    points = isUndo ? points - 3 : points + 3;
  } else if (
    destination.slice(0, 4) === "pile" ||
    origin.slice(0, 4) === "pile"
  ) {
    points = isUndo ? points - 5 : points + 5;
  }

  return {
    [origin]: fromArray,
    [destination]: toArray,
    cardMap,
    numMoves: isUndo ? state.numMoves - 1 : state.numMoves + 1,
    undoIdx: isUndo ? state.undoIdx : state.undoIdx + 1,
    undoArray: isUndo
      ? state.undoArray
      : [
          ...state.undoArray,
          { type: "move", origin, destination, card: selectedCard },
        ],
    points,
  };
}

function turnOverCard(state, cardName, isUndo) {
  const newFace = state.cards[cardName].face === "up" ? "down" : "up";
  const newCards = {
    ...state.cards,
    [cardName]: { ...state.cards[cardName], face: newFace },
  };
  return {
    cards: newCards,
    undoIdx: isUndo ? state.undoIdx : state.undoIdx + 1,
    undoArray: isUndo
      ? state.undoArray
      : [...state.undoArray, { type: "turnOverCard", cardName }],
  };
}

function unDeal(state, actionTaken, numCardsDealt) {
  if (actionTaken === "deckReverse") {
    const discardPile = reverseDeck(state.deck);
    let newCards = { ...state.cards };

    // reverse all the cards in the discardPile
    for (const card of discardPile) {
      newCards = { ...newCards, [card]: { ...newCards[card], face: "up" } };
    }

    // update card map
    let newCardMap = { ...state.cardMap };
    discardPile.forEach((card) => (newCardMap[card] = "discardPile"));

    // calculate points
    let points = state.points;
    const passesBeforeMinusPoints =
      state.settings.difficulty === "easy" ? 1 : 4;
    if (state.numDeckPasses >= passesBeforeMinusPoints) {
      points = points + (state.settings.difficulty === "easy" ? 100 : 20);
    }

    return {
      ...state,
      numMoves: state.numMoves - 1,
      cards: newCards,
      cardMap: newCardMap,
      deck: [],
      discardPile,
      numDeckPasses: state.numDeckPasses - 1,
      points,
    };
  } else if (actionTaken === "cardsDelt") {
    const discardPile = state.discardPile.slice(0, -numCardsDealt);
    const returnedCards = state.discardPile.slice(-numCardsDealt);

    let cards = { ...state.cards };
    for (const card of returnedCards) {
      cards = { ...cards, [card]: { ...cards[card], face: "down" } };
    }

    const deck = [...state.deck, ...reverseDeck(returnedCards)];

    let cardMap = { ...state.cardMap };

    returnedCards.forEach((card) => {
      cardMap = { ...cardMap, [card]: "deck" };
    });

    return {
      cards,
      numMoves: state.numMoves - 1,
      cardMap,
      deck,
      discardPile,
    };
  }
}

export {
  createNewGameState,
  reverseDeck,
  shuffle,
  dealCards,
  returnCardsToDeck,
  gameStateInit,
  move,
  turnOverCard,
  unDeal,
};
