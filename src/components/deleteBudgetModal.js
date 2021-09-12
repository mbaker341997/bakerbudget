import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteBudgetModal = ({ show, close, deleteBudget, budgetTitle }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{ budgetTitle }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete this budget? Action cannot be undone
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>No</Button>
        <Button variant="primary" onClick={deleteBudget}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default DeleteBudgetModal;