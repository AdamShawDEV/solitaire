import { useReducer } from "react";
import initialState from "./initialState";
import gameStateReducer from "./gameStateReducer";
import { gameStateInit } from "./gameStateUtils";

function useGameState() {
  const [state, dispatcher] = useReducer(
    gameStateReducer,
    initialState,
    gameStateInit
  );

  return { state, dispatcher };
}

export default useGameState;
