import Form from 'react-bootstrap/Form';
import FormModal from './formModal';
import useFormState from '../../hooks/useFormState';

// TODO: enforce proptype contract
const NewCategoryModal = ({ 
  showModal, 
  handleClose, 
  submit, 
  base, 
  modalTitle, 
  reset 
}) => {
  const [modalData, handleChange, handleSubmit] = useFormState({
    title: base.title,
    description: base.description,
    target: base.target
  }, submit, reset);

  return (
    <FormModal
      showModal={showModal}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      modalTitle={modalTitle}
    >
      <Form.Group className="mb-3" controlId="newCategoryForm.TitleInput">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          as="input" 
          name="title"
          value={modalData.title} 
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
          value={modalData.target} 
          onChange={handleChange} 
        />
      </Form.Group>  
      <Form.Group className="mb-3" controlId="newCategoryForm.DescriptionTextArea">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          name="description" 
          value={modalData.description} 
          onChange={handleChange}
        />
      </Form.Group>     
    </FormModal>
  )
};

export default NewCategoryModal;