import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// we have 3 very similar modals, but idk how to combine them (yet)
const NewCategoryModal = ({ showModal, handleClose, submitCategory, baseCategory, modalTitle, reset }) => {
  const baseData = {
    title: baseCategory.title,
    description: baseCategory.description,
    target: baseCategory.target,
  };
  const [data, setData] = useState(baseData);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submitCategory(data);
    if(reset) {
      setData({...baseData});
    }
  }

  return (
    <Modal show={showModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>{ modalTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="newCategoryForm.TitleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              as="input" 
              name="title"
              value={data.title} 
              onChange={handleChange} 
            />
          </Form.Group>  
          <Form.Group className="mb-3" controlId="newCategoryForm.TargetInput">
            <Form.Label>Amount</Form.Label>
            <Form.Control 
              as="input" 
              name="target"
              type="number"
              min="0" 
              step="0.01"
              value={data.target} 
              onChange={handleChange} 
            />
          </Form.Group>  
          <Form.Group className="mb-3" controlId="newCategoryForm.DescriptionTextArea">
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

export default NewCategoryModal;