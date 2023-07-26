import { GAME_STATE, piles } from "../../../consts";
import * as types from "./actionTypes";
import initialState from "./initialState";
import {
  createNewGameState,
  returnCardsToDeck,
  dealCards,
  reverseDeck,
  move,
  turnOverCard,
  unDeal,
  isPile,
  isFoundation,
  checkIfGameOver,
} from "./gameStateUtils";

function gameStateReducer(state, action) {
  switch (action.type) {
    case types.UPDATE_ELAPSED_TIME: {
      const { elapsedTime } = action;

      const pointsToAdd =
        state.timerIntervalsElapsed < Math.floor(elapsedTime / 10) ? -2 : 0;

      return {
        ...state,
        points: state.points + pointsToAdd,
        timerIntervalsElapsed: Math.floor(elapsedTime / 10),
        elapsedTime,
      };
    }
    case types.ADD_POINTS:
      const { pointsToAdd, elapsedTime } = action;

      return {
        ...state,
        points: state.points + pointsToAdd,
        timerIntervalsElapsed: Math.floor(elapsedTime / 10),
        elapsedTime,
      };
    case types.STACK_CARDS:
      return returnCardsToDeck(state);
    case types.DEAL_CARDS:
      return dealCards(state);
    case types.START_NEW_GAME:
      return createNewGameState(initialState, state);
    case types.MOVE: {
      const { card, origin, destination } = action;

      // check if is a legal move
      if (
        (isPile(destination) &&
          ((state[destination].length === 0 && state.cards[card].rank === 13) ||
            (state[destination].length !== 0 &&
              state.cards[state[destination].at(-1)].rank ===
                state.cards[card].rank + 1 &&
              state.cards[state[destination].at(-1)].color !==
                state.cards[card].color &&
              state.cards[state[destination].at(-1)].face === "up"))) ||
        (isFoundation(destination) &&
          piles[destination].suit === state.cards[card].suit &&
          state.cards[card].rank === state[destination].length + 1)
      ) {
        const newState = {
          ...state,
          ...move(state, card, origin, destination, false),
        };
        if (checkIfGameOver(newState)) {
          const highScore =
            state.points > state.statistics.highScore
              ? state.points
              : state.statistics.highScore;
          const gameState = GAME_STATE.WON;

          return {
            ...newState,
            gameState,
            statistics: { ...state.statistics, highScore },
          };
        } else return newState;
      }

      return state;
    }
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
      const changedState = turnOverCard(state, cardName, isUndo);
      return {
        ...state,
        ...changedState,
      };
    }
    case types.SETTINGS:
      const { difficulty, cardBack } = action;
      return {
        ...state,
        settings: { ...state.settings, difficulty, cardBack },
      };
    case types.UNDO: {
      let changedState = {};
      switch (state.undoArray[state.undoIdx].type) {
        case "move":
          const { card, origin, destination } = state.undoArray[state.undoIdx];
          changedState = move(state, card, destination, origin, true);
          break;
        case "turnOverCard":
          const { cardName } = state.undoArray[state.undoIdx];
          changedState = turnOverCard(state, cardName, true);
          break;
        case "deal":
          const { actionTaken, numCardsDealt } = state.undoArray[state.undoIdx];
          changedState = unDeal(state, actionTaken, numCardsDealt);
          break;
        default:
          console.log("invalid type in undo");
      }

      return {
        ...state,
        ...changedState,
        undoArray: state.undoArray.slice(0, -1),
        undoIdx: state.undoIdx - 1,
      };
    }
    default:
      console.log("invalid type in reducer");
  }
}

export default gameStateReducer;
