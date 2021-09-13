import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ show, close, deleteAction, title, body }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        { body }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>No</Button>
        <Button variant="primary" onClick={deleteAction}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default DeleteModal;