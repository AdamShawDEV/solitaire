import Button from "./Button";
import HorizontalContainer from "./HorizontalContainer";
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
        <HorizontalContainer>
          <Button onClick={handleYesButtonClick}>ok</Button>
          <Button onClick={handleClose}>cancel</Button>
        </HorizontalContainer>
      </div>
    </Modal>
  );
}

export default NewGameModal;
