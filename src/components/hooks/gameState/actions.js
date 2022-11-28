import * as types from "./actionTypes";

function addPoints(pointsToAdd, elapsedTime) {
  return {
    type: types.ADD_POINTS,
    pointsToAdd,
    elapsedTime,
  };
}

function checkGameState() {
  return {
    type: types.CHECK_GAME_STATE,
  };
}

function stackCards() {
  return {
    type: types.STACK_CARDS,
  };
}

function dealCards() {
  return {
    type: types.DEAL_CARDS,
  };
}

function startNewGame() {
  return {
    type: types.START_NEW_GAME,
  };
}

function move(card, origin, destination, isUndo = false) {
  return {
    type: types.MOVE,
    card,
    origin,
    destination,
    isUndo,
  };
}

function deal() {
  return {
    type: types.DEAL,
  };
}

function turnOverCard(cardName, isUndo = false) {
  return {
    type: types.TURN_OVER_CARD,
    cardName,
    isUndo,
  };
}

function unDeal(actionTaken, numCardsDealt) {
  return {
    type: types.UNDEAL,
    actionTaken,
    numCardsDealt,
  };
}

function decrementUndo() {
  return {
    type: types.DECREMENT_UNDO,
  };
}

function settings(difficulty, cardBack) {
  return {
    type: types.SETTINGS,
    difficulty,
    cardBack,
  };
}

export {
  addPoints,
  checkGameState,
  stackCards,
  dealCards,
  startNewGame,
  move,
  deal,
  turnOverCard,
  unDeal,
  decrementUndo,
  settings,
};
