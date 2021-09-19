import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// Note: I'd love to be able to incorporate useFormState here, but I want this modal to
// be able to pass custom forms in here, and I haven't found out how to get the "handleChange"
// applied to any FormControl children passed in.
// so this is just some simple DOM and state is handled by the ones who leverage it.
const FormModal = ({
  showModal,
  handleClose,
  handleSubmit,
  modalTitle,
  children,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormModal;
