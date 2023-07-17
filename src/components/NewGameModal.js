import Modal from "./Modal";

function NewGameModal({ handleClose, startNewGame }) {
  function handleYesButtonClick() {
    startNewGame();
    handleClose();
  }

  return (
    <Modal>
      <div>
        {/* className={styles.modal}> */}
        <h2>Start New Game?</h2>
        <div>
          <button onClick={handleYesButtonClick}>yes</button>
          <button onClick={handleClose}>cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default NewGameModal;
