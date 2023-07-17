import { createContext, useContext, useReducer, useEffect } from "react";
import initialState from "./initialState";
import gameStateReducer from "./gameStateReducer";
import { gameStateInit } from "./gameStateUtils";

const GameStateContext = createContext(null);

function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(
    gameStateReducer,
    initialState,
    gameStateInit
  );

  console.log(state);

  // // if state has changed save to localStorage
  // useEffect(() => {
  //   localStorage.setItem("solitaireGameState", JSON.stringify(state));
  // }, [state]);

  // const value = { state, dispatch };

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);

  return context;
}

export { GameStateProvider as default, useGameState };
