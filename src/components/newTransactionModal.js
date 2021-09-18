import Form from 'react-bootstrap/Form';
import FormModal from './formModal';
import useFormState from '../hooks/useFormState';

// "New" is a misnomer, also applicable on updates
const NewTransactionModal = ({ 
  showModal, 
  handleClose, 
  submitTransaction, 
  baseTransaction,
  categories, 
  modalTitle, 
  reset }) => {
    // note, formatting of the date to get it to play nice with the html
    const [modalData, handleChange, handleSubmit] = useFormState({
      title: baseTransaction.title,
      description: baseTransaction.description,
      amount: baseTransaction.amount,
      date: baseTransaction.date.split('T')[0],
      categoryId: baseTransaction.categoryId
    }, submitTransaction, reset)

    return (
      <FormModal
        showModal={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        modalTitle={modalTitle}
      >
        <Form.Group className="mb-3" controlId="newTransactionForm.TitleInput">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            as="input" 
            name="title"
            value={modalData.title} 
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
            value={modalData.amount} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newTransactionForm.DateInput">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            as="input" 
            name="date"
            type="date"
            value={modalData.date} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newTransactionForm.CategorySelect">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Select" value={modalData.categoryId} name="categoryId" onChange={handleChange}>
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
            value={modalData.description} 
            onChange={handleChange}
          />
        </Form.Group>      
      </FormModal>
    )
};

export default NewTransactionModal;