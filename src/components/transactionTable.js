import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NewTransactionModal from './newTransactionModal';

const TransactionTable = ({ budgetId, categories, transactions }) => {
  const [showModal, setShowModal] = useState(false);
  const formatDate = (dateString) => new Date(dateString).toLocaleString('en-US', { dateStyle: 'medium'});
  const baseTransaction = {
    title: "",
    description: "",
    amount: "",
    budgetId: budgetId,
    categoryId: categories[0] ? categories[0]._id : "",
    date: ""
};

  const submitTransaction = (transaction) => {
    console.log(transaction);
    setShowModal(false);
  };

  const handleShowAdd = () => {
    setShowModal(true);
  };

  const handleCloseAdd = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Row className="justify-content-left">
        <Col md="auto">
          <h3>Transactions</h3>
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleShowAdd}>+</Button>
        </Col> 
      </Row>
      <Table>
        <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Category
            </th>
            <th>
              Date
            </th>
            <th>
              Amount
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map(transaction => {
              return (
                <tr key={transaction._id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.categoryName}</td>
                  <td>{formatDate(transaction.date)}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.description}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <NewTransactionModal
        showModal={showModal} 
        handleClose={handleCloseAdd}
        submitTransaction={submitTransaction} 
        baseTransaction={baseTransaction}
        categories={categories}
        modalTitle="Add Transaction" 
        reset 
      />
    </div>
  )
}

export default TransactionTable;