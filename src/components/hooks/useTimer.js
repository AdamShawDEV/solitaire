import { useEffect, useState } from "react";
import { useGameState } from "./gameState/GameStateContext";
import { GAME_STATE } from "../../consts";
import { addPoints } from "./gameState/actions";

function useTimer(elapsedTime) {
  const [secondsElapsed, setSecondsElapsed] = useState(elapsedTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { gameState, timerIntervalsElapsed, dispatch } = useGameState();

  useEffect(() => {
    if (isTimerRunning) {
      const timerId = setTimeout(() => {
        setSecondsElapsed((curr) => curr + 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [secondsElapsed, isTimerRunning]);

  // if game over stop timer
  useEffect(() => {
    if (gameState === GAME_STATE.WON) {
      stopTimer();
    }
    // eslint-disable-next-line
  }, [gameState]);

  // timer points
  if (timerIntervalsElapsed < Math.floor(secondsElapsed / 10)) {
    dispatch(addPoints(-2, secondsElapsed));
  }

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
