import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// "New" is a misnomer, also applicable on updates
// budget data is meant to contain only that information that the form submits, nothing else. so not the entire budget
const NewBudgetModal = ({ showModal, handleClose, submitBudget, baseBudget, modalTitle, reset, children }) => {
  const baseBudgetData = {
    title: baseBudget.title,
    description: baseBudget.description
  };
  const [budgetData, setBudgetData] = useState(baseBudgetData);

  const handleNewBudgetChange = (event) => {
    setBudgetData({
      ...budgetData,
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submitBudget(budgetData);
    if(reset) {
      setBudgetData({...baseBudgetData});
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{ modalTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { children }
          <Form.Group className="mb-3" controlId="newBudgetForm.TitleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              as="input" 
              name="title"
              value={budgetData.title} 
              onChange={handleNewBudgetChange} 
            />
          </Form.Group>  
          <Form.Group className="mb-3" controlId="newBudgetForm.DescriptionTextArea">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description" 
              value={budgetData.description} 
              onChange={handleNewBudgetChange}
            />
          </Form.Group>       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
};

export default NewBudgetModal;