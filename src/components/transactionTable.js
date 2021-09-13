import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NewTransactionModal from './newTransactionModal';
import { addTransactionAction, editTransactionAction } from '../context/budgetActions';

const SELECTED_CLASSNAME = "selectedRow";
const TransactionTable = ({ budgetId, categories, transactions, dispatch }) => {
  const baseTransaction = {
    title: "",
    description: "",
    amount: "",
    budgetId: budgetId,
    categoryId: categories[0] ? categories[0]._id : "",
    date: ""
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const submitTransaction = (formData) => {
    setShowAddModal(false);
    addTransactionAction({
      ...formData,
      budgetId
    }, dispatch);
  };

  const editTransaction = (formData) => {
    setEditModal(null);
    editTransactionAction(selectedItem._id, budgetId, formData, dispatch);
  };

  const handleShowAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
  };

  const handleShowEdit = () => {
    // we can't just change the boolean flag like in budget because baseTransaction
    // changes dynamically, which messes up setting the modal's inital state
    setEditModal(
      <NewTransactionModal
        showModal={true} 
        handleClose={handleCloseEdit}
        submitTransaction={editTransaction} 
        baseTransaction={selectedItem}
        categories={categories}
        modalTitle="Edit Transaction" 
    />);
  };

  const handleCloseEdit = () => {
    setEditModal(null);
  };

  const clickTransaction = (event) => {
    // note: currentTarget has the actual event listener on it, so it's how we get the row
    const clickedId = event.currentTarget.id;
    if(!selectedRow || selectedRow !== clickedId) {
      if (selectedRow) {
        document.getElementById(selectedRow).classList.remove(SELECTED_CLASSNAME);
      }
      setSelectedRow(clickedId);
      document.getElementById(clickedId).className = SELECTED_CLASSNAME;
      setSelectedItem(transactions.find(transaction => transaction._id === clickedId));
    } else if (selectedRow === clickedId) {
      document.getElementById(selectedRow).classList.remove(SELECTED_CLASSNAME)
      setSelectedRow(null);
    }
  }

  return (
    <div>
      <Row className="justify-content-left">
        <Col md="auto">
          <h3>Transactions</h3>
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleShowAdd}>+</Button>
        </Col>
        { 
          selectedRow &&
          <> 
            <Col md="auto">
              <Button variant="primary" onClick={handleShowEdit}>Edit</Button>
            </Col>
            <Col md="auto">
              <Button variant="danger" onClick={handleShowAdd}>Delete</Button>
            </Col>
          </>        
        }
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map(transaction => {
              return (
                <tr key={transaction._id} id={transaction._id} onClick={clickTransaction}>
                  <td>{transaction.title}</td>
                  <td>{transaction.categoryName}</td>
                  <td>{transaction.date.split('T')[0]}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.description}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <NewTransactionModal
        showModal={showAddModal} 
        handleClose={handleCloseAdd}
        submitTransaction={submitTransaction} 
        baseTransaction={baseTransaction}
        categories={categories}
        modalTitle="Add Transaction" 
        reset 
      />
      { editModal }
    </div>
  )
}

export default TransactionTable;