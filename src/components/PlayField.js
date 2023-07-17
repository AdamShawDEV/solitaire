function PlayField() {
  return (
    <div
      className="game"
      style={{
        width: `${CONSTS.maxWidth * scaleFactor}px`,
        height: `${CONSTS.maxHeight * scaleFactor}px`,
      }}
    >
      <div
        className={styles.stateDisplay}
        style={{ fontSize: `${20 * scaleFactor}px` }}
      >
        <h2>moves: {state.numMoves}</h2>
        <h2>points: {state.points}</h2>
      </div>
      {Object.keys(piles).map((key) => (
        <PileBase
          key={key}
          id={key}
          scaleFactor={scaleFactor}
          onSelect={onSelect}
          selection={selection}
        />
      ))}
      {Object.keys(state.cards).map((cardName) => (
        <Card
          key={cardName}
          id={cardName}
          idx={state[state.cardMap[cardName]].findIndex(
            (element) => element === cardName
          )}
          selected={selection === cardName}
          onSelect={onSelect}
          stack={state.cardMap[cardName]}
          scaleFactor={scaleFactor}
          state={state}
        />
      ))}
    </div>
  );
}
