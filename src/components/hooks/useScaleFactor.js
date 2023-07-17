import { CONSTS } from "../../consts";
import useWindowDimensions from "./useWindowDimensions";

function useScaleFactor() {
  const { windowDimentions } = useWindowDimensions();

  return Math.min(
    windowDimentions.width / CONSTS.maxWidth,
    (windowDimentions.height - CONSTS.headerHeight) / CONSTS.maxHeight,
    1
  );
}

export default useScaleFactor;
