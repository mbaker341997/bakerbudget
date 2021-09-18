import Form from 'react-bootstrap/Form';
import FormModal from './formModal';
import useFormState from '../hooks/useFormState';

// "New" is a misnomer, also applicable on updates
// budget data is meant to contain only that information that the form submits, nothing else. so not the entire budget
const NewBudgetModal = ({ 
  showModal, 
  handleClose, 
  submitBudget, 
  baseBudget, 
  modalTitle, 
  reset, 
  children 
}) => {
  const [modalData, handleChange, handleSubmit] = useFormState({
    title: baseBudget.title,
    description: baseBudget.description
  }, submitBudget, reset)

  return (
    <FormModal
      showModal={showModal}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      modalTitle={modalTitle}
    >
      { children }
      <Form.Group className="mb-3" controlId="newBudgetForm.TitleInput">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          as="input" 
          name="title"
          value={modalData.title} 
          onChange={handleChange} 
        />
      </Form.Group>  
      <Form.Group className="mb-3" controlId="newBudgetForm.DescriptionTextArea">
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

export default NewBudgetModal;