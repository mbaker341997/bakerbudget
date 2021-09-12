import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// "New" is a misnomer, also applicable on updates
const NewTransactionModal = ({ 
  showModal, 
  handleClose, 
  submitTransaction, 
  baseTransaction,
  categories, 
  modalTitle, 
  reset }) => {
    const [data, setData] = useState(baseTransaction);

    const handleChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
      event.preventDefault();
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      submitTransaction(data);
      if(reset) {
        setData({...baseTransaction});
      }
    }

    return (
      <Modal show={showModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>{ modalTitle }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="newTransactionForm.TitleInput">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                as="input" 
                name="title"
                value={data.title} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newTransactionForm.AmountInput">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                as="input" 
                name="amount"
                type="number"
                min="0" 
                step="0.01"
                value={data.amount} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newTransactionForm.DateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                as="input" 
                name="date"
                type="date"
                value={data.date} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newTransactionForm.CategorySelect">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Select" value={data.categoryId} onChange={handleChange}>
                {
                  categories.map(category => {
                    return (
                      <option key={category._id} value={category._id}>{category.title}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>     
            <Form.Group className="mb-3" controlId="newTransactionForm.DescriptionTextArea">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                value={data.description} 
                onChange={handleChange}
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

export default NewTransactionModal;