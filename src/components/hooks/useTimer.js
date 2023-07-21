import { useEffect, useState } from "react";
import { useGameState } from "./gameState/GameStateContext";
import { GAME_STATE } from "../../consts";
import { updateElapsedTime } from "./gameState/actions";

function useTimer() {
  const { state, dispatch /*isTimmerRunning,  */ } = useGameState();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(state.elapsedTime);

  useEffect(() => {
    if (isTimerRunning) {
      const timerId = setTimeout(() => {
        dispatch(updateElapsedTime(secondsElapsed + 1));
        setSecondsElapsed((curr) => curr + 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [secondsElapsed, isTimerRunning, dispatch]);

  // if game over stop timer
  useEffect(() => {
    if (state.stategameState === GAME_STATE.WON) {
      stopTimer();
    }
    // eslint-disable-next-line
  }, [state.gameState]);

  function resetTimer() {
    setSecondsElapsed(0);
  }

  function startTimer() {
    setIsTimerRunning(true);
  }

  function stopTimer() {
    setIsTimerRunning(false);
  }

  return { secondsElapsed, resetTimer, startTimer, stopTimer, isTimerRunning };
}

export default useTimer;
