import { CONSTS, GAME_STATE } from "../../../consts";
import * as types from "./actionTypes";
import initialState from "./initialState";
import {
  createNewGameState,
  returnCardsToDeck,
  dealCards,
  reverseDeck,
} from "./gameStateUtils";

function gameStateReducer(state, action) {
  switch (action.type) {
    case types.ADD_POINTS:
      const { pointsToAdd, elapsedTime } = action;

      return {
        ...state,
        points: state.points + pointsToAdd,
        timerIntervalsElapsed: Math.floor(elapsedTime / 10),
        elapsedTime,
      };
    case types.CHECK_GAME_STATE:
      const numCardsInFoundations =
        state.foundationH.length +
        state.foundationD.length +
        state.foundationC.length +
        state.foundationS.length;

      if (numCardsInFoundations === CONSTS.numCards) {
        const highScore =
          state.points > state.statistics.highScore
            ? state.points
            : state.statistics.highScore;
        const gameState = GAME_STATE.WON;

        return {
          ...state,
          gameState,
          statistics: { ...state.statistics, highScore },
        };
      } else {
        return { ...state };
      }
    case types.STACK_CARDS:
      return returnCardsToDeck(state);
    case types.DEAL_CARDS:
      return dealCards(state);
    case types.START_NEW_GAME:
      return createNewGameState(initialState, state);
    case types.MOVE:
      const { card: selectedCard, origin, destination, isUndo } = action;

      const selectedCardIdx = state[origin].findIndex(
        (card) => card === selectedCard
      );
      const cardsToMove = state[origin].slice(selectedCardIdx);

      const fromArray = state[origin].filter(
        (card) => !cardsToMove.includes(card)
      );
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
        ...state,
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
    case types.DEAL:
      if (state.deck.length === 0) {
        // deck empty
        const newDeck = reverseDeck(state.discardPile);
        let newCards = { ...state.cards };

        // reverse all the cards in the deck
        for (const card of newDeck) {
          newCards = {
            ...newCards,
            [card]: { ...newCards[card], face: "down" },
          };
        }

        // update card map
        let newCardMap = { ...state.cardMap };
        newDeck.forEach((card) => (newCardMap[card] = "deck"));

        // calculate points
        let points = state.points;
        const passesBeforeMinusPoints =
          state.settings.difficulty === "easy" ? 1 : 4;
        if (state.numDeckPasses >= passesBeforeMinusPoints) {
          points = points - (state.settings.difficulty === "easy" ? 100 : 20);
        }

        return {
          ...state,
          cards: newCards,
          cardMap: newCardMap,
          numMoves: state.numMoves + 1,
          deck: newDeck,
          discardPile: [],
          undoIdx: state.undoIdx + 1,
          undoArray: [
            ...state.undoArray,
            { type: "deal", actionTaken: "deckReverse" },
          ],
          points,
          numDeckPasses: state.numDeckPasses + 1,
        };
      }

      const numCardsToDeal = Math.min(
        state.settings.difficulty === "easy" ? 1 : 3,
        state.deck.length
      );
      const newDeck = state.deck.slice(0, -numCardsToDeal);
      const discardedCards = state.deck.slice(-numCardsToDeal);

      let newCards = { ...state.cards };
      for (const card of discardedCards) {
        newCards = { ...newCards, [card]: { ...newCards[card], face: "up" } };
      }

      const newDiscardPile = [
        ...state.discardPile,
        ...reverseDeck(discardedCards),
      ];
      let newCardMap = { ...state.cardMap };
      discardedCards.forEach((card) => {
        newCardMap = { ...newCardMap, [card]: "discardPile" };
      });

      return {
        ...state,
        cards: newCards,
        cardMap: newCardMap,
        numMoves: state.numMoves + 1,
        deck: newDeck,
        discardPile: newDiscardPile,
        undoIdx: state.undoIdx + 1,
        undoArray: [
          ...state.undoArray,
          {
            type: "deal",
            actionTaken: "cardsDelt",
            numCardsDealt: numCardsToDeal,
          },
        ],
      };
    case types.TURN_OVER_CARD: {
      const { cardName, isUndo } = action;
      const newFace = state.cards[cardName].face === "up" ? "down" : "up";
      const newCards = {
        ...state.cards,
        [cardName]: { ...state.cards[cardName], face: newFace },
      };
      return {
        ...state,
        cards: newCards,
        undoIdx: isUndo ? state.undoIdx : state.undoIdx + 1,
        undoArray: isUndo
          ? state.undoArray
          : [...state.undoArray, { type: "turnOverCard", cardName }],
      };
    }
    case types.UNDEAL: {
      const { actionTaken, numCardsDealt } = action;

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
          ...state,
          cards,
          numMoves: state.numMoves - 1,
          cardMap,
          deck,
          discardPile,
        };
      }
      break;
    }
    case types.DECREMENT_UNDO:
      return {
        ...state,
        undoArray: state.undoArray.slice(0, -1),
        undoIdx: state.undoIdx - 1,
      };
    case types.SETTINGS:
      const { difficulty, cardBack } = action;
      return {
        ...state,
        settings: { ...state.settings, difficulty, cardBack },
      };
    default:
      console.log("invalid type in reducer");
  }
}

export default gameStateReducer;
