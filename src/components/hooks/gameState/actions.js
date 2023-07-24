import * as types from "./actionTypes";

function addPoints(pointsToAdd, elapsedTime) {
  return {
    type: types.ADD_POINTS,
    pointsToAdd,
    elapsedTime,
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

function settings(difficulty, cardBack) {
  return {
    type: types.SETTINGS,
    difficulty,
    cardBack,
  };
}

function undo() {
  return {
    type: types.UNDO,
  };
}

function updateElapsedTime(elapsedTime) {
  return {
    type: types.UPDATE_ELAPSED_TIME,
    elapsedTime,
  };
}

export {
  addPoints,
  stackCards,
  dealCards,
  startNewGame,
  move,
  deal,
  turnOverCard,
  settings,
  undo,
  updateElapsedTime,
};
