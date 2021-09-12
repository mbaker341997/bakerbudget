import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const NewBudgetModal = ({ showModal, handleCloseAddBudget, addBudget }) => {
  const defaultBudget = {
    title: "",
    description: "",
    categories: [
      {
        title: "Income",
        description: "Money entering",
        isExpense: false,
        target: 0
      },
      {
        title: "Expense",
        description: "Money exiting",
        isExpense: true,
        target: 0
      }
    ] 
  };

  const [newBudget, setNewBudget] = useState(defaultBudget);

  const handleNewBudgetChange = (event) => {
    setNewBudget({
      ...newBudget,
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudget(newBudget);
    setNewBudget({...defaultBudget})
  }

  return (
    <Modal show={showModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3 text-muted">
            Your budget will have an "Income" and "Expense" category by default. 
            Additional categories can be added/deleted in the individual budget page
            after it's created.
          </p>
          <Form.Group className="mb-3" controlId="newBudgetForm.TitleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              as="input" 
              name="title"
              value={newBudget.title} 
              onChange={handleNewBudgetChange} 
            />
          </Form.Group>  
          <Form.Group className="mb-3" controlId="newBudgetForm.DescriptionTextArea">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description" 
              value={newBudget.description} 
              onChange={handleNewBudgetChange}
            />
          </Form.Group>       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddBudget}>Close</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
};

export default NewBudgetModal;