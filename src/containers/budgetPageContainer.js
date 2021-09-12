import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BudgetTables from '../components/budgetTables';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import DeleteBudgetModal from '../components/deleteBudgetModal';
import NewBudgetModal from '../components/newBudgetModal';

const BudgetPageContainer = () => {
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { id } = useParams();

  const showDeleteModal = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const deleteBudget = () => {
    setShowDelete(false);
    axios.delete(`http://localhost:5000/budgets/${id}`)
      .then(_ => {
        setLoading(true);
        window.location = '/';
      })
      .catch(err => {
        alert('Error occurred when deleting budget!');
        console.log(`${err}`);
      });
  }

  const showEditModal = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const editBudget = (budgetData) => {
    setShowEdit(false);
    axios.put(`http://localhost:5000/budgets/${id}`, {
      ...budgetData
    })
      .then(_ => {
        setBudget({
          ...budget,
          ...budgetData
        })
      })
      .catch(err => {
        alert('Error occurred when editing budget!');
        console.log(`${err}`);
      });
  };

  // TODO: error handling 
  useEffect(() => {
    axios.get(`http://localhost:5000/budgets/${id}/report`).then(result => {
      setBudget(result.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <Container>
      { loading ? 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> : 
        <Container>
          <Row>
            <Col><h1>{budget.title}</h1></Col>  
            <Col>
              <div className="float-end">   
                <Button variant="primary" onClick={showEditModal}>Edit</Button>{' '}
                <Button variant="danger" onClick={showDeleteModal}>Delete</Button>
              </div>
            </Col>      
          </Row>
          <Row> 
            <p>{budget.description}</p>
            <p>Total Income: {budget.incomeTotal}</p>
            <p>Total Expenses: {budget.expenseTotal}</p>
            <p>Total Savings: {budget.netSavings} vs target of {budget.netTarget}</p>
            <hr />
          </Row>
          <BudgetTables budget={budget}/>
          <DeleteBudgetModal
            show={showDelete}
            close={handleCloseDelete}
            deleteBudget={deleteBudget}
            budgetTitle={budget.title}
          />
          <NewBudgetModal
            showModal={showEdit} 
            handleClose={handleCloseEdit} 
            submitBudget={editBudget}
            baseBudget={budget}
            modalTitle="Edit Budget"
          />
        </Container>}
    </Container>
  )
};

export default BudgetPageContainer;